import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductVariant } from '../types';
import {
  Star,
  Zap,
  Heart,
  Eye,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    buyNow,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
    formatPrice,
  } = useApp();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );

  const isFavorited = isWishlisted(product.id);
  
  // Calculate price dynamically from selected variant or product
  const currentPrice = selectedVariant
    ? (selectedVariant.salePrice !== undefined ? selectedVariant.salePrice : selectedVariant.price)
    : (product.salePrice !== undefined ? product.salePrice : product.price);

  const originalPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentPricePKR = selectedVariant?.pricePKR || product.pricePKR;
  const currentCostPKR = selectedVariant?.costPricePKR || product.costPricePKR;

  const isFree = currentPrice === 0;
  const discountPercent =
    originalPrice > 0 && currentPrice < originalPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800/60 group-hover:border-slate-700 transition-colors">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {isFree ? (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-emerald-500 text-slate-950 shadow-md font-mono">
              FREE TOOL
            </span>
          ) : product.profitMarginPercent ? (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-md font-mono flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 text-cyan-400" /> +{product.profitMarginPercent}% Margin
            </span>
          ) : discountPercent > 0 ? (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md font-mono">
              -{discountPercent}% OFF
            </span>
          ) : null}

          {product.variants && product.variants.length > 1 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-950/90 text-cyan-300 border border-blue-800/80 backdrop-blur-sm">
              {product.variants.length} Variants
            </span>
          )}

          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-950/90 text-amber-300 border border-amber-800/80 backdrop-blur-sm flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Best Seller
            </span>
          )}

          {product.isFlashDeal && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-rose-950/90 text-rose-300 border border-rose-800/80 backdrop-blur-sm flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 text-rose-400" /> Flash Deal
            </span>
          )}
        </div>

        {/* Action icons (Wishlist & Quick View) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
              isFavorited
                ? 'bg-rose-950/90 text-rose-400 border border-rose-800'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-1.5 rounded-lg bg-slate-950/80 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:bg-slate-800 backdrop-blur-md transition-colors"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom instant delivery chip */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-slate-950/90 backdrop-blur-md border border-slate-800/60 text-[10px] text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Zap className="w-3 h-3 text-cyan-400" /> Instant Key
          </span>
          <span className="text-slate-400 font-mono capitalize">{product.brand}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-cyan-400/90 text-[10px]">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center text-amber-400 gap-1 font-semibold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => openProductDetail(product.slug)}
            className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-1 line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Variant Selector Dropdown */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-2.5">
              <label className="text-[10px] font-bold text-cyan-400/90 uppercase tracking-wider block mb-1 flex items-center justify-between">
                <span>Select Option / Denomination:</span>
                <span className="text-slate-400 font-mono text-[9px]">{product.variants.length} Available</span>
              </label>
              <div className="relative">
                <select
                  value={selectedVariant?.id || ''}
                  onChange={e => {
                    const found = product.variants?.find(v => v.id === e.target.value);
                    if (found) setSelectedVariant(found);
                  }}
                  className="w-full bg-slate-950 border border-slate-700/90 hover:border-cyan-500/70 text-slate-100 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium truncate transition-colors appearance-none pr-7 cursor-pointer"
                >
                  {product.variants.map(v => (
                    <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                      {v.name} — ${v.salePrice !== undefined ? v.salePrice.toFixed(2) : v.price.toFixed(2)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Price & Add / Buy buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-white font-mono">
                {currentPricePKR ? `₨ ${currentPricePKR.toLocaleString()}` : formatPrice(currentPrice)}
              </span>
              {!isFree && originalPrice > currentPrice && !currentPricePKR && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              {currentCostPKR ? (
                <span className="text-cyan-400 font-medium">Cost: ₨ {currentCostPKR.toLocaleString()} (+10%)</span>
              ) : isFree ? (
                'Open Source / Instant'
              ) : (selectedVariant ? selectedVariant.stock : product.stock) > 0 ? (
                `${selectedVariant ? selectedVariant.stock : product.stock} in vault`
              ) : (
                'Pre-order'
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isFree ? (
              <button
                onClick={() => openProductDetail(product.slug)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1"
              >
                <span>Get / Use</span>
              </button>
            ) : (
              <>
                <button
                  id={`add-to-cart-${product.sku}`}
                  onClick={() => addToCart(product, 1, undefined, selectedVariant)}
                  className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline text-[11px]">Add</span>
                </button>
                <button
                  id={`buy-now-${product.sku}`}
                  onClick={() => buyNow(product, undefined, selectedVariant)}
                  className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1 group/btn"
                  title="Instant Buy"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-300 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[11px]">Buy</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
