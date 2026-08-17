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

import { LandingPageView } from './views/LandingPageView';
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
import { ServicesView } from './views/ServicesView';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView, cartCount, setIsCartDrawerOpen, setIsSearchOpen } = useApp();

  // Handle URL routing for /storefront, \storefront, /adminpanel, \adminpanel, etc.
  React.useEffect(() => {
    const handleUrlRoute = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\\/g, '/');
      const hash = window.location.hash.toLowerCase().replace(/\\/g, '/');
      const fullUrl = (pathname + hash).toLowerCase();

      if (
        fullUrl.includes('adminpanel') ||
        fullUrl.includes('wp-admin') ||
        hash === '#admin' ||
        pathname === '/admin'
      ) {
        setActiveView('admin');
      } else if (
        fullUrl.includes('storefront') ||
        hash === '#shop' ||
        hash === '#catalog' ||
        pathname === '/shop' ||
        pathname === '/store'
      ) {
        setActiveView('shop');
      } else if (
        fullUrl.includes('account') ||
        fullUrl.includes('dashboard') ||
        hash === '#dashboard'
      ) {
        setActiveView('account');
      } else if (fullUrl.includes('support') || hash === '#support') {
        setActiveView('support');
      } else if (fullUrl.includes('checkout') || hash === '#checkout') {
        setActiveView('checkout');
      } else if (fullUrl.includes('blog') || hash === '#blog') {
        setActiveView('blog');
      } else if (fullUrl.includes('services') || fullUrl.includes('business') || hash === '#services') {
        setActiveView('services');
      } else if (fullUrl.includes('node-studio') || hash === '#studio') {
        setActiveView('node-studio');
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, [setActiveView]);

  // Sync hash URL when activeView changes
  React.useEffect(() => {
    if (activeView === 'admin' || activeView === 'wp-admin') {
      if (window.location.hash !== '#adminpanel') {
        window.history.replaceState(null, '', '#adminpanel');
      }
    } else if (activeView === 'shop') {
      if (window.location.hash !== '#storefront') {
        window.history.replaceState(null, '', '#storefront');
      }
    } else if (activeView === 'home') {
      if (window.location.hash === '#adminpanel' || window.location.hash === '#storefront') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else if (activeView === 'account') {
      if (window.location.hash !== '#account') {
        window.history.replaceState(null, '', '#account');
      }
    }
  }, [activeView]);

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
      case 'services':
        return <ServicesView />;
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#071A3D] flex flex-col selection:bg-[#F5C542] selection:text-[#041126] font-sans relative pb-16 lg:pb-0">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{renderCurrentView()}</main>
        {activeView !== 'node-studio' && <Footer />}
      </div>

      {/* Mobile Sticky Bottom Navigation with White/Silver/Navy/Yellow theme */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#C8CDD5] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            activeView === 'home' ? 'text-[#071A3D] font-bold' : 'text-[#64748B] hover:text-[#071A3D]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveView('shop')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            activeView === 'shop' ? 'text-[#071A3D] font-bold' : 'text-[#64748B] hover:text-[#071A3D]'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">Catalog</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[#64748B] hover:text-[#071A3D]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Search</span>
        </button>

        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[#64748B] hover:text-[#071A3D]"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-[#F5C542] text-[#041126] text-[9px] font-bold">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView('account')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            activeView === 'account' ? 'text-[#071A3D] font-bold' : 'text-[#64748B] hover:text-[#071A3D]'
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
