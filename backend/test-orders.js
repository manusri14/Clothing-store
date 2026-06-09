require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to DB');
  const orders = await Order.find({});
  console.log('Orders found:', orders.length);
  console.log(JSON.stringify(orders, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
