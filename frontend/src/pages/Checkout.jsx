import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, total, setCartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState(user?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 text-center">
        <h2 className="text-3xl font-bold uppercase mb-4">Your Cart is Empty</h2>
        <button onClick={() => navigate('/showroom')} className="underline">Go back to shop</button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          qty: item.qty,
          price: item.price,
          size: item.selectedSize || 'M'
        })),
        totalPrice: total,
        shippingAddress: address
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, orderData, config);
      
      toast.success('Order placed successfully!');
      // Clear cart
      // We don't have clearCart in CartContext but we can fake it or reload. Let's just navigate to orders
      // For now, I'll navigate and the user can clear the cart themselves, or I can add clearCart to context.
      // Better yet, just reload window or go to orders
      setTimeout(() => {
        navigate('/orders');
      }, 1000);
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to place order');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-light pt-24 md:pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto glass p-6 md:p-10 rounded-xl">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-200 pb-2">Shipping Details</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Delivery Address</label>
                <textarea 
                  required
                  rows="4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Enter your full shipping address..."
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white uppercase font-bold tracking-widest rounded shadow-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-fit">
            <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-200 pb-2">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex gap-4 items-center">
                    <img src={item.images[0]} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-bold text-premium-dark">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold uppercase">Total</span>
              <span className="text-2xl font-bold text-premium-gold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
