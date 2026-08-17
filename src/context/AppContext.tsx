import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Product,
  CartItem,
  Coupon,
  Order,
  Subscription,
  Category,
  DigitalInventoryItem,
  Review,
  Ticket,
  BlogPost,
  CMSPage,
  StoreSettings,
  NotificationItem,
} from '../types';

interface AppContextType {
  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: User['role']) => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => void;

  // Navigation / Active View
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProductSlug: string | null;
  openProductDetail: (slug: string) => void;
  selectedCategorySlug: string | null;
  openCategory: (slug: string) => void;
  selectedCMSPageSlug: string | null;
  openCMSPage: (slug: string) => void;
  selectedBlogPostId: string | null;
  openBlogPost: (id: string) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;

  // Currency & Region
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (priceInUSD: number) => string;
  userPoints: number;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedDuration?: string, variant?: ProductVariant) => void;
  buyNow: (product: Product, selectedDuration?: string, variant?: ProductVariant) => void;
  removeFromCart: (itemKey: string) => void;
  updateCartQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  appliedDiscount: number;
  applyCouponCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;

  // Data Store
  products: Product[];
  categories: Category[];
  orders: Order[];
  subscriptions: Subscription[];
  inventory: DigitalInventoryItem[];
  reviews: Review[];
  tickets: Ticket[];
  blogPosts: BlogPost[];
  cmsPages: CMSPage[];
  settings: StoreSettings | null;
  notifications: NotificationItem[];
  refreshData: () => Promise<void>;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;

  // Toast / Alert Notification System
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedCMSPageSlug, setSelectedCMSPageSlug] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [inventory, setInventory] = useState<DigitalInventoryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [cmsPages, setCmsPages] = useState<CMSPage[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [currency, setCurrency] = useState<string>('USD');
  const [userPoints] = useState<number>(350);

  const formatPrice = (priceInUSD: number) => {
    if (priceInUSD === 0) return 'FREE';
    switch (currency) {
      case 'PKR':
        return `₨ ${(priceInUSD * 278.5).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      case 'EUR':
        return `€${(priceInUSD * 0.92).toFixed(2)}`;
      case 'GBP':
        return `£${(priceInUSD * 0.79).toFixed(2)}`;
      case 'USD':
      default:
        return `$${priceInUSD.toFixed(2)}`;
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchInitialData = async () => {
    try {
      // Fetch user profile
      const authRes = await fetch('/api/auth/me');
      if (authRes.ok) {
        const authData = await authRes.json();
        setCurrentUser(authData.user);
      }

      // Fetch products
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
      }

      // Fetch categories
      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || []);
      }

      // Fetch settings
      const setRes = await fetch('/api/settings');
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings(setData.settings);
      }

      // Fetch orders & others
      const [ordRes, subRes, revRes, tktRes, blgRes, cmsRes, notifRes, invRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/subscriptions'),
        fetch('/api/reviews'),
        fetch('/api/tickets'),
        fetch('/api/blog'),
        fetch('/api/cms/pages'),
        fetch('/api/notifications'),
        fetch('/api/inventory'),
      ]);

      if (ordRes.ok) {
        const d = await ordRes.json();
        setOrders(d.orders || []);
      }
      if (subRes.ok) {
        const d = await subRes.json();
        setSubscriptions(d.subscriptions || []);
      }
      if (revRes.ok) {
        const d = await revRes.json();
        setReviews(d.reviews || []);
      }
      if (tktRes.ok) {
        const d = await tktRes.json();
        setTickets(d.tickets || []);
      }
      if (blgRes.ok) {
        const d = await blgRes.json();
        setBlogPosts(d.posts || []);
      }
      if (cmsRes.ok) {
        const d = await cmsRes.json();
        setCmsPages(d.pages || []);
      }
      if (notifRes.ok) {
        const d = await notifRes.json();
        setNotifications(d.notifications || []);
      }
      if (invRes.ok) {
        const d = await invRes.json();
        setInventory(d.inventory || []);
      }
    } catch (err) {
      console.error('Failed to load store data', err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const refreshData = async () => {
    await fetchInitialData();
  };

  const switchRole = async (role: User['role']) => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        showToast(`Switched profile mode to: ${role.replace('_', ' ').toUpperCase()}`, 'info');
      }
    } catch {
      showToast('Failed to switch role', 'error');
    }
  };

  const login = async (email: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        showToast(`Welcome back, ${data.user.name}!`, 'success');
      }
    } catch {
      showToast('Login failed. Please check credentials.', 'error');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
  };

  const openProductDetail = (slug: string) => {
    setSelectedProductSlug(slug);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCMSPage = (slug: string) => {
    setSelectedCMSPageSlug(slug);
    setActiveView('cms-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBlogPost = (id: string) => {
    setSelectedBlogPostId(id);
    setActiveView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedDuration?: string,
    variant?: ProductVariant
  ) => {
    setCart(prev => {
      const variantKey = variant ? variant.id : (selectedDuration || 'standard');
      const existingIdx = prev.findIndex(
        item => item.productId === product.id && (item.variantId || item.selectedDuration || 'standard') === variantKey
      );
      
      const unitPrice = variant
        ? (variant.salePrice !== undefined ? variant.salePrice : variant.price)
        : (product.salePrice !== undefined ? product.salePrice : product.price);

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            variantId: variant?.id,
            variantName: variant?.name,
            selectedDuration: selectedDuration || product.subscriptionDuration,
            quantity,
            unitPrice,
          },
        ];
      }
    });

    const displayName = variant ? `${product.name} (${variant.name})` : product.name;
    showToast(`Added "${displayName}" to cart! ⚡`, 'success');
  };

  const buyNow = (product: Product, selectedDuration?: string, variant?: ProductVariant) => {
    addToCart(product, 1, selectedDuration, variant);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFromCart = (itemKey: string) => {
    setCart(prev =>
      prev.filter(item => {
        const key = item.variantId || item.selectedDuration || item.productId;
        return item.productId !== itemKey && key !== itemKey;
      })
    );
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        const key = item.variantId || item.selectedDuration || item.productId;
        if (key === itemKey || item.productId === itemKey) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setAppliedDiscount(0);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const applyCouponCode = async (code: string) => {
    if (!code.trim()) return { success: false, message: 'Please enter a coupon code' };
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartSubtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedCoupon(data.coupon);
        setAppliedDiscount(data.discountAmount);
        showToast(data.message, 'success');
        return { success: true, message: data.message };
      } else {
        showToast(data.message || 'Invalid coupon code', 'error');
        return { success: false, message: data.message || 'Invalid coupon' };
      }
    } catch {
      showToast('Network error while validating coupon', 'error');
      return { success: false, message: 'Error checking coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setAppliedDiscount(0);
    showToast('Coupon removed.', 'info');
  };

  const cartTotal = Math.max(0, Number((cartSubtotal - appliedDiscount).toFixed(2)));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        login,
        logout,
        activeView,
        setActiveView,
        selectedProductSlug,
        openProductDetail,
        selectedCategorySlug,
        openCategory,
        selectedCMSPageSlug,
        openCMSPage,
        selectedBlogPostId,
        openBlogPost,
        lastCompletedOrder,
        setLastCompletedOrder,
        currency,
        setCurrency,
        formatPrice,
        userPoints,
        cart,
        addToCart,
        buyNow,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        appliedDiscount,
        applyCouponCode,
        removeCoupon,
        cartSubtotal,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        products,
        categories,
        orders,
        subscriptions,
        inventory,
        reviews,
        tickets,
        blogPosts,
        cmsPages,
        settings,
        notifications,
        refreshData,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        showToast,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
