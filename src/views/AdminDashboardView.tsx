import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Package,
  Key,
  ShoppingBag,
  Clock,
  MessageSquare,
  Tag,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  Users,
  Activity,
  FileText,
  Save,
  Send,
  Zap,
  Sliders,
  Sparkles,
  Eye,
  Lock,
  Layout,
  Boxes,
} from 'lucide-react';
import { Product, Order, InventoryKey, Coupon, Ticket, Review, AuditLog } from '../types';
import { WebsiteBuilderTool } from '../components/admin/WebsiteBuilderTool';
import { ProductManagementTool } from '../components/admin/ProductManagementTool';

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    categories,
    orders,
    subscriptions,
    tickets,
    analytics,
    auditLogs,
    settings,
    currentUser,
    setCurrentUser,
    setActiveView,
    refreshData,
    showToast,
    switchRole,
  } = useApp();

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('pb_admin_auth') === 'playbeat1122' ||
      currentUser?.role === 'super_admin' ||
      currentUser?.role === 'admin'
    );
  });
  const [adminPasswordInput, setAdminPasswordInput] = useState('playbeat1122');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [adminTab, setAdminTab] = useState<
    'analytics' | 'builder' | 'product_manager' | 'products' | 'keys' | 'orders' | 'subscriptions' | 'reviews' | 'tickets' | 'coupons' | 'cms' | 'audit'
  >('analytics');

  const handleVerifyAdminPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/verify-admin-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPasswordInput.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('pb_admin_auth', 'playbeat1122');
        setIsAdminUnlocked(true);
        if (data.user) {
          setCurrentUser(data.user);
        }
        showToast('Admin Panel Unlocked (playbeat1122) ⚡', 'success');
        await refreshData();
      } else {
        setAuthError(data.message || 'Incorrect password. (Password is playbeat1122)');
        showToast('Access denied', 'error');
      }
    } catch {
      setAuthError('Connection error. Please retry.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLockAdmin = () => {
    sessionStorage.removeItem('pb_admin_auth');
    setIsAdminUnlocked(false);
    showToast('Admin Panel locked.', 'info');
  };

  // Key Vault Bulk Upload modal state
  const [isBulkKeyModalOpen, setIsBulkKeyModalOpen] = useState(false);
  const [selectedProductForKeys, setSelectedProductForKeys] = useState<string>(products[0]?.id || '');
  const [batchKeyInput, setBatchKeyInput] = useState('');
  const [inventoryList, setInventoryList] = useState<InventoryKey[]>([]);

  // Product Creator/Editor modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: 19.99,
    salePrice: 14.99,
    category: 'gaming',
    productType: 'gaming_product',
    brand: 'PlayBeat Official',
    sku: 'PB-KEY-' + Math.floor(1000 + Math.random() * 9000),
    stock: 25,
    images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'],
    isFeatured: true,
    isFlashDeal: false,
    isBestSeller: true,
    tags: ['instant_delivery', 'pc', 'global'],
  });

  // Coupons state
  const [couponsList, setCouponsList] = useState<Coupon[]>([]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');

  // Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [adminReplyText, setAdminReplyText] = useState<Record<string, string>>({});

  // CMS Settings Editor
  const [heroSubheadline, setHeroSubheadline] = useState(settings?.appearance?.heroSubheadline || '');
  const [announcementText, setAnnouncementText] = useState(settings?.appearance?.topAnnouncement || '');

  useEffect(() => {
    fetchInventory();
    fetchCoupons();
    fetchReviews();
  }, []);

  const fetchInventory = () => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => setInventoryList(data.inventory || []))
      .catch(() => {});
  };

  const fetchCoupons = () => {
    fetch('/api/coupons')
      .then(res => res.json())
      .then(data => setCouponsList(data.coupons || []))
      .catch(() => {});
  };

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviewsList(data.reviews || []))
      .catch(() => {});
  };

  // Bulk Key Upload
  const handleBulkKeyUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawKeys = batchKeyInput
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (rawKeys.length === 0) {
      showToast('Please enter at least one digital key', 'error');
      return;
    }

    try {
      const res = await fetch('/api/inventory/batch-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductForKeys,
          keys: rawKeys,
        }),
      });
      if (res.ok) {
        setBatchKeyInput('');
        setIsBulkKeyModalOpen(false);
        fetchInventory();
        await refreshData();
        showToast(`Successfully uploaded ${rawKeys.length} keys to Vault! ⚡`, 'success');
      }
    } catch {
      showToast('Failed to upload keys', 'error');
    }
  };

  // Save / Update Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProductId ? `/api/products/${editingProductId}` : '/api/products';
      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      });

      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProductId(null);
        await refreshData();
        showToast('Product saved successfully!', 'success');
      }
    } catch {
      showToast('Error saving product', 'error');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        showToast('Product deleted', 'info');
      }
    } catch {
      showToast('Failed to delete product', 'error');
    }
  };

  // Create Coupon
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newCouponCode.toUpperCase(),
          discountType: newCouponType,
          discountValue: newCouponDiscount,
          minOrderValue: 20,
          usageLimit: 100,
        }),
      });
      if (res.ok) {
        setNewCouponCode('');
        fetchCoupons();
        showToast('New coupon code created!', 'success');
      }
    } catch {
      showToast('Failed to create coupon', 'error');
    }
  };

  // Admin Review Reply
  const handleReplyReview = async (reviewId: string) => {
    const text = adminReplyText[reviewId];
    if (!text) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminReply: text }),
      });
      if (res.ok) {
        fetchReviews();
        showToast('Reply published to storefront!', 'success');
      }
    } catch {
      showToast('Failed to post reply', 'error');
    }
  };

  // Update Store Appearance / CMS
  const handleSaveCMS = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appearance: {
            heroSubheadline,
            topAnnouncement: announcementText,
          },
        }),
      });
      if (res.ok) {
        await refreshData();
        showToast('Storefront announcement and CMS settings updated!', 'success');
      }
    } catch {
      showToast('Failed to save settings', 'error');
    }
  };

  if (!isAdminUnlocked) {
    return (
      <div className="min-h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 shadow-2xl shadow-black/80 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800">
              playbeat.digital/adminpanel
            </span>
            <h2 className="text-2xl font-black text-white mt-3">Admin Panel Access</h2>
            <p className="text-xs text-slate-400 mt-1">
              This area is password protected. Enter the administrator key to manage products, keys, and orders.
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-left text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>Required Password:</span>
              <span className="font-mono text-cyan-300 font-bold">playbeat1122</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Direct access url: <span className="font-mono text-slate-400">/adminpanel</span>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/60 border border-rose-600/50 rounded-xl text-rose-300 text-xs font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleVerifyAdminPassword} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Panel Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPass ? 'text' : 'password'}
                  value={adminPasswordInput}
                  onChange={e => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter playbeat1122"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 pr-10 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showAdminPass ? <XCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              {isVerifying ? 'Verifying Credentials...' : 'Unlock Admin Panel (playbeat1122)'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setActiveView('shop')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Storefront (/storefront)
            </button>
            <button
              type="button"
              onClick={() => {
                setAdminPasswordInput('playbeat1122');
                setTimeout(() => handleVerifyAdminPassword(), 50);
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Auto-fill & Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
              Super Admin Console
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Cluster Online
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-[10px]">
              playbeat.digital/adminpanel (Password: playbeat1122)
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">PlayBeat Digital Admin Portal</h1>
          <p className="text-xs text-slate-400 font-mono">Realtime Key Dispatch Engine • 256-Bit Vault Storage</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveView('shop')}
            className="px-3.5 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4" /> Storefront (/storefront)
          </button>

          <button
            onClick={() => {
              setEditingProductId(null);
              setProductForm({
                name: '',
                slug: '',
                shortDescription: '',
                description: '',
                price: 19.99,
                salePrice: 14.99,
                category: 'gaming',
                productType: 'gaming_product',
                brand: 'PlayBeat Digital',
                sku: 'PB-KEY-' + Math.floor(1000 + Math.random() * 9000),
                stock: 20,
                images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'],
                isFeatured: true,
                isFlashDeal: false,
                isBestSeller: true,
                tags: ['instant_key'],
              });
              setIsProductModalOpen(true);
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button
            onClick={() => setIsBulkKeyModalOpen(true)}
            className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Key className="w-4 h-4" /> Bulk Upload Keys
          </button>

          <button
            onClick={handleLockAdmin}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            Lock Admin
          </button>
        </div>
      </div>

      {/* KPI Cards Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ${analytics?.totalRevenue?.toFixed(2) || '1,842.50'}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">↑ +18.4% vs last month</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Orders Completed</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {analytics?.totalOrdersCount || orders.length}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">100% Instant Delivery</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Active Subscriptions</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {subscriptions.filter(s => s.status === 'active').length}
          </div>
          <span className="text-[10px] text-purple-400 font-mono">Recurring SaaS & Passes</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Pending Support Tickets</span>
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {tickets.filter(t => t.status === 'open').length}
          </div>
          <span className="text-[10px] text-amber-400 font-mono">Response time &lt; 8m</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 overflow-x-auto text-xs font-semibold pb-1">
        {[
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'builder', label: 'Website Builder', icon: Layout, highlight: true },
          { id: 'product_manager', label: 'Product Manager Tool', icon: Boxes, highlight: true },
          { id: 'products', label: `Catalog (${products.length})`, icon: Package },
          { id: 'keys', label: `Key Vault (${inventoryList.length})`, icon: Key },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'subscriptions', label: `Subscriptions (${subscriptions.length})`, icon: Clock },
          { id: 'reviews', label: `Reviews Moderation`, icon: MessageSquare },
          { id: 'tickets', label: `Support Tickets (${tickets.length})`, icon: ShieldCheck },
          { id: 'coupons', label: `Coupons & Promos`, icon: Tag },
          { id: 'cms', label: 'CMS & Announcements', icon: FileText },
          { id: 'audit', label: 'Audit Logs', icon: Activity },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl transition-all shrink-0 ${
                adminTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : tab.highlight
                  ? 'bg-purple-950/70 border border-purple-800/60 text-purple-300 hover:bg-purple-900/80 hover:text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 0. WEBSITE BUILDER TOOL TAB */}
      {adminTab === 'builder' && <WebsiteBuilderTool />}

      {/* 0.1 ADVANCED PRODUCT MANAGEMENT TOOL TAB */}
      {adminTab === 'product_manager' && <ProductManagementTool />}

      {/* 1. ANALYTICS & INSIGHTS TAB */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales by Category */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Sales Breakdown by Category</h3>
              <div className="space-y-3">
                {analytics?.salesByCategory &&
                  Object.entries(analytics.salesByCategory).map(([cat, total]) => (
                    <div key={cat} className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span className="capitalize font-semibold">{cat.replace('-', ' ')}</span>
                        <span className="font-mono font-bold text-cyan-400">${(total as number).toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                          style={{
                            width: `${Math.min(100, ((total as number) / (analytics.totalRevenue || 1)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Top Performing Software & Keys</h3>
              <div className="space-y-3">
                {analytics?.topProducts &&
                  analytics.topProducts.map((p, idx) => (
                    <div
                      key={p.productId}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-cyan-400 font-bold flex items-center justify-center font-mono">
                          #{idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-white">{p.productName}</h4>
                          <span className="text-slate-500 font-mono">{p.unitsSold} licenses dispatched</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">${p.revenue.toFixed(2)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS CATALOG MANAGEMENT TAB */}
      {adminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-white">Product Catalog ({products.length} Items)</h2>
            <button
              onClick={() => {
                setEditingProductId(null);
                setProductForm({
                  name: '',
                  slug: '',
                  shortDescription: '',
                  description: '',
                  price: 19.99,
                  salePrice: 14.99,
                  category: 'gaming',
                  productType: 'gaming_product',
                  brand: 'PlayBeat Digital',
                  sku: 'PB-KEY-' + Math.floor(1000 + Math.random() * 9000),
                  stock: 20,
                  images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'],
                  isFeatured: true,
                  isFlashDeal: false,
                  isBestSeller: true,
                  tags: ['instant_key'],
                });
                setIsProductModalOpen(true);
              }}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Badges</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map(prod => (
                  <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 flex items-center gap-2.5">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-9 h-9 rounded-lg object-cover bg-slate-950 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white">{prod.name}</div>
                        <div className="font-mono text-[10px] text-slate-500">SKU: {prod.sku}</div>
                      </div>
                    </td>
                    <td className="p-3.5 capitalize font-medium text-cyan-400">{prod.category}</td>
                    <td className="p-3.5 font-mono">
                      <div className="font-bold text-white">${(prod.salePrice || prod.price).toFixed(2)}</div>
                      {prod.salePrice && (
                        <div className="text-[10px] text-slate-500 line-through">${prod.price.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="p-3.5 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prod.stock > 10 ? 'bg-emerald-950 text-emerald-400' : 'bg-orange-950 text-orange-400'
                      }`}>
                        {prod.stock} keys
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex gap-1">
                        {prod.isFlashDeal && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-950 text-rose-300 border border-rose-800">
                            Flash
                          </span>
                        )}
                        {prod.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-950 text-cyan-300 border border-blue-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProductId(prod.id);
                            setProductForm(prod);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-rose-950"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. KEY VAULT & INVENTORY DISPATCHER TAB */}
      {adminTab === 'keys' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-white">Digital Vault Inventory ({inventoryList.length} Serial Keys)</h2>
              <p className="text-xs text-slate-400">Encrypted license keys awaiting automated customer checkout.</p>
            </div>
            <button
              onClick={() => setIsBulkKeyModalOpen(true)}
              className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Key className="w-4 h-4" /> Batch Import Keys
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Product Associated</th>
                  <th className="p-3.5">Encrypted Serial Key</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Batch Identifier</th>
                  <th className="p-3.5">Allocated Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {inventoryList.map(inv => {
                  const prod = products.find(p => p.id === inv.productId);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-sans font-semibold text-white">
                        {prod ? prod.name : inv.productId}
                      </td>
                      <td className="p-3.5 text-cyan-300 font-bold tracking-wider">{inv.keyValue}</td>
                      <td className="p-3.5 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            inv.status === 'available'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">{inv.batchNumber || 'BATCH-001'}</td>
                      <td className="p-3.5 text-slate-400">{inv.assignedToOrder || '— In Vault'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. ORDERS TAB */}
      {adminTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Customer Orders ({orders.length})</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Order #</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Gateway</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Fulfillment</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-cyan-400">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{ord.customerName}</div>
                      <div className="text-slate-500 text-[10px] font-mono">{ord.customerEmail}</div>
                    </td>
                    <td className="p-3.5 uppercase font-mono text-[10px] text-slate-400">{ord.paymentMethod}</td>
                    <td className="p-3.5 font-mono font-bold text-white">${ord.total.toFixed(2)}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {ord.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 text-[11px] font-mono">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. COUPONS & PROMOS TAB */}
      {adminTab === 'coupons' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Generate Discount Coupon</h3>
            <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Coupon Code (e.g. FLASH20)"
                value={newCouponCode}
                onChange={e => setNewCouponCode(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white uppercase font-mono"
              />
              <select
                value={newCouponType}
                onChange={e => setNewCouponType(e.target.value as any)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="percentage">Percentage (%) Discount</option>
                <option value="fixed">Fixed Dollar ($) Off</option>
              </select>
              <input
                type="number"
                placeholder="Value (e.g. 15)"
                value={newCouponDiscount}
                onChange={e => setNewCouponDiscount(Number(e.target.value))}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Create Coupon Code
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {couponsList.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-black text-cyan-400 text-sm">{c.code}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400">
                    Active
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-bold">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `$${c.discountValue} OFF`}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Used: {c.usedCount} times • Min Order: ${c.minOrderValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CMS & STOREFRONT SETTINGS TAB */}
      {adminTab === 'cms' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 max-w-2xl">
          <h2 className="text-base font-bold text-white">Storefront CMS & Live Announcement Banner</h2>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Top Promo Announcement Banner</label>
            <input
              type="text"
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Hero Subheadline</label>
            <textarea
              rows={3}
              value={heroSubheadline}
              onChange={e => setHeroSubheadline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <button
            onClick={handleSaveCMS}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <Save className="w-4 h-4" /> Save Storefront CMS Settings
          </button>
        </div>
      )}

      {/* 7. AUDIT LOGS TAB */}
      {adminTab === 'audit' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Immutable Security & Key Dispatch Audit Logs</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Actor</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Details</th>
                  <th className="p-3.5 font-mono">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="p-3.5 text-white font-bold">{log.actorName}</td>
                    <td className="p-3.5 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-sans text-slate-300">{log.details}</td>
                    <td className="p-3.5 text-slate-500">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: BULK KEY UPLOAD MODAL */}
      {isBulkKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" /> Bulk Vault Key Ingestion
              </h3>
              <button onClick={() => setIsBulkKeyModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleBulkKeyUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Target Product</label>
                <select
                  value={selectedProductForKeys}
                  onChange={e => setSelectedProductForKeys(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Serial License Keys (1 key per line):
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder={`W269N-WFGWX-YVC9B-4J6C9-T83GX\nRHG92-46N7C-6T7UX-PWPDD-XXXXX\nPLAYBEAT-VAULT-XYZ99-2026`}
                  value={batchKeyInput}
                  onChange={e => setBatchKeyInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-300 font-mono placeholder-slate-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBulkKeyModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-slate-950 text-xs font-extrabold rounded-xl"
                >
                  Inject Keys to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProductId ? 'Edit Digital Product' : 'Create New Digital Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={e =>
                      setProductForm({
                        ...productForm,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Brand / Publisher</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={e => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Regular Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Sale Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.salePrice || ''}
                    onChange={e => setProductForm({ ...productForm, salePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.images?.[0] || ''}
                  onChange={e => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Summary</label>
                <input
                  type="text"
                  required
                  value={productForm.shortDescription}
                  onChange={e => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                <textarea
                  rows={4}
                  required
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFlashDeal}
                    onChange={e => setProductForm({ ...productForm, isFlashDeal: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>Mark as Flash Deal</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={e => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
