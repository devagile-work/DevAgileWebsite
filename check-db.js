require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const user = await db.collection('users').findOne({ email: 'adarsh@example.com' }); // Or whatever email they use. Let's just find the first user
  const users = await db.collection('users').find({}).toArray();
  console.log("Users:", JSON.stringify(users, null, 2));
  
  const orders = await db.collection('orders').find({}).toArray();
  console.log("Orders:", JSON.stringify(orders, null, 2));

  process.exit(0);
}

check();
