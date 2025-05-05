const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['starters', 'main_course', 'desserts', 'beverages'],
    required: true
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  special_tags: {
    type: String,
    maxlength: 255
  },
  image_url: {
    type: String,
    maxlength: 255
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Automatically update `updated_at` before saving
MenuItemSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;
