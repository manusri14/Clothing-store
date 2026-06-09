import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products?category=${categoryId}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching category products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryId]);

  const bannerImg = categoryId === 'men' 
    ? "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600&q=80" 
    : "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80";

  return (
    <div className="bg-premium-light min-h-screen">
      {/* Category Hero */}
      <div className="w-full h-[50vh] relative flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerImg}
            alt={`${categoryId} Fashion Banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1 
            key={categoryId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-widest text-white uppercase drop-shadow-lg"
          >
            {categoryId} <span className="font-light text-gray-200 block text-2xl mt-4">Collection</span>
          </motion.h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto py-10 md:py-20 px-4 sm:px-6">
        <div className="mb-12 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-medium tracking-wide uppercase text-gray-800">
            {products.length} Items Found
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-10 md:py-20 text-gray-400">Loading {categoryId} collection...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 md:py-20 text-gray-400 text-lg">
            No products found in the {categoryId} category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
