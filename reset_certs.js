require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const mongoose = require('mongoose');

async function reset() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  const result = await db.collection('workshopregistrations').updateMany(
    {},
    {
      $set: { certificateType: 'NONE' },
      $unset: { certificateGeneratedAt: "", certificateSentAt: "" }
    }
  );
  console.log('Reset certificates:', result);
  process.exit(0);
}

reset();
