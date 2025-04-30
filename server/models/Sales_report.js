const mongoose = require('mongoose');

const SalesReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  total_sales: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  total_orders: {
    type: Number,
    required: true
  },
  best_selling_item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const SalesReport = mongoose.model('SalesReport', SalesReportSchema);

module.exports = SalesReport;