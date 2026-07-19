require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  bundlePrice: { type: Number, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
}, { timestamps: true });

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

const Bootcamp = mongoose.models.Bootcamp || mongoose.model("Bootcamp", BootcampSchema);
const Track = mongoose.models.Track || mongoose.model("Track", TrackSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    await Bootcamp.deleteMany({});
    await Track.deleteMany({});
    console.log("Cleared existing Bootcamps and Tracks.");

    // Web Dev Track
    const webDevTrack = await Track.create({
      _id: new mongoose.Types.ObjectId("668c2a9a7a93556c4b9d0003"),
      slug: "fsd-projects",
      title: "Full Stack Development Projects",
      description: "Hands-on implementation of 4 industry-level projects covering front-end, back-end, and database integration.",
      individualPrice: 499,
      features: [
        "Basic Project: Portfolio App", 
        "Intermediate Project: E-commerce UI", 
        "Advanced Project: Social Media Backend", 
        "Capstone Project: Full Stack Task Manager"
      ],
      videos: [
        { title: "Project 1: Setup & UI", description: "Learn to build UI", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" },
        { title: "Project 2: State Management & APIs", description: "State mgmt", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" },
        { title: "Project 3: Backend & Database", description: "Backend integration", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" },
        { title: "Project 4: Full Stack Integration", description: "Full stack Capstone", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" }
      ]
    });

    // AI/ML Track
    const aiTrack = await Track.create({
      _id: new mongoose.Types.ObjectId("668c2a9a7a93556c4b9d0004"),
      slug: "aiml-projects",
      title: "AI/ML Projects",
      description: "Hands-on implementation of 4 industry-level projects covering data preprocessing, model training, and deployment.",
      individualPrice: 499,
      features: [
        "Basic Project: Data Analysis EDA", 
        "Intermediate Project: Predictive Modeling", 
        "Advanced Project: NLP / Computer Vision", 
        "Capstone Project: AI Web App Deployment"
      ],
      videos: [
        { title: "Project 1: Data Preprocessing", description: "EDA", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" },
        { title: "Project 2: Machine Learning Models", description: "ML Models", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" },
        { title: "Project 3: Deep Learning basics", description: "Deep learning", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" },
        { title: "Project 4: Model Deployment", description: "Model deployment", link: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "1 week" }
      ]
    });

    // Web Dev Bootcamp
    await Bootcamp.create({
      _id: new mongoose.Types.ObjectId("668c2a9a7a93556c4b9d0001"),
      slug: "fsd-bootcamp",
      title: "Full Stack Development Bootcamp",
      description: "16th July to 16th August. Build 4 real-world projects from basic to advanced. Bootcamp fee: ₹499. Includes Certificate upon report submission.",
      image: "/poster/techMastery.png",
      bundlePrice: 499,
      tracks: [webDevTrack._id]
    });

    // AI/ML Bootcamp
    await Bootcamp.create({
      _id: new mongoose.Types.ObjectId("668c2a9a7a93556c4b9d0002"),
      slug: "aiml-bootcamp",
      title: "AI/ML Bootcamp",
      description: "16th July to 16th August. Build 4 real-world projects from basic to advanced. Bootcamp fee: ₹499. Includes Certificate upon report submission.",
      image: "/poster/techMastery.png",
      bundlePrice: 499,
      tracks: [aiTrack._id]
    });

    console.log("Successfully seeded Bootcamps and Tracks!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
}

seed();
