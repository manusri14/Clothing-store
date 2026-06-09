const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['MEN', 'WOMEN', 'STREETWEAR', 'FORMAL'],
  },
  images: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema, 'products_cs1');
