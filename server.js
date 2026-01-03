require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 👈 ADD THIS

const authRoutes = require('./routes/auth');
const designationRoutes = require('./routes/designation');
const personRoutes = require('./routes/person');
const galleryRoutes = require('./routes/gallery');
const releaseRoutes = require('./routes/release');
const inquiryRoutes = require('./routes/inquiry');
const statsRoutes = require('./routes/stats');

const app = express();

// Middleware
app.use(cors()); // 👈 ENABLE CORS
app.use(express.json());
const path = require('path');
const fs = require('fs');

// ensure uploads folder exists and serve it statically
const uploadsPath = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/releases', releaseRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/stats', statsRoutes);

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
