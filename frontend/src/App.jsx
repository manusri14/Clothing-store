import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Showroom from './pages/Showroom';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import AiStylist from './pages/AiStylist';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import BottomNav from './components/BottomNav';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="bg-premium-light min-h-screen text-premium-dark relative w-full pb-16 md:pb-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/showroom" element={<Showroom />} />
              <Route path="/categories/:categoryId" element={<Category />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/ai-stylist" element={<AiStylist />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <BottomNav />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
