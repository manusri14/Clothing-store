const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: String }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema, 'orders_cs1');
