import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag, Sparkles, UserCircle2, ClipboardList } from 'lucide-react';
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
          <Home size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
        </Link>
        
        <Link to="/showroom" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/showroom') ? 'text-black' : 'hover:text-black'}`}>
          <Sparkles size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Shop</span>
        </Link>

        <Link to="/categories/men" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/categories/men') ? 'text-black' : 'hover:text-black'}`}>
          <User size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Men</span>
        </Link>

        <Link to="/categories/women" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/categories/women') ? 'text-black' : 'hover:text-black'}`}>
          <UserCircle2 size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Women</span>
        </Link>

        <Link to="/ai-stylist" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/ai-stylist') ? 'text-premium-gold' : 'hover:text-premium-gold'}`}>
          <Sparkles size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">AI</span>
        </Link>

        <Link to="/orders" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/orders') ? 'text-black' : 'hover:text-black'}`}>
          <ClipboardList size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Orders</span>
        </Link>

      </div>
    </div>
  );
};

export default BottomNav;
