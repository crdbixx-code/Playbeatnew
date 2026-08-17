import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, ChevronLeft, Lock } from 'lucide-react';

export const CMSPageView: React.FC = () => {
  const { selectedCmsSlug, setActiveView } = useApp();
  const [pageData, setPageData] = useState<{ title: string; content: string; updatedAt: string } | null>(null);

  useEffect(() => {
    fetch(`/api/cms/${selectedCmsSlug || 'terms-of-service'}`)
      .then(res => res.json())
      .then(data => {
        if (data.page) {
          setPageData(data.page);
        }
      })
      .catch(() => {});
  }, [selectedCmsSlug]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={() => setActiveView('home')}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Storefront
      </button>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Official PlayBeat Policy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {pageData?.title || 'Terms of Service'}
        </h1>
        {pageData?.updatedAt && (
          <p className="text-xs text-slate-400 font-mono">
            Last Updated: {new Date(pageData.updatedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-6 leading-relaxed whitespace-pre-line">
        {pageData?.content || (
          <div>
            <h3 className="text-base font-bold text-white mb-2">1. Overview & Agreement</h3>
            <p>
              By accessing and purchasing from PlayBeat Digital, you acknowledge that all software licenses, digital keys, and subscription credentials are delivered in accordance with vendor digital transfer standards.
            </p>
            <h3 className="text-base font-bold text-white mt-4 mb-2">2. Instant Automated Delivery Guarantee</h3>
            <p>
              Digital keys are dispatched within 0.8 seconds following automated payment clearing via authorized processors (Stripe, JazzCash, Easypaisa, USDT, and Wire Transfer).
            </p>
            <h3 className="text-base font-bold text-white mt-4 mb-2">3. 7-Day Replacement Policy</h3>
            <p>
              Every key is backed by an ironclad warranty. If a code fails activation on verified servers, our technical helpdesk issues an immediate replacement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
