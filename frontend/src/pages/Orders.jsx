import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/myorders`, config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="min-h-screen pt-32 pb-20 text-center">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-premium-light pt-24 md:pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-10 text-center">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4 text-lg">You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/showroom')} className="underline font-medium hover:text-premium-gold transition">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Order ID</p>
                    <p className="font-mono text-sm">{order._id}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-left md:text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Date</p>
                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {item.product && item.product.images && item.product.images[0] ? (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-premium-dark">{item.product ? item.product.name : 'Unknown Product'}</p>
                          <p className="text-gray-500 text-xs">Qty: {item.qty} | Size: {item.size || 'M'}</p>
                        </div>
                      </div>
                      <div className="font-bold">${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div className="max-w-xs">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Shipping To</p>
                    <p className="text-sm text-gray-700">{order.shippingAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                    <p className="text-xl font-bold">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
