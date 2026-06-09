import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative"
    >
      <Link to={`/product/${product._id}`} className="flex-grow flex flex-col">
        <div className="relative h-80 overflow-hidden bg-gray-100">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          {product.featured && (
            <div className="absolute top-4 left-4 bg-premium-gold text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow">
              Featured
            </div>
          )}
          {/* View Details Overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye size={16} /> View Details
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-premium-dark uppercase tracking-wide">{product.name}</h3>
            <span className="font-bold text-lg text-gray-900">${product.price}</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
          
          <div className="flex items-center gap-2 mt-auto mb-4">
            {product.sizes?.map(size => (
              <span key={size} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Permanent Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-4 bg-gray-50 hover:bg-black text-black hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm border-t border-gray-100"
      >
        <ShoppingBag size={18} /> Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;
