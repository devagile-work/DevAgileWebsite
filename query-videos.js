require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function queryVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    
    const tracks = await db.collection('tracks').find({}).toArray();
    
    console.log("=== Tracks and Videos ===");
    for (const track of tracks) {
      console.log(`\nTrack: ${track.title}`);
      if (!track.videos || track.videos.length === 0) {
        console.log("  No videos found.");
      } else {
        track.videos.forEach((vid, i) => {
          console.log(`  ${i + 1}. ${vid.title} (Duration: ${vid.duration}) - Link: ${vid.link}`);
        });
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

queryVideos();
