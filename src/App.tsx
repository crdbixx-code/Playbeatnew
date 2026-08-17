import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/Toast';
import {
  Home,
  Layers,
  Search,
  ShoppingBag,
  User,
  Radio,
} from 'lucide-react';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { CustomerAccountView } from './views/CustomerAccountView';
import { SupportView } from './views/SupportView';
import { BlogView } from './views/BlogView';
import { CMSPageView } from './views/CMSPageView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { NodeStudioView } from './views/NodeStudioView';
import { WPAdminLoginView } from './views/WPAdminLoginView';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView, cartCount, setIsCartDrawerOpen, setIsSearchOpen } = useApp();

  // Listen for #wp-admin or #admin in URL
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#wp-admin' || hash === '#/wp-admin' || hash === '#login') {
        setActiveView('wp-admin');
      } else if (hash === '#admin') {
        setActiveView('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setActiveView]);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'account':
        return <CustomerAccountView />;
      case 'support':
        return <SupportView />;
      case 'blog':
        return <BlogView />;
      case 'cms':
        return <CMSPageView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'wp-admin':
        return <WPAdminLoginView />;
      case 'node-studio':
        return <NodeStudioView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 flex flex-col selection:bg-cyan-500 selection:text-black font-sans relative pb-16 lg:pb-0">
      {/* Immersive ambient dark indigo radial backdrop */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_30%,#1e1b4b_0%,transparent_70%)] opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{renderCurrentView()}</main>
        {activeView !== 'node-studio' && <Footer />}
      </div>

      {/* Mobile Sticky Bottom Navigation (Gameseal conversion requirement) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070a14]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            activeView === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveView('shop')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            activeView === 'shop' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">Catalog</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-400 hover:text-slate-200"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Search</span>
        </button>

        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-400 hover:text-slate-200"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-blue-600 text-white text-[9px] font-bold">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView('account')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            activeView === 'account' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Vault</span>
        </button>
      </nav>

      {/* Global Interactive Overlays & Drawers */}
      <SearchModal />
      <CartDrawer />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
