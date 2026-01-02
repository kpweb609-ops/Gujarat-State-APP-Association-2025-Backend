const Gallery = require('../models/Gallery');

// Get all galleries
const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gallery
const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create gallery
const createGallery = async (req, res) => {
  const gallery = new Gallery({
    gallary_name: req.body.gallary_name,
    gallary_photo: req.body.gallary_photo
  });

  try {
    const newGallery = await gallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update gallery
const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    gallery.gallary_name = req.body.gallary_name || gallery.gallary_name;
    gallery.gallary_photo = req.body.gallary_photo || gallery.gallary_photo;

    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete gallery
const deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    res.json({ message: 'Gallery deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGalleries,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
};