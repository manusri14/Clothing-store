import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    title: "MANU'S",
    subtitle: "CLEAN. MODERN. ESSENTIAL.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600&q=80",
    title: "SUMMER '26",
    subtitle: "LIGHTWEIGHT FABRICS. EFFORTLESS STYLE.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    title: "URBAN ESSENTIALS",
    subtitle: "STREETWEAR REDEFINED.",
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const shopRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-premium-light min-h-screen">
      {/* Hero Section */}
      <main className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={slides[currentSlide].image}
              alt="Fashion Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-premium-light to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 text-center px-4 mt-8 md:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white uppercase drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>
              <p className="mt-6 text-xl tracking-widest text-gray-200 font-light uppercase">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 md:mt-12"
          >
            <button 
              onClick={scrollToShop}
              className="px-10 py-4 bg-white text-black uppercase tracking-widest text-sm font-bold hover:bg-gray-200 transition-colors shadow-xl rounded-sm"
            >
              Explore Collection
            </button>
          </motion.div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-12 h-1 rounded-full transition-colors duration-500 ${currentSlide === idx ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Featured Collection Section */}
      <section ref={shopRef} className="py-12 md:py-24 px-4 sm:px-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-premium-dark uppercase">Featured Collection</h2>
              <p className="text-gray-500 mt-2">Discover our newest arrivals designed for the modern lifestyle.</p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-10 md:py-20 text-gray-400">Loading collection...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
