import { NextResponse } from "next-auth/next";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import rateLimit from "@/lib/rateLimit";

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    if (!rateLimit(ip, 5, 60000)) { // 5 requests per minute
      return Response.json({ message: "Too many requests, please try again later." }, { status: 429 });
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    await connectMongo();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "credentials",
    });

    return Response.json(
      { message: "User registered successfully", user: { name: newUser.name, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
