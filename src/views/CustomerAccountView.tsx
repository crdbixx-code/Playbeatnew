import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShoppingBag,
  Zap,
  Clock,
  Heart,
  HelpCircle,
  Lock,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const CustomerAccountView: React.FC = () => {
  const {
    currentUser,
    orders,
    subscriptions,
    wishlist,
    tickets,
    setActiveView,
    openProductDetail,
    showToast,
    refreshData,
    switchRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'vault' | 'orders' | 'subscriptions' | 'wishlist' | 'tickets' | 'security'>('vault');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [unmaskedKeys, setUnmaskedKeys] = useState<Record<string, boolean>>({});

  // Ticket creation inside portal
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'general' | 'license_activation' | 'payment'>('license_activation');
  const [ticketMessage, setTicketMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);

  const myOrders = orders; // Show user orders
  const mySubscriptions = subscriptions;

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    showToast('Copied license key to clipboard! ⚡', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const toggleMask = (keyId: string) => {
    setUnmaskedKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: currentUser?.id || 'guest',
          customerName: currentUser?.name || 'Customer',
          customerEmail: currentUser?.email || 'customer@example.com',
          subject: ticketSubject,
          category: ticketCategory,
          priority: 'medium',
          message: ticketMessage,
        }),
      });
      if (res.ok) {
        setIsNewTicketOpen(false);
        setTicketSubject('');
        setTicketMessage('');
        await refreshData();
        showToast('Support ticket created successfully! An agent will respond shortly.', 'success');
      }
    } catch {
      showToast('Error submitting ticket', 'error');
    }
  };

  const handleSendTicketReply = async (ticketId: string) => {
    if (!replyMessage.trim()) return;
    try {
      const res = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser?.id || 'cust-1',
          senderName: currentUser?.name || 'Customer',
          senderRole: 'customer',
          message: replyMessage,
        }),
      });
      if (res.ok) {
        setReplyMessage('');
        await refreshData();
        showToast('Reply sent to support agent.', 'success');
      }
    } catch {
      showToast('Failed to send reply', 'error');
    }
  };

  const handleRenewSubscription = async (subId: string) => {
    try {
      const res = await fetch(`/api/subscriptions/${subId}/renew`, { method: 'PUT' });
      if (res.ok) {
        await refreshData();
        showToast('Subscription extended for 1 year! ⚡', 'success');
      }
    } catch {
      showToast('Failed to renew subscription', 'error');
    }
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Customer Profile Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 font-black text-2xl">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{currentUser?.name || 'Customer Account'}</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                {currentUser?.role?.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{currentUser?.email}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span>
                Store Credit: <strong className="text-cyan-400 font-mono">${currentUser?.walletBalance?.toFixed(2) || '0.00'}</strong>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Status: Active & Verified</span>
            </div>
          </div>
        </div>

        {/* Quick Role Switcher for Demo */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Switch Persona:</div>
            <div className="flex gap-1.5 mt-1">
              <button
                onClick={() => switchRole('customer')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  currentUser?.role === 'customer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => switchRole('super_admin')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  currentUser?.role === 'super_admin'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto text-xs font-semibold pb-1">
        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 py-3 px-4 rounded-t-xl transition-colors shrink-0 ${
            activeTab === 'vault'
              ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          Digital Keys Vault
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 py-3 px-4 rounded-t-xl transition-colors shrink-0 ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Orders ({myOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`flex items-center gap-2 py-3 px-4 rounded-t-xl transition-colors shrink-0 ${
            activeTab === 'subscriptions'
              ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Subscriptions ({mySubscriptions.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 py-3 px-4 rounded-t-xl transition-colors shrink-0 ${
            activeTab === 'wishlist'
              ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wishlist ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 py-3 px-4 rounded-t-xl transition-colors shrink-0 ${
            activeTab === 'tickets'
              ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Support Tickets ({tickets.length})
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 py-3 px-4 rounded-t-xl transition-colors shrink-0 ${
            activeTab === 'security'
              ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          Security & 2FA
        </button>
      </div>

      {/* TAB 1: DIGITAL KEYS VAULT */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Encrypted Digital Vault</h2>
              <p className="text-xs text-slate-400">All purchased software licenses, Steam keys, and invitations.</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono">● AES-256 Secured</span>
          </div>

          <div className="space-y-4">
            {myOrders.flatMap(o => o.digitalDeliveries || []).length === 0 ? (
              <div className="p-10 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-3">
                <Zap className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No keys in vault yet</h4>
                <p className="text-xs text-slate-400">
                  When you purchase keys or software, they will be archived here permanently.
                </p>
                <button
                  onClick={() => setActiveView('shop')}
                  className="px-4 py-2 bg-blue-600 rounded-xl text-xs font-semibold text-white"
                >
                  Browse Storefront
                </button>
              </div>
            ) : (
              myOrders.flatMap(o => o.digitalDeliveries || []).map((deliv, idx) => (
                <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        {deliv.type.replace('_', ' ')}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{deliv.productName}</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Acquired: {new Date(deliv.deliveredAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Key Box */}
                  {deliv.licenseKey && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Genuine Product Key:</span>
                        <button
                          onClick={() => toggleMask(deliv.id || String(idx))}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
                        >
                          {unmaskedKeys[deliv.id || String(idx)] ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Mask
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" /> Reveal
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                        <div className="font-mono text-sm font-bold text-cyan-300 tracking-wider truncate">
                          {unmaskedKeys[deliv.id || String(idx)]
                            ? deliv.licenseKey
                            : deliv.licenseKey.replace(/[a-zA-Z0-9]/g, (m, offset) =>
                                offset > 4 && offset < deliv.licenseKey!.length - 4 ? '•' : m
                              )}
                        </div>
                        <button
                          onClick={() => handleCopy(deliv.licenseKey!)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
                        >
                          {copiedKey === deliv.licenseKey ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Copied
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

                  <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <strong>Instructions:</strong> {deliv.instructions}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Order History & Invoices</h2>
          <div className="space-y-3">
            {myOrders.map(ord => (
              <div key={ord.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="font-mono font-bold text-cyan-400 text-sm">{ord.orderNumber}</span>
                    <span className="text-xs text-slate-400 ml-3">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {ord.paymentStatus}
                    </span>
                    <span className="text-xs font-bold font-mono text-white">
                      ${ord.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.productName} (x{item.quantity})</span>
                      <span className="font-mono text-slate-400">${item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">Invoice: {ord.invoiceNumber}</span>
                  <button
                    onClick={() => setActiveView('order-success')}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    View Invoice & Keys <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIPTIONS */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Active Digital Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mySubscriptions.map(sub => (
              <div key={sub.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {sub.planDuration}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{sub.productName}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {sub.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Started:</span>
                    <span className="text-slate-200">{new Date(sub.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Renews / Expires:</span>
                    <span className="text-cyan-300 font-semibold">{new Date(sub.expiresDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-Renew:</span>
                    <span className="text-emerald-400 font-medium">{sub.autoRenew ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-mono font-bold text-white text-sm">${sub.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleRenewSubscription(sub.id)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Extend +1 Year
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Saved Wishlist ({wishlist.length})</h2>
          {wishlist.length === 0 ? (
            <div className="p-10 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-3">
              <Heart className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">No items saved yet</h4>
              <p className="text-xs text-slate-400">Click the heart icon on any game key or software to save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SUPPORT TICKETS */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Support & Activation Tickets</h2>
              <p className="text-xs text-slate-400">Direct thread with technical specialists.</p>
            </div>
            <button
              onClick={() => setIsNewTicketOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Open New Ticket
            </button>
          </div>

          {/* New Ticket Modal */}
          {isNewTicketOpen && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white">Submit New Support Query</h3>
              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={e => setTicketSubject(e.target.value)}
                      placeholder="e.g. Need Steam key regional clarification"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                    <select
                      value={ticketCategory}
                      onChange={e => setTicketCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="license_activation">License Activation Assistance</option>
                      <option value="payment">Payment & Billing Query</option>
                      <option value="general">General Marketplace Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details</label>
                  <textarea
                    required
                    rows={4}
                    value={ticketMessage}
                    onChange={e => setTicketMessage(e.target.value)}
                    placeholder="Describe your issue with as much detail as possible..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewTicketOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Ticket Threads Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Ticket List (4 cols) */}
            <div className="lg:col-span-4 space-y-2">
              {tickets.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedTicket?.id === t.id
                      ? 'bg-slate-900 border-cyan-400 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-cyan-400">{t.ticketNumber}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">{t.subject}</h4>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                    {new Date(t.updatedAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Conversation Messages (8 cols) */}
            <div className="lg:col-span-8 p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between min-h-[350px]">
              {selectedTicket ? (
                <>
                  <div className="space-y-3 pb-3 border-b border-slate-800">
                    <div className="flex justify-between items-center text-xs">
                      <h3 className="font-bold text-white text-sm">{selectedTicket.subject}</h3>
                      <span className="text-slate-400 font-mono">{selectedTicket.ticketNumber}</span>
                    </div>
                    <div className="text-xs text-slate-400">Category: {selectedTicket.category}</div>
                  </div>

                  {/* Messages Bubble List */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {selectedTicket.messages.map(m => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-xl text-xs space-y-1 max-w-lg ${
                          m.senderRole === 'support'
                            ? 'bg-blue-950/60 border border-blue-800/60 ml-auto text-cyan-200'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                          <span>{m.senderName} ({m.senderRole})</span>
                          <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="leading-relaxed">{m.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="pt-3 border-t border-slate-800 flex gap-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      placeholder="Type your response to the support agent..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => handleSendTicketReply(selectedTicket.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">Select a ticket to view messages</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SECURITY & 2FA */}
      {activeTab === 'security' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 max-w-2xl">
          <h2 className="text-base font-bold text-white">Security & Access Management</h2>

          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Protect license keys with authenticator app OTP</p>
            </div>
            <button
              onClick={() => showToast('2FA settings updated', 'info')}
              className="px-3 py-1.5 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-800"
            >
              Enabled ✓
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Change Password</h4>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <input
              type="password"
              placeholder="New Secure Password"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <button
              onClick={() => showToast('Password changed successfully.', 'success')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
