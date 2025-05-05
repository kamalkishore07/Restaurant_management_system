const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity_in_stock: {
    type: Number,
    required: true,
    min: 0,
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: { createdAt: 'created_at' }  
});

module.exports = mongoose.model('Inventory', inventorySchema);
