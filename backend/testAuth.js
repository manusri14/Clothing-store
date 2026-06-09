const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email: 'admin@manus.com' });
  if (!user) {
    console.log('Admin user NOT FOUND in DB!');
  } else {
    console.log('Admin user found:', user.email);
    const isMatch = await bcrypt.compare('admin123', user.password);
    console.log('Password match:', isMatch);
  }
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
  mongoose.disconnect();
});
