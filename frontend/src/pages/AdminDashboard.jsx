import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Package, ShoppingCart, LogOut, Plus, X, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', category: 'MEN', images: '', sizes: 'S, M, L'
  });

  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
        setProducts(prodRes.data);
      } catch (error) {
        console.error('Error fetching admin data', error);
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`, config);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewProduct({ name: '', description: '', price: '', category: 'MEN', images: '', sizes: 'S, M, L' });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      images: product.images.join(', '),
      sizes: product.sizes.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        images: newProduct.images.split(',').map(url => url.trim()),
        sizes: newProduct.sizes.split(',').map(s => s.trim()),
        price: Number(newProduct.price),
        featured: false
      };

      if (editingId) {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${editingId}`, payload, config);
        setProducts(products.map(p => p._id === editingId ? data : p));
      } else {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`, payload, config);
        setProducts([...products, data]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      alert(`Error ${editingId ? 'editing' : 'adding'} product: ` + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-premium-light pt-24 px-6 flex flex-col md:flex-row gap-8 pb-20">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <h2 className="text-xl font-bold tracking-widest text-premium-dark uppercase mb-8">Admin Panel</h2>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition ${activeTab === 'products' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition ${activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ShoppingCart size={18} /> Orders
          </button>
        </nav>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-premium-dark uppercase">Manage Products</h3>
              <button onClick={openAddModal} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition">
                <Plus size={16} /> Add Product
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      </td>
                      <td className="px-6 py-4 font-medium text-premium-dark">{product.name}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => openEditModal(product)} className="text-blue-500 hover:underline mr-4">Edit</button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500">
            Order management system coming soon...
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black cursor-pointer" />
            
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold uppercase tracking-wide">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black"><X size={24}/></button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border rounded p-2 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border rounded p-2 focus:outline-none focus:border-black" rows="3" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border rounded p-2 focus:outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border rounded p-2 focus:outline-none focus:border-black">
                      <option value="MEN">Men</option>
                      <option value="WOMEN">Women</option>
                      <option value="STREETWEAR">Streetwear</option>
                      <option value="FORMAL">Formal</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
                  <input type="text" required value={newProduct.images} onChange={e => setNewProduct({...newProduct, images: e.target.value})} className="w-full border rounded p-2 focus:outline-none focus:border-black" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
                  <input type="text" required value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})} className="w-full border rounded p-2 focus:outline-none focus:border-black" placeholder="S, M, L, XL" />
                </div>
                <button type="submit" className="w-full py-3 mt-4 bg-black text-white font-bold uppercase rounded hover:bg-gray-800 transition">
                  {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
