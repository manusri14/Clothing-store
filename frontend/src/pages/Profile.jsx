import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const Profile = () => {
  const { user, login } = useAuth(); // Assuming login updates user context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAddress(user.address || '');
      setPreview(user.profilePic || null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      if (password) formData.append('password', password);
      if (profilePic) formData.append('profilePic', profilePic);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/profile`, formData, config);
      
      toast.success('Profile updated successfully!');
      
      // Update local storage and context
      localStorage.setItem('userInfo', JSON.stringify(data));
      // Reload page to reflect changes or update context if we have a setUser method
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="min-h-screen pt-32 text-center">Please login</div>;

  return (
    <div className="min-h-screen bg-premium-light pt-24 md:pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto glass p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-8 text-center">My Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 mb-4 flex items-center justify-center relative group">
              {preview ? (
                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Profile Picture</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Delivery Address</label>
              <textarea rows="3" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors resize-none" placeholder="Your default shipping address..." />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">New Password (Optional)</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-black text-white uppercase font-bold tracking-widest rounded shadow-lg hover:bg-gray-800 transition mt-8 disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
