const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  person_name: {
    type: String,
    required: true
  },
  person_photo: {
    type: String,
    required: true
  },
  person_designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',
    required: true
  },
  person_role: {
    type: String,
    required: true
  },
  person_mobile: {
    type: String,
    required: true
  },
  person_batch: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Person', personSchema);