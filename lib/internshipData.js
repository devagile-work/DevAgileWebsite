export const INTERNSHIPS = [
  {
    _id: "668c2a9a7a93556c4b9d0001",
    title: "Full Stack Development Internship",
    slug: "fsd-internship",
    image: "/poster/techMastery.png",
    description: "16th July to 16th August. Build 4 real-world projects from basic to advanced. Internship fee: ₹499. Includes Certificate upon report submission.",
    bundlePrice: 499,
    tracks: [
      {
        _id: "668c2a9a7a93556c4b9d0003",
        title: "Full Stack Development Projects",
        description: "Hands-on implementation of 4 industry-level projects covering front-end, back-end, and database integration.",
        individualPrice: 499,
        features: ["Basic Project: Portfolio App", "Intermediate Project: E-commerce UI", "Advanced Project: Social Media Backend", "Capstone Project: Full Stack Task Manager"],
        videos: [
          { title: "Project 1: Setup & UI", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Project 2: State Management & APIs", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Project 3: Backend & Database", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Project 4: Full Stack Integration", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      }
    ]
  },
  {
    _id: "668c2a9a7a93556c4b9d0002",
    title: "AI/ML Internship",
    slug: "aiml-internship",
    image: "/poster/techMastery.png",
    description: "16th July to 16th August. Build 4 real-world projects from basic to advanced. Internship fee: ₹499. Includes Certificate upon report submission.",
    bundlePrice: 499,
    tracks: [
      {
        _id: "668c2a9a7a93556c4b9d0004",
        title: "AI/ML Projects",
        description: "Hands-on implementation of 4 industry-level projects covering data preprocessing, model training, and deployment.",
        individualPrice: 499,
        features: ["Basic Project: Data Analysis EDA", "Intermediate Project: Predictive Modeling", "Advanced Project: NLP / Computer Vision", "Capstone Project: AI Web App Deployment"],
        videos: [
          { title: "Project 1: Data Preprocessing", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Project 2: Machine Learning Models", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Project 3: Deep Learning basics", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Project 4: Model Deployment", duration: "1 week", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      }
    ]
  }
];

export const getInternshipBySlug = (slug) => INTERNSHIPS.find(i => i.slug === slug);

export const getTrackById = (trackId) => {
  for (const internship of INTERNSHIPS) {
    const track = internship.tracks.find(t => t._id === trackId);
    if (track) return track;
  }
  return null;
};

export const getInternshipByTrackId = (trackId) => {
  return INTERNSHIPS.find(i => i.tracks.some(t => t._id === trackId));
};
