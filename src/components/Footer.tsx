import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  ShieldCheck,
  Headphones,
  Mail,
  Phone,
  Send,
  Tv,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, openCMSPage, openCategory, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed! Check your inbox for your 10% coupon code: PLAYBEAT10', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#041126] border-t border-[#C8CDD5]/30 text-[#C8CDD5] text-sm relative">
      {/* Value Proposition Highlights Banner */}
      <div className="border-b border-[#C8CDD5]/20 bg-[#071A3D]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#041126] border border-[#C8CDD5]/40 hover:border-[#F5C542] transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#F5C542]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,197,66,0.2)]">
                <Zap className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Instant Vault Delivery</h4>
                <p className="text-xs text-[#C8CDD5] mt-0.5">Automated key vault generation within 0.8s of checkout.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#041126] border border-[#C8CDD5]/40 hover:border-[#F5C542] transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#F5C542]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,197,66,0.2)]">
                <ShieldCheck className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">100% Genuine Licenses</h4>
                <p className="text-xs text-[#C8CDD5] mt-0.5">Direct verified publisher licenses with lifetime guarantee.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#041126] border border-[#C8CDD5]/40 hover:border-[#25D366] transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#25D366]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(37,211,102,0.2)]">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Direct WhatsApp</h4>
                <a
                  href="https://wa.me/923321029333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#25D366] hover:underline font-mono font-bold block mt-0.5"
                >
                  +923321029333
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#041126] border border-[#C8CDD5]/40 hover:border-[#F5C542] transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#F5C542]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,197,66,0.2)]">
                <Headphones className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">24/7 Human Helpdesk</h4>
                <p className="text-xs text-[#C8CDD5] mt-0.5">support@playbeat.digital</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Bio & Direct Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-white text-base">▲</span>
              <span className="text-[#F5C542] text-lg font-bold">●</span>
              <span className="text-lg font-black tracking-tight text-white uppercase">
                PLAYBEAT <span className="text-[#F5C542]">DIGITAL</span>
              </span>
              <span className="text-xs text-[#C8CDD5] font-mono">| playbeat.digital</span>
            </div>
            <p className="text-xs text-[#C8CDD5] leading-relaxed max-w-sm">
              The premier digital commerce platform. Verified PC gaming keys, genuine operating systems, productivity software, SaaS subscriptions, smart cinema projectors, and digital services with instant automated delivery.
            </p>

            {/* Direct Official Contact Info Section */}
            <div className="p-3.5 rounded-2xl bg-[#071A3D] border border-[#C8CDD5]/30 space-y-2 max-w-sm">
              <div className="text-[11px] uppercase font-bold text-white tracking-wider flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-[#F5C542]" /> Official Support & Contact
              </div>
              <div className="space-y-1.5 text-xs">
                <a
                  href="mailto:support@playbeat.digital"
                  className="flex items-center gap-2 text-[#C8CDD5] hover:text-white font-mono transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F5C542]" />
                  <span>support@playbeat.digital</span>
                </a>
                <a
                  href="https://wa.me/923321029333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:text-white font-mono font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp: +923321029333</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5C542] font-mono mb-4">Digital Products</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => openCategory('projectors')} className="hover:text-[#F5C542] transition-colors flex items-center gap-1.5">
                  <Tv className="w-3 h-3 text-[#F5C542]" /> Smart Projectors (8 Models)
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('subscriptions')} className="hover:text-[#F5C542] transition-colors">
                  Worldwide Subscriptions
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('ai-tools')} className="hover:text-[#F5C542] transition-colors">
                  AI Tools & Tokens
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('software')} className="hover:text-[#F5C542] transition-colors">
                  Windows & Office Retail
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('games')} className="hover:text-[#F5C542] transition-colors">
                  PC & Steam Keys
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('gift-cards')} className="hover:text-[#F5C542] transition-colors">
                  Digital Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support, Services & Legal */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5C542] font-mono mb-4">Services & Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('services')} className="text-[#F5C542] hover:text-[#DFAF2B] font-semibold transition-colors flex items-center gap-1">
                  <span>Services & Business Solutions</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#F5C542]/20 text-[#F5C542]">B2B</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('support')} className="hover:text-white transition-colors">
                  Open Support Ticket
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('account')} className="hover:text-white transition-colors">
                  My Digital Keys Vault
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('refund-policy')} className="hover:text-white transition-colors">
                  7-Day Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('privacy')} className="hover:text-white transition-colors">
                  Privacy & Data Security
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5C542] font-mono mb-4">VIP Deals & Promos</h4>
            <p className="text-xs text-[#C8CDD5] mb-3">
              Subscribe to get exclusive flash deal drops and a 10% coupon code immediately.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email-input"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-[#071A3D] border border-[#C8CDD5]/40 rounded-xl text-xs text-white placeholder-[#C8CDD5]/60 focus:outline-none focus:border-[#F5C542]"
                />
              </div>
              <button
                type="submit"
                id="newsletter-subscribe-btn"
                className="w-full py-2.5 bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] text-xs font-extrabold uppercase tracking-wide rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Subscribe for 10% Off
              </button>
            </form>
          </div>
        </div>

        {/* Direct Contact Banner & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#C8CDD5]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-[#C8CDD5] font-medium">Contact:</span>
            <a
              href="mailto:support@playbeat.digital"
              className="px-2.5 py-1 bg-[#071A3D] border border-[#C8CDD5]/30 rounded-lg text-[#C8CDD5] font-mono text-[11px] hover:text-white flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-[#F5C542]" /> support@playbeat.digital
            </a>
            <a
              href="https://wa.me/923321029333"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-[#071A3D] border border-[#25D366]/40 rounded-lg text-[#25D366] font-mono text-[11px] hover:text-white flex items-center gap-1 font-bold"
            >
              <Phone className="w-3 h-3 text-[#25D366]" /> WhatsApp: +923321029333
            </a>
          </div>

          <div className="text-[#C8CDD5] text-center md:text-right font-mono text-[11px]">
            <span>© {new Date().getFullYear()} PLAYBEAT DIGITAL • playbeat.digital. 256-Bit Encrypted.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
