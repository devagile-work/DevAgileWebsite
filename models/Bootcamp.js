import mongoose from "mongoose";

const BootcampSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  bundlePrice: { type: Number, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
}, { timestamps: true });

export default mongoose.models.Bootcamp || mongoose.model("Bootcamp", BootcampSchema);
