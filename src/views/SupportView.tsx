import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
  FileQuestion,
  ChevronDown,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const { showToast, setActiveView, refreshData, currentUser } = useApp();

  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'general' | 'license_activation' | 'payment'>('license_activation');
  const [ticketMessage, setTicketMessage] = useState('');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage || !customerEmail) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: currentUser?.id || 'guest',
          customerName: customerName || 'Customer',
          customerEmail,
          subject: ticketSubject,
          category: ticketCategory,
          priority: 'medium',
          message: ticketMessage,
        }),
      });
      if (res.ok) {
        setTicketSubject('');
        setTicketMessage('');
        await refreshData();
        showToast('Ticket submitted successfully! A support specialist will respond within minutes.', 'success');
        setActiveView('account');
      } else {
        showToast('Failed to submit ticket', 'error');
      }
    } catch {
      showToast('Error submitting support ticket', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportFaqs = [
    {
      q: 'How long does key dispatch take after checkout?',
      a: 'Automated delivery executes in under 0.8 seconds. As soon as payment confirmation arrives via Stripe, JazzCash, Easypaisa, or USDT, your license appears on your screen and in your Account Vault.',
    },
    {
      q: 'What should I do if my Microsoft or Windows key says "Already in Use"?',
      a: 'This rarely happens due to vendor caching, but don’t worry: we provide a 100% replacement warranty. Submit a ticket with a screenshot of the error, and our system issues a fresh retail license key immediately.',
    },
    {
      q: 'Can I transfer my license to a new PC later?',
      a: 'Yes, all our Windows, Office, and software licenses are genuine retail keys that bind to your Microsoft Account or hardware ID, allowing reactivation on replacement machines.',
    },
    {
      q: 'Do you offer refunds if I change my mind?',
      a: 'We offer full refunds within 7 days on unredeemed licenses or if any technical activation issue cannot be resolved by our support team.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Support Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-slate-800 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-800">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>24/7 Human Helpdesk & Technical Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">How Can We Assist You Today?</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Need activation instructions, payment verification, or bulk license inquiries? We are here to help.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <Mail className="w-6 h-6 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Email Assistance</h3>
          <p className="text-xs text-slate-400">support@playbeat.digital</p>
          <span className="text-[10px] text-emerald-400 font-mono block">Avg response: &lt; 15 mins</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <Clock className="w-6 h-6 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Business Hours</h3>
          <p className="text-xs text-slate-400">Monday - Sunday: 24/7/365</p>
          <span className="text-[10px] text-emerald-400 font-mono block">Global Key Server Operations</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <ShieldCheck className="w-6 h-6 text-purple-400" />
          <h3 className="text-sm font-bold text-white">7-Day Guarantee</h3>
          <p className="text-xs text-slate-400">100% Genuine Retail Guarantee</p>
          <span className="text-[10px] text-purple-400 font-mono block">Zero-Risk Replacement</span>
        </div>
      </div>

      {/* Ticket Submission Form & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Support Ticket Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" /> Open a Priority Ticket
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                <select
                  value={ticketCategory}
                  onChange={e => setTicketCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="license_activation">License Activation Help</option>
                  <option value="payment">Payment & Billing Issue</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of issue"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details</label>
              <textarea
                required
                rows={5}
                value={ticketMessage}
                onChange={e => setTicketMessage(e.target.value)}
                placeholder="Include order number, product name, or error code..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
            </button>
          </form>
        </div>

        {/* FAQ Accordion (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-cyan-400" /> Quick Answers
          </h2>

          <div className="space-y-2">
            {supportFaqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      expandedFaq === idx ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
