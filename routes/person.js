const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require('../controllers/personController');

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

// GET /api/persons - Get all persons
router.get('/', getPersons);

// GET /api/persons/:id - Get single person
router.get('/:id', getPerson);

// POST /api/persons - Create person
router.post('/', upload.single('person_photo'), async (req, res) => {
  try {
    let person_photo = req.body.person_photo; // If URL provided directly
    if (req.file) {
      person_photo = await uploadToCloudinary(req.file.buffer);
    }

    const person = new (require('../models/Person'))({
      person_name: req.body.person_name,
      person_photo,
      person_designation: req.body.person_designation,
      person_role: req.body.person_role,
      person_mobile: req.body.person_mobile,
      person_batch: req.body.person_batch
    });

    const newPerson = await person.save();
    await newPerson.populate('person_designation');
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/persons/:id - Update person
router.put('/:id', upload.single('person_photo'), async (req, res) => {
  try {
    const person = await require('../models/Person').findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    person.person_name = req.body.person_name || person.person_name;
    
    if (req.file) {
      person.person_photo = await uploadToCloudinary(req.file.buffer);
    } else if (req.body.person_photo) {
      person.person_photo = req.body.person_photo;
    }

    person.person_designation = req.body.person_designation || person.person_designation;
    person.person_role = req.body.person_role || person.person_role;
    person.person_mobile = req.body.person_mobile || person.person_mobile;
    person.person_batch = req.body.person_batch || person.person_batch;

    const updatedPerson = await person.save();
    await updatedPerson.populate('person_designation');
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/persons/:id - Delete person
router.delete('/:id', deletePerson);

module.exports = router;