import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Optional, as Google OAuth users won't have a password
    },
    image: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    purchasedBootcamps: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bootcamp'
    }],
    purchasedTracks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track'
    }]
  },
  { timestamps: true }
);

// Prevent redefining the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
