import React, { useState } from 'react';
import { Upload, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const AiStylist = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const { addToCart } = useCart();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/analyze`, {
        imageBase64: image
      });
      setResults(res.data);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-premium-light pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-premium-dark uppercase flex items-center justify-center gap-4">
            <Sparkles className="text-yellow-500" size={40} />
            AI Stylist
          </h1>
          <p className="mt-4 text-gray-500">Upload an image of a style you like or a photo of yourself, and our AI will recommend pieces that fit the vibe perfectly.</p>
        </div>

        {!results && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            {preview ? (
              <div className="relative w-full max-w-sm mx-auto">
                <img src={preview} alt="Preview" className="w-full h-80 object-cover rounded-lg shadow-md" />
                <button onClick={reset} className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition">
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full max-w-lg h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="text-gray-400 mb-3" size={32} />
                  <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">JPG, PNG (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}

            {preview && (
              <button 
                onClick={analyzeImage}
                disabled={loading}
                className="mt-8 px-8 py-3 bg-black text-white font-medium uppercase tracking-wider rounded-md hover:bg-gray-800 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Analyzing Fashion DNA...</span>
                ) : (
                  <>Get Recommendations <Sparkles size={18} /></>
                )}
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-800 mb-2">Style Analysis</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-sm">Vibe: </span>
                    <span className="font-bold text-premium-dark">{results.analysis.style}</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-sm">Palette: </span>
                    <span className="font-bold text-premium-dark">{results.analysis.colors?.join(', ')}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-premium-dark uppercase mb-6">Curated For You</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.recommendations.map(product => (
                  <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
                    <div className="h-64 overflow-hidden">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-premium-dark">{product.name}</h4>
                      <p className="text-gray-500 text-sm mt-1 mb-4 h-10 overflow-hidden">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">${product.price}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition rounded"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {results.recommendations.length === 0 && (
                <div className="text-center p-12 bg-white rounded-lg border border-gray-100">
                  <p className="text-gray-500">We couldn't find exact matches for this specific style right now. Try another image!</p>
                </div>
              )}

              <div className="text-center mt-12">
                <button onClick={reset} className="text-gray-500 hover:text-black font-medium underline">
                  Analyze Another Image
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AiStylist;
