import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, required: true },
  watched: { type: Boolean, default: false },
  quizPassed: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 }
});

const WorkshopRegistrationSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // Using email to link with NextAuth session
    workshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    expectations: { type: String },
    progress: [ProgressSchema],
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const WorkshopRegistration = mongoose.models.WorkshopRegistration || mongoose.model("WorkshopRegistration", WorkshopRegistrationSchema);

export default WorkshopRegistration;
