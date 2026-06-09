import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag, Sparkles, UserCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const location = useLocation();
  const { cartItems, toggleCart } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-50 px-6 py-3 pb-safe">
      <div className="flex justify-between items-center text-gray-500">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-black' : 'hover:text-black'}`}>
          <Home size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </Link>
        
        <Link to="/categories/men" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/categories/men') ? 'text-black' : 'hover:text-black'}`}>
          <User size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Men</span>
        </Link>

        <Link to="/categories/women" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/categories/women') ? 'text-black' : 'hover:text-black'}`}>
          <UserCircle2 size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Women</span>
        </Link>

        <Link to="/ai-stylist" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/ai-stylist') ? 'text-premium-gold' : 'hover:text-premium-gold'}`}>
          <Sparkles size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Stylist</span>
        </Link>

        <button onClick={toggleCart} className="flex flex-col items-center gap-1 transition-colors hover:text-black relative">
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider">Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
