const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  customer_phone: {
    type: String,
    maxlength: 20
  },
  order_status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered'],
    default: 'pending'
  },
  total_amount: {
    type: mongoose.Types.Decimal128,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Check if the model already exists before defining it
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = Order;
