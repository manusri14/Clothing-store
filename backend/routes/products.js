const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const mockProducts = require('../mockData');

router.get('/seed-products', async (req, res) => {
  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(mockProducts);
    res.json({ message: 'Products seeded', count: created.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const category = req.query.category
      ? { category: req.query.category.toUpperCase() }
      : {};

    const products = await Product.find({ ...keyword, ...category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products (Admin Only)
router.post('/', protect, admin, async (req, res) => {
  const { name, description, price, category, images, sizes, featured } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      sizes,
      featured
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id (Admin Only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id (Admin Only)
router.put('/:id', protect, admin, async (req, res) => {
  const { name, description, price, category, images, sizes, featured } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.images = images || product.images;
      product.sizes = sizes || product.sizes;
      product.featured = featured !== undefined ? featured : product.featured;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
