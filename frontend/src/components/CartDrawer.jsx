import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, total } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-premium-dark uppercase">Your Cart</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <p className="text-lg">Your cart is currently empty.</p>
                  <button onClick={toggleCart} className="mt-4 underline hover:text-black">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4 border border-gray-100 rounded-xl p-3 shadow-sm bg-white hover:shadow-md transition">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-premium-dark">{item.name}</h3>
                            <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 font-medium bg-gray-100 w-fit px-2 py-0.5 rounded-full">Qty: {item.qty}</p>
                        </div>
                        <p className="font-bold text-lg">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-gray-600 font-medium">Total</span>
                  <span className="text-2xl font-bold text-premium-dark">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-black text-white uppercase font-bold tracking-wider rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
