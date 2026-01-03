const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const {
  getReleases,
  getRelease,
  createRelease,
  updateRelease,
  deleteRelease
} = require('../controllers/releaseController');

const router = express.Router();

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, mimetype, originalname) => {
  const resourceType = mimetype.startsWith('image/') ? 'image' : 'raw';
  const options = { resource_type: resourceType, access_mode: 'public', type: 'upload' };
  if (resourceType === 'raw') {
    const parsed = path.parse(originalname);
    options.public_id = parsed.name;
    options.format = parsed.ext.slice(1); // remove the dot
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(buffer);
  });
};

// GET /api/releases - Get all releases
router.get('/', getReleases);

// GET /api/releases/:id - Get single release
router.get('/:id', getRelease);

// POST /api/releases - Create release
router.post('/', upload.single('Release_photo'), async (req, res) => {
  try {
    let Release_photo = req.body.Release_photo; // If URL provided directly
    if (req.file) {
      Release_photo = await uploadToCloudinary(req.file.buffer, req.file.mimetype, req.file.originalname);
    }

    const release = new (require('../models/Release'))({
      Release_name: req.body.Release_name,
      Release_photo
    });

    const newRelease = await release.save();
    res.status(201).json(newRelease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/releases/:id - Update release
router.put('/:id', upload.single('Release_photo'), async (req, res) => {
  try {
    const release = await require('../models/Release').findById(req.params.id);
    if (!release) {
      return res.status(404).json({ message: 'Release not found' });
    }

    release.Release_name = req.body.Release_name || release.Release_name;
    
    if (req.file) {
      release.Release_photo = await uploadToCloudinary(req.file.buffer, req.file.mimetype, req.file.originalname);
    } else if (req.body.Release_photo) {
      release.Release_photo = req.body.Release_photo;
    }

    const updatedRelease = await release.save();
    res.json(updatedRelease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/releases/:id - Delete release
router.delete('/:id', deleteRelease);

module.exports = router;