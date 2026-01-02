const Designation = require('../models/Designation');

// Get all designations
const getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single designation
const getDesignation = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.json(designation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create designation
const createDesignation = async (req, res) => {
  const designation = new Designation({
    designation_name: req.body.designation_name
  });

  try {
    const newDesignation = await designation.save();
    res.status(201).json(newDesignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update designation
const updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    designation.designation_name = req.body.designation_name || designation.designation_name;
    const updatedDesignation = await designation.save();
    res.json(updatedDesignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete designation
const deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndDelete(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    res.json({ message: 'Designation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDesignations,
  getDesignation,
  createDesignation,
  updateDesignation,
  deleteDesignation
};