import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Tag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotal,
    appliedCoupon,
    appliedDiscount,
    applyCouponCode,
    removeCoupon,
    setActiveView,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    setIsApplying(true);
    await applyCouponCode(couponInput);
    setIsApplying(false);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-cyan-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Digital Cart</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {cart.length} unique {cart.length === 1 ? 'product' : 'products'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body (Items) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Browse our digital marketplace for verified Steam keys, software licenses, Canva Pro, and AI subscriptions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20"
                >
                  Explore Deals & Software
                </button>
              </div>
            ) : (
              cart.map(item => {
                const itemKey = item.variantId || item.selectedDuration || item.productId;
                return (
                  <div
                    key={`${item.productId}-${itemKey}`}
                    className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex gap-3 relative group"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700/50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white line-clamp-1">{item.product.name}</h4>
                      
                      {/* Variant or Duration Tag */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        {item.variantName ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 truncate max-w-[180px]">
                            {item.variantName}
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-950/80 text-cyan-300 border border-blue-800/40">
                            {item.selectedDuration ? item.selectedDuration.replace('_', ' ') : 'Instant License'}
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5" /> Instant
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/60 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(itemKey, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white font-mono px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(itemKey, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-white font-mono">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            ${item.unitPrice.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemKey)}
                      className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer (Coupons, Totals, Checkout CTA) */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-emerald-300">{appliedCoupon.code}</span>
                      <span className="text-[11px] text-emerald-400/80 ml-1">
                        (-${appliedDiscount.toFixed(2)})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    id="drawer-coupon-input"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code (e.g. PLAYBEAT10)"
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isApplying || !couponInput}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors shrink-0"
                  >
                    {isApplying ? 'Checking...' : 'Apply'}
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200">${cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-mono">-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery & Tax</span>
                  <span className="font-mono text-emerald-400">Free Instant Dispatch</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="font-mono text-cyan-400 text-base">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="drawer-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all group"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted Automated Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
