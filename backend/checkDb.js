const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const adminCount = await User.countDocuments({ role: 'admin' });
  const productCount = await Product.countDocuments();
  console.log(`Admins in DB: ${adminCount}`);
  console.log(`Products in DB: ${productCount}`);
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
