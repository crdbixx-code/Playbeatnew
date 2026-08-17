import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductVariant } from '../types';
import {
  X,
  Star,
  Zap,
  Check,
  ShieldCheck,
  Heart,
  ExternalLink,
  Plus,
  Minus,
  Laptop,
  ChevronDown,
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    buyNow,
    toggleWishlist,
    isWishlisted,
    openProductDetail,
    setActiveView,
    formatPrice,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);

  useEffect(() => {
    if (quickViewProduct?.variants && quickViewProduct.variants.length > 0) {
      setSelectedVariant(quickViewProduct.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
    setQuantity(1);
    setSelectedImageIdx(0);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  // Dynamic pricing
  const currentPrice = selectedVariant
    ? (selectedVariant.salePrice !== undefined ? selectedVariant.salePrice : selectedVariant.price)
    : (quickViewProduct.salePrice !== undefined ? quickViewProduct.salePrice : quickViewProduct.price);

  const originalPrice = selectedVariant ? selectedVariant.price : quickViewProduct.price;
  const currentPricePKR = selectedVariant?.pricePKR || quickViewProduct.pricePKR;
  const currentCostPKR = selectedVariant?.costPricePKR || quickViewProduct.costPricePKR;
  const currentStock = selectedVariant ? selectedVariant.stock : quickViewProduct.stock;
  const currentSku = selectedVariant ? selectedVariant.sku : quickViewProduct.sku;

  const handleBuyNow = () => {
    buyNow(quickViewProduct, undefined, selectedVariant);
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, undefined, selectedVariant);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images preview */}
          <div className="p-6 bg-slate-950/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50">
              <img
                src={quickViewProduct.images[selectedImageIdx] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-950/90 text-cyan-400 border border-cyan-800/80">
                  {quickViewProduct.category}
                </span>
                {quickViewProduct.isFlashDeal && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-orange-950/90 text-orange-400 border border-orange-800/80">
                    Flash Deal
                  </span>
                )}
              </div>
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIdx === idx ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> Genuine Lifetime Digital License
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <Zap className="w-4 h-4" /> 0.8s Automated Key Vault Dispatch
              </div>
            </div>
          </div>

          {/* Details & Action */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Brand: <strong className="text-slate-200">{quickViewProduct.brand}</strong></span>
                <span className="font-mono">SKU: {currentSku}</span>
              </div>

              <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400 text-xs gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{quickViewProduct.rating}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  ({quickViewProduct.reviewsCount} reviews)
                </span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs text-emerald-400 font-medium">
                  {currentStock > 0 ? `${currentStock} In Stock` : 'Out of stock'}
                </span>
              </div>

              {/* Variant Selector Dropdown */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                <div className="mt-3">
                  <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    Select Option / Denomination:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVariant?.id || ''}
                      onChange={e => {
                        const found = quickViewProduct.variants?.find(v => v.id === e.target.value);
                        if (found) setSelectedVariant(found);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 hover:border-cyan-500 text-white text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium appearance-none pr-7 cursor-pointer"
                    >
                      {quickViewProduct.variants.map(v => (
                        <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                          {v.name} — ${v.salePrice !== undefined ? v.salePrice.toFixed(2) : v.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">
                  {currentPricePKR
                    ? `₨ ${currentPricePKR.toLocaleString()}`
                    : formatPrice(currentPrice)}
                </span>
                {currentCostPKR ? (
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-mono">
                    Cost: ₨ {currentCostPKR.toLocaleString()} (+10% Profit)
                  </span>
                ) : originalPrice > currentPrice ? (
                  <>
                    <span className="text-sm text-slate-500 line-through font-mono">
                      {formatPrice(originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 font-mono">
                      Save {formatPrice(originalPrice - currentPrice)}
                    </span>
                  </>
                ) : null}
              </div>

              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Select Quantity:</span>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white font-mono px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Add to Cart
                </button>
                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuyNow}
                  className="py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  1-Click Buy Now
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted(quickViewProduct.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span>{isWishlisted(quickViewProduct.id) ? 'In Wishlist' : 'Save to Wishlist'}</span>
                </button>

                <button
                  onClick={() => {
                    openProductDetail(quickViewProduct.slug);
                    setQuickViewProduct(null);
                  }}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Full Details & Specs <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
