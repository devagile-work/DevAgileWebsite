import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String, required: true },
  duration: { type: String },
});

const TrackSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  individualPrice: { type: Number, required: true },
  features: [{ type: String }],
  videos: [VideoSchema]
}, { timestamps: true });

export default mongoose.models.Track || mongoose.model("Track", TrackSchema);
