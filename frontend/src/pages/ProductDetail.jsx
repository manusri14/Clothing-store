import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const { addToCart, toggleCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        toggleCart();
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={20} /> <span className="uppercase text-sm tracking-widest font-bold">Back to Collection</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[60vh] md:h-[80vh] bg-gray-50 rounded-xl overflow-hidden"
          >
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-4">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-premium-dark mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-600 mb-8">${product.price}</p>
            
            <p className="text-gray-500 leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-premium-dark">Select Size</span>
                  <button className="text-xs text-gray-400 underline">Size Guide</button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center border font-medium transition-colors
                        ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className={`w-full py-5 flex items-center justify-center gap-3 uppercase tracking-widest font-bold transition-all duration-300
                ${added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              {added ? (
                <><Check size={20} /> Added to Cart</>
              ) : (
                <><ShoppingBag size={20} /> Add to Cart</>
              )}
            </button>
            
            <div className="mt-8 space-y-4 text-sm text-gray-500">
              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span>Free Shipping</span>
                <span>On orders over $150</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span>Returns</span>
                <span>30-day free returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
