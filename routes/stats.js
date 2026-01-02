const express = require('express');
const Designation = require('../models/Designation');
const Gallery = require('../models/Gallery');
const Person = require('../models/Person');
const Release = require('../models/Release');
const User = require('../models/User');
const Inquiry = require('../models/Inquiry');

const router = express.Router();

// GET /api/stats - Get total counts
router.get('/', async (req, res) => {
  try {
    const [designationCount, galleryCount, personCount, releaseCount, userCount, inquiryCount] = await Promise.all([
      Designation.countDocuments(),
      Gallery.countDocuments(),
      Person.countDocuments(),
      Release.countDocuments(),
      User.countDocuments(),
      Inquiry.countDocuments()
    ]);

    res.json({
      totalDesignations: designationCount,
      totalGalleries: galleryCount,
      totalPersons: personCount,
      totalReleases: releaseCount,
      totalUsers: userCount,
      totalInquiries: inquiryCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;