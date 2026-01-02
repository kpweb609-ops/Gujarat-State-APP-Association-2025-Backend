const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  gallary_name: {
    type: String,
    required: true
  },
  gallary_photo: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);