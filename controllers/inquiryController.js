const Inquiry = require('../models/Inquiry');

// Get all inquiries
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single inquiry
const getInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create inquiry
const createInquiry = async (req, res) => {
  const inquiry = new Inquiry({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });

  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update inquiry
const updateInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    inquiry.name = req.body.name || inquiry.name;
    inquiry.email = req.body.email || inquiry.email;
    inquiry.subject = req.body.subject || inquiry.subject;
    inquiry.message = req.body.message || inquiry.message;

    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete inquiry
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    await inquiry.deleteOne();
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry
};