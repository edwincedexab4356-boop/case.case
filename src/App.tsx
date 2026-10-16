import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Hero } from './components/home/Hero';
import { CategoryNav } from './components/catalog/CategoryNav';
import { LuggageFinder } from './components/home/LuggageFinder';
import { ProductGrid } from './components/catalog/ProductGrid';
import { BenefitsSection } from './components/home/BenefitsSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { Toast } from './components/common/Toast';

const MainLayout: React.FC = () => {
  const { viewMode, isAdminAuthenticated } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* View routing: Store vs Admin */}
      {viewMode === 'admin' ? (
        isAdminAuthenticated ? (
          <AdminDashboard />
        ) : (
          <AdminLogin />
        )
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Hero />
            <CategoryNav />
            <LuggageFinder />
            <ProductGrid />
            <BenefitsSection />
            <TestimonialsSection />
          </main>
          <Footer />
        </>
      )}

      {/* Interactive Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
