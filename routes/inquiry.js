const express = require('express');
const {
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry
} = require('../controllers/inquiryController');

const router = express.Router();

// GET /api/inquiries - Get all inquiries
router.get('/', getInquiries);

// GET /api/inquiries/:id - Get single inquiry
router.get('/:id', getInquiry);

// POST /api/inquiries - Create new inquiry
router.post('/', createInquiry);

// PUT /api/inquiries/:id - Update inquiry
router.put('/:id', updateInquiry);

// DELETE /api/inquiries/:id - Delete inquiry
router.delete('/:id', deleteInquiry);

module.exports = router;