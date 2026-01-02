const Release = require('../models/Release');

// Get all releases
const getReleases = async (req, res) => {
  try {
    const releases = await Release.find();
    res.json(releases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single release
const getRelease = async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) {
      return res.status(404).json({ message: 'Release not found' });
    }
    res.json(release);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create release
const createRelease = async (req, res) => {
  const release = new Release({
    Release_name: req.body.Release_name,
    Release_photo: req.body.Release_photo
  });

  try {
    const newRelease = await release.save();
    res.status(201).json(newRelease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update release
const updateRelease = async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) {
      return res.status(404).json({ message: 'Release not found' });
    }

    release.Release_name = req.body.Release_name || release.Release_name;
    release.Release_photo = req.body.Release_photo || release.Release_photo;

    const updatedRelease = await release.save();
    res.json(updatedRelease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete release
const deleteRelease = async (req, res) => {
  try {
    const deletedRelease = await Release.findByIdAndDelete(req.params.id);
    if (!deletedRelease) {
      return res.status(404).json({ message: 'Release not found' });
    }

    res.json({ message: 'Release deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReleases,
  getRelease,
  createRelease,
  updateRelease,
  deleteRelease
};