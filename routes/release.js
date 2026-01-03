const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
  getReleases,
  getRelease,
  createRelease,
  updateRelease,
  deleteRelease
} = require('../controllers/releaseController');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

// Multer config for disk storage into `uploads/`
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});

const upload = multer({ storage });

// GET /api/releases - Get all releases
router.get('/', getReleases);

// GET /api/releases/:id - Get single release
router.get('/:id', getRelease);

// POST /api/releases - Create release
router.post('/', upload.single('Release_photo'), async (req, res) => {
  try {
    let Release_photo = req.body.Release_photo; // If URL provided directly
    if (req.file) {
      // store relative URL path for the uploaded file
      Release_photo = '/uploads/' + req.file.filename;
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
      release.Release_photo = '/uploads/' + req.file.filename;
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