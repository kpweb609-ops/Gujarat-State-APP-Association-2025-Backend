const express = require('express');
const router = express.Router();
const {
  getDesignations,
  getDesignation,
  createDesignation,
  updateDesignation,
  deleteDesignation
} = require('../controllers/designationController');

// GET /api/designations - Get all designations
router.get('/', getDesignations);

// GET /api/designations/:id - Get single designation
router.get('/:id', getDesignation);

// POST /api/designations - Create designation
router.post('/', createDesignation);

// PUT /api/designations/:id - Update designation
router.put('/:id', updateDesignation);

// DELETE /api/designations/:id - Delete designation
router.delete('/:id', deleteDesignation);

module.exports = router;