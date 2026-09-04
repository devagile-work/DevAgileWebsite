import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true }
});

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeVideoId: { type: String, required: true }, // The 'v' param in YouTube URL
  quiz: [QuestionSchema] // Array of questions for this lecture
});

const WorkshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    lectures: [LectureSchema]
  },
  { timestamps: true }
);

const Workshop = mongoose.models.Workshop || mongoose.model("Workshop", WorkshopSchema);

export default Workshop;
