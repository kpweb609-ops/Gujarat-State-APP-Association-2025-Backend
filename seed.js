require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function addAdmin() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminUser = new User({
      username: 'Tushar Barot',
      email: 'tusharbarot@gmail.com',
      password: 'vakil@120'
    });

    await adminUser.save();
    console.log('Admin user added successfully');
  } catch (error) {
    console.error('Error adding admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

addAdmin();