import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      window.location.href = '/'; // Simple redirect to home
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-premium-light flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-20"
      >
        <h2 className="text-3xl font-bold tracking-tight text-premium-dark uppercase text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Sign in to your Manu's account</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-black text-white font-bold uppercase tracking-wider rounded hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Don't have an account? <span className="underline hover:text-black cursor-pointer">Sign Up</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
