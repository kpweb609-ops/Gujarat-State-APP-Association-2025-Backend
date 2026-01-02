require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 👈 ADD THIS

const authRoutes = require('./routes/auth');
const designationRoutes = require('./routes/designation');
const personRoutes = require('./routes/person');

const app = express();

// Middleware
app.use(cors()); // 👈 ENABLE CORS
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/persons', personRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
