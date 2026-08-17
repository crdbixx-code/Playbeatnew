import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Zap,
  Lock,
  CreditCard,
  Phone,
  Coins,
  Building,
  Tag,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    appliedCoupon,
    appliedDiscount,
    currentUser,
    clearCart,
    setLastCompletedOrder,
    setActiveView,
    showToast,
    refreshData,
  } = useApp();

  const [customerName, setCustomerName] = useState(currentUser?.name || 'Alex Rivera');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'alex.gamer@example.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 234-5678');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'jazzcash' | 'easypaisa' | 'crypto' | 'bank_transfer'>('stripe');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated gateway specific inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVC, setCardCVC] = useState('888');
  const [mobileWalletNumber, setMobileWalletNumber] = useState('0300 1234567');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add digital keys or software licenses to proceed to checkout.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-xl"
        >
          Explore Marketplace
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) {
      showToast('Please enter your full name and delivery email', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        customerId: currentUser?.id || 'guest',
        customerName,
        customerEmail,
        customerPhone,
        items: cart.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          selectedDuration: i.selectedDuration,
          variantId: i.variantId,
          variantName: i.variantName,
        })),
        couponCode: appliedCoupon?.code,
        paymentMethod,
        customerNotes,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setLastCompletedOrder(data.order);
        clearCart();
        await refreshData();
        showToast('Payment verified! Digital keys delivered to your vault.', 'success');
        setActiveView('order-success');
      } else {
        showToast(data.error || 'Checkout failed', 'error');
      }
    } catch {
      showToast('Network error processing checkout. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          onClick={() => setActiveView('shop')}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Catalog
        </button>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Customer & Payment Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Customer Information */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-950 text-cyan-400 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Customer & Key Delivery Email
              </h3>
              <span className="text-[11px] text-cyan-400 font-medium">Instant Dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="checkout-name"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Email</label>
                <input
                  type="email"
                  id="checkout-email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Optional)</label>
              <input
                type="text"
                id="checkout-phone"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* 2. Payment Gateway Selection */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-950 text-cyan-400 text-xs flex items-center justify-center font-bold">
                2
              </span>
              Choose Payment Method
            </h3>

            {/* Gateway Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'stripe'
                    ? 'bg-blue-950/60 border-cyan-400 text-white shadow-md shadow-blue-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-5 h-5 text-cyan-400 mb-1.5" />
                <div className="text-xs font-bold">Stripe / Card</div>
                <div className="text-[10px] text-slate-500">Visa, Mastercard</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Phone className="w-5 h-5 text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold">JazzCash</div>
                <div className="text-[10px] text-slate-500">Mobile Wallet</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('easypaisa')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'easypaisa'
                    ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Phone className="w-5 h-5 text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold">Easypaisa</div>
                <div className="text-[10px] text-slate-500">Instant Pin Pay</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'crypto'
                    ? 'bg-amber-950/60 border-amber-400 text-white shadow-md shadow-amber-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Coins className="w-5 h-5 text-amber-400 mb-1.5" />
                <div className="text-xs font-bold">Crypto USDT</div>
                <div className="text-[10px] text-slate-500">TRC20 / ERC20</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-purple-950/60 border-purple-400 text-white shadow-md shadow-purple-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building className="w-5 h-5 text-purple-400 mb-1.5" />
                <div className="text-xs font-bold">Bank Wire</div>
                <div className="text-[10px] text-slate-500">Direct IBAN</div>
              </button>
            </div>

            {/* Gateway Specific Input Simulation */}
            {paymentMethod === 'stripe' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Card Details</span>
                  <span className="text-emerald-400 font-mono text-[10px]">Test Mode Enabled</span>
                </div>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                  <input
                    type="text"
                    value={cardCVC}
                    onChange={e => setCardCVC(e.target.value)}
                    placeholder="CVC"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>
            )}

            {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="capitalize">{paymentMethod} Mobile Account</span>
                  <span className="text-emerald-400 text-[10px]">Instant Prompt</span>
                </div>
                <input
                  type="text"
                  value={mobileWalletNumber}
                  onChange={e => setMobileWalletNumber(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  You will receive a USSD MPIN prompt on your mobile phone to approve the transaction.
                </p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-400">USDT (TRC20) Merchant Address:</span>
                <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-[11px] text-slate-300 break-all select-all border border-slate-800">
                  TPL9BeatDigita1Vau1tTRC20Secure99X4K
                </div>
                <p className="text-[11px] text-slate-400">
                  Automated blockchain listener will confirm transaction within 1 block.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Review & Instant Dispatch Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Order Items ({cart.length})</h3>

            {/* Cart items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => {
                const itemKey = item.variantId || item.selectedDuration || item.productId;
                return (
                  <div
                    key={`${item.productId}-${itemKey}`}
                    className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-white truncate">{item.product.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span className="text-cyan-300 font-medium truncate max-w-[140px]">
                            {item.variantName || (item.selectedDuration ? item.selectedDuration.replace('_', ' ') : 'Instant License')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-white shrink-0 ml-2">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Financial Summary */}
            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-slate-200">${cartSubtotal.toFixed(2)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span className="font-mono">-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-mono text-slate-400">$0.00</span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="font-mono text-cyan-400">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              id="checkout-complete-order-btn"
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all group disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Verifying Payment & Dispatching Keys...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                  <span>Pay ${cartTotal.toFixed(2)} & Reveal Keys ⚡</span>
                </>
              )}
            </button>

            <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/40 text-[11px] text-cyan-300/90 leading-relaxed flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Your genuine license key will be shown instantly on screen and archived in your PlayBeat Account Digital Vault.
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
