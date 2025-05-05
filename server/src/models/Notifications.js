const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'pending', 'delivered'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;