const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config({ path: '../.env' });

const mockProducts = [
  {
    name: 'Essential Oversized Tee',
    description: 'A heavy-weight cotton minimalist casual t-shirt.',
    price: 45,
    category: 'MEN',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true
  },
  {
    name: 'Cyberpunk Cargo Pants',
    description: 'Technical streetwear trousers with multiple utility pockets.',
    price: 120,
    category: 'STREETWEAR',
    images: ['https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&q=80'],
    sizes: ['M', 'L'],
    featured: true
  },
  {
    name: 'Modern Silk Dress',
    description: 'Elegant evening wear with a minimalist silhouette.',
    price: 250,
    category: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80'],
    sizes: ['S', 'M'],
    featured: false
  },
  {
    name: 'Tailored Wool Blazer',
    description: 'Premium formal wear suitable for high-end events.',
    price: 350,
    category: 'FORMAL',
    images: ['https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?w=500&q=80'],
    sizes: ['M', 'L', 'XL'],
    featured: true
  },
  {
    name: 'Reflective Windbreaker',
    description: 'Lightweight jacket for urban streetwear environments.',
    price: 180,
    category: 'STREETWEAR',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80'],
    sizes: ['S', 'M', 'L'],
    featured: false
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected. Clearing old products...');
  await Product.deleteMany({});
  console.log('Inserting mock products...');
  await Product.insertMany(mockProducts);
  console.log('Data Imported!');
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
  mongoose.disconnect();
});
