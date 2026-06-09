import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Showroom = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Editorial Header */}
      <div className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-premium-dark uppercase mb-6"
        >
          The Lookbook
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 tracking-widest uppercase text-sm md:text-base font-light leading-relaxed"
        >
          A curated visual experience of our finest pieces. Fall/Winter '26 Collection.
        </motion.p>
      </div>

      {/* Masonry Grid */}
      <div className="px-4 md:px-8 pb-24 max-w-screen-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {products.map((product, idx) => (
              <motion.div 
                key={product._id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="break-inside-avoid relative group overflow-hidden rounded-sm cursor-pointer"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-white/80 text-xs font-bold tracking-widest uppercase mb-1">{product.category}</span>
                  <h3 className="text-white text-lg font-bold tracking-wide uppercase mb-2">{product.name}</h3>
                  <p className="text-white/90 text-sm font-medium">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Showroom;
