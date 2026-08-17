import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Zap,
  Printer,
  Download,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  FileText,
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastCompletedOrder, orders, setActiveView, showToast } = useApp();
  const order = lastCompletedOrder || orders[0];

  const [copiedKeyIdx, setCopiedKeyIdx] = useState<number | null>(null);
  const [unmaskedKeys, setUnmaskedKeys] = useState<Record<number, boolean>>({});

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-xl font-bold">No Recent Order Found</h2>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-xl text-xs font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleCopyKey = (key: string, idx: number) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyIdx(idx);
    showToast('License Key copied to clipboard! ⚡', 'success');
    setTimeout(() => setCopiedKeyIdx(null), 2500);
  };

  const toggleMaskKey = (idx: number) => {
    setUnmaskedKeys(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Celebration Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/60 text-center space-y-3 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-600/60 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/60">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-800 inline-block">
          Payment Confirmed • Keys Dispatched
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-white">Thank You for Your Order!</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Order <strong className="text-white font-mono">{order.orderNumber}</strong> has been processed successfully. Your genuine licenses are unlocked below.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-slate-400">
            Invoice: <strong className="text-white font-mono">{order.invoiceNumber}</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">
            Total Paid: <strong className="text-cyan-400 font-mono">${order.total.toFixed(2)}</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium">Delivered to: {order.customerEmail}</span>
        </div>
      </div>

      {/* 1. DIGITAL KEYS & LICENSES VAULT */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Your Digital Keys Vault</h2>
          </div>
          <span className="text-xs text-emerald-400 font-mono">100% Genuine Retail Guarantee</span>
        </div>

        <div className="space-y-4">
          {order.digitalDeliveries && order.digitalDeliveries.length > 0 ? (
            order.digitalDeliveries.map((deliv, idx) => (
              <div
                key={deliv.id || idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {deliv.type.replace('_', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{deliv.productName}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Delivered at: {new Date(deliv.deliveredAt).toLocaleTimeString()}
                  </span>
                </div>

                {/* Key Reveal Box */}
                {deliv.licenseKey && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>License Activation Key:</span>
                      <button
                        onClick={() => toggleMaskKey(idx)}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-normal"
                      >
                        {unmaskedKeys[idx] ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Mask Key
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Reveal Full Key
                          </>
                        )}
                      </button>
                    </label>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="font-mono text-sm sm:text-base font-bold text-cyan-300 tracking-wider truncate">
                        {unmaskedKeys[idx]
                          ? deliv.licenseKey
                          : deliv.licenseKey.replace(/[a-zA-Z0-9]/g, (m, offset) =>
                              offset > 4 && offset < deliv.licenseKey!.length - 4 ? '•' : m
                            )}
                      </div>

                      <button
                        onClick={() => handleCopyKey(deliv.licenseKey!, idx)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        {copiedKeyIdx === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Key
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Activation Instructions */}
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs space-y-1">
                  <h4 className="font-bold text-slate-200">Activation Guide:</h4>
                  <p className="text-slate-400 leading-relaxed">{deliv.instructions}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 text-center">
              Your license keys have been safely recorded in your customer dashboard.
            </div>
          )}
        </div>
      </div>

      {/* 2. ORDER SUMMARY & INVOICE DETAILS */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Itemized Invoice Details</h3>
          </div>
          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print Invoice
          </button>
        </div>

        <div className="space-y-2 divide-y divide-slate-800/60 text-xs">
          {order.items.map((item, idx) => (
            <div key={idx} className="pt-2 flex justify-between items-center">
              <div>
                <span className="font-semibold text-white">{item.productName}</span>
                <span className="text-slate-500 ml-2 font-mono">x{item.quantity}</span>
              </div>
              <span className="font-mono font-bold text-slate-200">${item.totalPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-mono text-slate-200">${order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Promo Discount ({order.couponCode || 'Voucher'}):</span>
              <span className="font-mono">-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
            <span>Total Billed:</span>
            <span className="font-mono text-cyan-400">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div>
          <h4 className="text-sm font-bold text-white">Need activation help or have questions?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Our 24/7 human technical desk is available in your account support center.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('account')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            My Account & Vault
          </button>
          <button
            onClick={() => setActiveView('support')}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Open Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
