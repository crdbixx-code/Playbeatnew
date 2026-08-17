import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  ShieldCheck,
  Headphones,
  CreditCard,
  Send,
  Radio,
  Tv,
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
    <footer className="bg-[#232131] border-t border-[#4A4666] text-[#B8B5C7] text-sm relative">
      {/* Value Proposition Highlights Banner */}
      <div className="border-b border-[#4A4666] bg-[#1E1C2B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#2D2B3D] border border-[#4A4666] hover:border-[#FF6B6B]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,107,107,0.2)]">
                <Zap className="w-5 h-5 text-[#FF6B6B]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Instant Vault Delivery</h4>
                <p className="text-xs text-[#B8B5C7] mt-0.5">Automated key vault generation within 0.8s of checkout.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#2D2D3D] border border-[#4A4666] hover:border-[#4ECDC4]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(78,205,196,0.2)]">
                <ShieldCheck className="w-5 h-5 text-[#4ECDC4]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">100% Genuine Licenses</h4>
                <p className="text-xs text-[#B8B5C7] mt-0.5">Direct verified publisher licenses with lifetime guarantee.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#2D2B3D] border border-[#4A4666] hover:border-[#FFE66D]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFE66D]/20 border border-[#FFE66D]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,230,109,0.2)]">
                <CreditCard className="w-5 h-5 text-[#FFE66D]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Multi-Gateway Payments</h4>
                <p className="text-xs text-[#B8B5C7] mt-0.5">Stripe, JazzCash, Easypaisa, Bank Wire & Crypto.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#2D2B3D] border border-[#4A4666] hover:border-[#E84A8C]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#E84A8C]/20 border border-[#E84A8C]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(232,74,140,0.2)]">
                <Headphones className="w-5 h-5 text-[#E84A8C]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">24/7 Human Helpdesk</h4>
                <p className="text-xs text-[#B8B5C7] mt-0.5">Dedicated live engineering support & ticket resolution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-white text-base">▲</span>
              <span className="text-[#FF6B6B] text-lg font-bold">●</span>
              <span className="text-lg font-black tracking-tight text-white">
                playbeat 4
              </span>
              <span className="text-xs text-[#B8B5C7] font-mono">| Audiomodern</span>
            </div>
            <p className="text-xs text-[#B8B5C7] leading-relaxed max-w-sm">
              The premier digital commerce and algorithmic rhythm studio. Verified PC gaming keys, genuine operating systems, productivity software, SaaS subscriptions, smart projectors, and digital services with instant automated delivery.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView('node-studio')}
                className="flex items-center gap-2 text-xs text-[#FF6B6B] bg-[#2D2B3D] border border-[#FF6B6B]/40 px-3.5 py-2 rounded-xl hover:bg-[#353248] transition-colors shadow-sm"
              >
                <Radio className="w-3.5 h-3.5 text-[#FF6B6B] animate-pulse" />
                <span className="font-mono font-medium">Launch PlayBeat 4 Drum Studio</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-4">Digital Products</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => openCategory('projectors')} className="hover:text-[#4ECDC4] transition-colors flex items-center gap-1.5">
                  <Tv className="w-3 h-3 text-[#4ECDC4]" /> Smart Projectors (8 Models)
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('subscriptions')} className="hover:text-[#FF6B6B] transition-colors">
                  Worldwide Subscriptions
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('ai-tools')} className="hover:text-[#FFE66D] transition-colors">
                  AI Tools & Tokens
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('software')} className="hover:text-[#45B7D1] transition-colors">
                  Windows & Office Retail
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('games')} className="hover:text-[#E84A8C] transition-colors">
                  PC & Steam Keys
                </button>
              </li>
              <li>
                <button onClick={() => openCategory('gift-cards')} className="hover:text-[#9B59B6] transition-colors">
                  Digital Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support & Legal */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-4">Support & Trust</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('support')} className="hover:text-[#4ECDC4] transition-colors">
                  Open Support Ticket
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('account')} className="hover:text-[#4ECDC4] transition-colors">
                  My Digital Keys Vault
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('refund-policy')} className="hover:text-[#4ECDC4] transition-colors">
                  7-Day Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('terms')} className="hover:text-[#4ECDC4] transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('privacy')} className="hover:text-[#4ECDC4] transition-colors">
                  Privacy & Data Security
                </button>
              </li>
              <li>
                <button onClick={() => openCMSPage('about')} className="hover:text-[#4ECDC4] transition-colors">
                  About PlayBeat Digital
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-4">VIP Deals & Promos</h4>
            <p className="text-xs text-[#B8B5C7] mb-3">
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
                  className="w-full px-3 py-2 bg-[#1E1C2B] border border-[#4A4666] rounded-xl text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
                />
              </div>
              <button
                type="submit"
                id="newsletter-subscribe-btn"
                className="w-full py-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#FF6B6B]/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Subscribe for 10% Off
              </button>
            </form>
          </div>
        </div>

        {/* Payment Gateways Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#4A4666] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#B8B5C7] font-medium mr-1">Accepted Payment Gateways:</span>
            <span className="px-2.5 py-1 bg-[#1E1C2B] border border-[#4A4666] rounded-lg text-white font-mono text-[11px]">
              💳 Stripe / Card
            </span>
            <span className="px-2.5 py-1 bg-[#1E1C2B] border border-[#4A4666] rounded-lg text-[#4ECDC4] font-mono text-[11px]">
              📱 JazzCash
            </span>
            <span className="px-2.5 py-1 bg-[#1E1C2B] border border-[#4A4666] rounded-lg text-[#4ECDC4] font-mono text-[11px]">
              📱 Easypaisa
            </span>
            <span className="px-2.5 py-1 bg-[#1E1C2B] border border-[#4A4666] rounded-lg text-[#FFE66D] font-mono text-[11px]">
              🪙 USDT Crypto
            </span>
            <span className="px-2.5 py-1 bg-[#1E1C2B] border border-[#4A4666] rounded-lg text-[#45B7D1] font-mono text-[11px]">
              🏦 Bank Wire
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 text-[#B8B5C7] text-center md:text-right font-mono text-[11px]">
            <button
              onClick={() => setActiveView('wp-admin')}
              className="px-2.5 py-1 rounded-lg bg-[#2D2B3D] hover:bg-[#353248] border border-[#4A4666] text-[#FF6B6B] hover:text-white transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] animate-pulse" />
              <span>WP-Admin (playbeat.digital/wp-admin)</span>
            </button>
            <span>© {new Date().getFullYear()} PlayBeat 4 & Audiomodern. 256-Bit Encrypted.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
