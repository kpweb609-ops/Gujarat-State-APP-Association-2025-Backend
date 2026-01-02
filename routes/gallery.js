const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const {
  getGalleries,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
} = require('../controllers/galleryController');

const router = express.Router();

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(buffer);
  });
};

// GET /api/galleries - Get all galleries
router.get('/', getGalleries);

// GET /api/galleries/:id - Get single gallery
router.get('/:id', getGallery);

// POST /api/galleries - Create gallery
router.post('/', upload.single('gallary_photo'), async (req, res) => {
  try {
    let gallary_photo = req.body.gallary_photo; // If URL provided directly
    if (req.file) {
      gallary_photo = await uploadToCloudinary(req.file.buffer);
    }

    const gallery = new (require('../models/Gallery'))({
      gallary_name: req.body.gallary_name,
      gallary_photo
    });

    const newGallery = await gallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/galleries/:id - Update gallery
router.put('/:id', upload.single('gallary_photo'), async (req, res) => {
  try {
    const gallery = await require('../models/Gallery').findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    gallery.gallary_name = req.body.gallary_name || gallery.gallary_name;
    
    if (req.file) {
      gallery.gallary_photo = await uploadToCloudinary(req.file.buffer);
    } else if (req.body.gallary_photo) {
      gallery.gallary_photo = req.body.gallary_photo;
    }

    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/galleries/:id - Delete gallery
router.delete('/:id', deleteGallery);

module.exports = router;