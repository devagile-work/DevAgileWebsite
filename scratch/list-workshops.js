require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const workshops = await db.collection('workshops').find({}).toArray();
  console.log("Workshops:", JSON.stringify(workshops, null, 2));

  process.exit(0);
}

check();
