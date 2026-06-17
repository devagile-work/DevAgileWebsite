import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import Order from "../../../models/Order";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { itemId, itemType, status, amount } = await req.json();

    if (!itemId || !itemType || !status || amount === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find the user by email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 }
      );
    }

    // 1. Create the Order document
    const newOrder = await Order.create({
      userId: user._id,
      itemId,
      itemType,
      amount,
      status: status === "success" ? "SUCCESS" : "FAILED",
      razorpayPaymentId: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`, // Mock ID
    });

    // 2. If payment is successful, update User's purchased arrays
    if (status === "success") {
      const mongoose = require('mongoose');
      const objectIdItemId = new mongoose.Types.ObjectId(itemId);
      
      let updateResult;
      if (itemType === "Bootcamp") {
        updateResult = await User.updateOne(
          { _id: user._id },
          { $addToSet: { purchasedBootcamps: objectIdItemId } }
        );
      } else if (itemType === "Track") {
        updateResult = await User.updateOne(
          { _id: user._id },
          { $addToSet: { purchasedTracks: objectIdItemId } }
        );
      }
      
      console.log("DB Update Result:", updateResult);
      
      // Force Next.js to invalidate the cache for the bootcamp routes so the UI updates
      const { revalidatePath } = require("next/cache");
      revalidatePath("/bootcamp/[slug]", "page");
      revalidatePath("/dashboard", "page");
    }

    return NextResponse.json(
      { message: "Payment verified successfully", order: newOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    
    // Log error to file for debugging
    const fs = require('fs');
    fs.appendFileSync('error.log', new Date().toISOString() + ': ' + error.stack + '\n');
    
    return NextResponse.json(
      { message: "Internal server error", error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
