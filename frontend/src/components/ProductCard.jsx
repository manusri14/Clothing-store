import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
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
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black p-3 rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-premium-dark uppercase tracking-wide">{product.name}</h3>
          <span className="font-bold text-lg text-gray-900">${product.price}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mt-auto">
          {product.sizes?.map(size => (
            <span key={size} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
