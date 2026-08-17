import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Zap,
  ShieldCheck,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  Lock,
  Download,
  Laptop,
  HelpCircle,
  MessageSquare,
  Share2,
  ChevronRight,
  Sparkles,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { Product, Review, ProductVariant } from '../types';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductSlug,
    products,
    addToCart,
    buyNow,
    toggleWishlist,
    isWishlisted,
    setActiveView,
    openCategory,
    currentUser,
    showToast,
    formatPrice,
  } = useApp();

  const product = products.find(p => p.slug === selectedProductSlug) || products[0];

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState<string>(
    product?.subscriptionDuration || '1_year'
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'activation' | 'specs' | 'reviews'>('overview');

  // Customer Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant(undefined);
      }
      fetch(`/api/reviews?productId=${product.id}`)
        .then(res => res.json())
        .then(data => setReviewsList(data.reviews || []))
        .catch(() => {});
    }
  }, [product, selectedProductSlug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-white">
        <h2 className="text-xl font-bold">Product not found</h2>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-xl text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isWishlisted(product.id);

  // Dynamic values derived from selected variant or product
  const currentPrice = selectedVariant
    ? (selectedVariant.salePrice !== undefined ? selectedVariant.salePrice : selectedVariant.price)
    : (product.salePrice !== undefined ? product.salePrice : product.price);

  const originalPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentPricePKR = selectedVariant?.pricePKR || product.pricePKR;
  const currentCostPKR = selectedVariant?.costPricePKR || product.costPricePKR;
  const currentProfitPKR = selectedVariant?.profitPKR || product.profitMarginPKR || (currentCostPKR ? Math.round(currentCostPKR * 0.1) : undefined);
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const currentSku = selectedVariant ? selectedVariant.sku : product.sku;

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedDuration, selectedVariant);
  };

  const handleBuyNow = () => {
    buyNow(product, selectedDuration, selectedVariant);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast('Please provide both a title and review comment.', 'error');
      return;
    }
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerId: currentUser?.id || 'guest',
          customerName: currentUser?.name || 'Verified Buyer',
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setReviewsList([data.review, ...reviewsList]);
        setReviewTitle('');
        setReviewComment('');
        showToast('Review submitted successfully! Thank you.', 'success');
      }
    } catch {
      showToast('Failed to submit review', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => openCategory(product.category)} className="hover:text-white capitalize transition-colors">
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <img
              src={product.images[selectedImgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-lg bg-cyan-950/90 text-cyan-400 border border-cyan-800/80 backdrop-blur-md">
                {product.category}
              </span>
              {product.isFlashDeal && (
                <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-lg bg-rose-950/90 text-rose-300 border border-rose-800/80 backdrop-blur-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-400" /> Flash Deal
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImgIdx === idx ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Security & Warranty Trust Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Retail Key</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>0.8s Instant Key Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400 shrink-0" />
              <span>256-Bit Encrypted Vault</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>7-Day Money-Back Warranty</span>
            </div>
          </div>
        </div>

        {/* Right Product Details & Action Panel (7 cols) */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-cyan-400">
                Brand: <strong className="text-white">{product.brand}</strong>
              </span>
              <span className="font-mono text-slate-400">SKU: {currentSku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center text-amber-400 gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/40 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} customer reviews)</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                {currentStock > 0 ? `${currentStock} Units In Stock` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono">
                      {currentPricePKR ? `₨ ${currentPricePKR.toLocaleString()}` : formatPrice(currentPrice)}
                    </span>
                    {originalPrice > currentPrice && !currentPricePKR && (
                      <span className="text-sm text-slate-500 line-through font-mono">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                    {currentCostPKR && (
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
                        10% Profit Margin Included
                      </span>
                    )}
                  </div>
                  {currentCostPKR ? (
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Cost Price</span>
                        <span className="text-slate-300 font-bold">₨ {currentCostPKR.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">10% Profit</span>
                        <span className="text-cyan-400 font-bold">+₨ {currentProfitPKR?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Selling Price</span>
                        <span className="text-emerald-400 font-bold">₨ {currentPricePKR?.toLocaleString()}</span>
                      </div>
                    </div>
                  ) : originalPrice > currentPrice ? (
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">
                      You save {formatPrice(originalPrice - currentPrice)} (Instant Discount)
                    </span>
                  ) : null}
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Tax included</span>
                  <div className="text-cyan-400 font-medium">
                    {product.category === 'projectors' ? 'Local Express Dispatch' : 'Free Automated Delivery'}
                  </div>
                </div>
              </div>

              {product.sourceUrl && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Verified Sourcing Reference:</span>
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 hover:underline"
                  >
                    <span>zerobyte.store product page</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Product Variants Selector (Dropdown + Grid) */}
            {product.variants && product.variants.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Select Model / Denomination / Region:
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    {product.variants.length} Options
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={selectedVariant?.id || ''}
                    onChange={e => {
                      const found = product.variants?.find(v => v.id === e.target.value);
                      if (found) setSelectedVariant(found);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 hover:border-cyan-500 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium appearance-none pr-10 cursor-pointer shadow-inner"
                  >
                    {product.variants.map(v => (
                      <option key={v.id} value={v.id} className="bg-slate-900 text-white py-1">
                        {v.name} — ${v.salePrice !== undefined ? v.salePrice.toFixed(2) : v.price.toFixed(2)} ({v.stock > 0 ? `${v.stock} in stock` : 'Out of stock'})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Quick select tags for variants (up to 8 visible) */}
                {product.variants.length <= 12 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedVariant?.id === v.id
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-900/40 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* License Duration Selector (if subscription without variants) */}
            {product.productType === 'subscription' && (!product.variants || product.variants.length === 0) && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select License Duration:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '1 Month', val: '1_month' },
                    { label: '6 Months', val: '6_months' },
                    { label: '1 Year (Best Value)', val: '1_year' },
                  ].map(dur => (
                    <button
                      key={dur.val}
                      onClick={() => setSelectedDuration(dur.val)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                        selectedDuration === dur.val
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/50'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions & Quantity */}
          <div className="space-y-3 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white font-mono px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                id="product-wishlist-toggle"
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors flex items-center gap-2 text-xs font-semibold ${
                  isFavorited
                    ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFavorited ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                id="product-add-cart-btn"
                onClick={handleAddToCart}
                className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                Add to Cart
              </button>

              <button
                id="product-buy-now-btn"
                onClick={handleBuyNow}
                className="py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                1-Click Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Overview, Activation Guide, System Specs, Reviews */}
      <div className="space-y-6 pt-8 border-t border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 transition-colors shrink-0 ${
              activeTab === 'overview'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('activation')}
            className={`pb-3 px-3 transition-colors shrink-0 ${
              activeTab === 'activation'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Activation Guide & Instructions
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-3 transition-colors shrink-0 ${
              activeTab === 'specs'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Requirements
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-3 transition-colors shrink-0 ${
              activeTab === 'reviews'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Customer Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
            <h3 className="text-base font-bold text-white">Product Description & Highlights</h3>
            <p>{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Delivery: Instant Key via Digital Vault</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Region: 100% Global License</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Support: 24/7 Human Helpdesk</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Warranty: 7 Days Full Replacement</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Activation Guide */}
        {activeTab === 'activation' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">How to Redeem & Activate Your Key</h3>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed">
              {product.activationGuide ||
                '1. Complete checkout to retrieve your license key from your PlayBeat Digital Vault. 2. Follow standard vendor redemption prompts.'}
            </div>
            <p className="text-xs text-slate-400">
              Need assistance? Our support staff is ready to guide you step-by-step in your account ticket center.
            </p>
          </div>
        )}

        {/* Tab 3: System Requirements */}
        {activeTab === 'specs' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">System & Platform Specifications</h3>
            {product.systemRequirements && product.systemRequirements.length > 0 ? (
              <ul className="space-y-2 text-xs text-slate-300">
                {product.systemRequirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Compatible with modern Web Browsers, Windows 10/11, macOS, and Linux platforms.
              </p>
            )}
          </div>
        )}

        {/* Tab 4: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Reviews List */}
            <div className="space-y-3">
              {reviewsList.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
                  No customer reviews yet. Be the first to review this digital product!
                </div>
              ) : (
                reviewsList.map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 text-xs font-bold">
                          {rev.customerName.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white">{rev.customerName}</span>
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800">
                            Verified Purchase
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs gap-0.5">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1">{rev.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{rev.comment}</p>
                    {rev.adminReply && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-cyan-900/50 text-[11px] text-cyan-300">
                        <strong>PlayBeat Response:</strong> {rev.adminReply}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Write a Review Form */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Write a Verified Customer Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReviewRating(r)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            reviewRating >= r ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  id="review-title-input"
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  placeholder="Review headline (e.g. Activated instantly with zero issues)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />

                <textarea
                  id="review-comment-input"
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  rows={3}
                  placeholder="Share details of your activation experience..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />

                <button
                  type="submit"
                  id="submit-review-btn"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Submit Verified Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white">Frequently Bought Together & Related</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
