import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Sparkles, LayoutDashboard, LogOut, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { cartItems, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
          
          <Link to="/" className="text-2xl font-bold tracking-widest text-premium-dark uppercase">
            MANU'S
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-medium text-gray-600">
            <Link to="/showroom" className="hover:text-black transition-colors">Showroom</Link>
            <Link to="/categories/men" className="hover:text-black transition-colors">Men</Link>
            <Link to="/categories/women" className="hover:text-black transition-colors">Women</Link>
            <Link to="/ai-stylist" className="hover:text-black transition-colors flex items-center gap-1 text-premium-gold font-bold">
              <Sparkles size={16} /> AI Stylist
            </Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="hover:text-black transition-colors flex items-center gap-1 text-blue-600 font-bold">
                <LayoutDashboard size={16} /> Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/orders" className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black">Orders</Link>
                <Link to="/profile" className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black">Profile</Link>
                <Link to="/orders" className="md:hidden text-gray-600 hover:text-black mr-2">
                  <ClipboardList size={20} />
                </Link>
                <Link to="/profile" className="md:hidden text-gray-600 hover:text-black">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </Link>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-black transition-colors" title="Login">
                <User size={20} />
              </Link>
            )}
            <button onClick={toggleCart} className="text-gray-600 hover:text-black transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </motion.nav>
      <CartDrawer />
    </>
  );
};

export default Navbar;
