const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config({ path: '../.env' });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const adminExists = await User.findOne({ email: 'admin@manus.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      mongoose.disconnect();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'Super Admin',
      email: 'admin@manus.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created successfully! (admin@manus.com / admin123)');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin:', error);
    mongoose.disconnect();
  }
};

seedAdmin();
