import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What solutions do you offer?',
      a: 'We provide modular, enterprise-grade digital solutions spanning core workflow automation, scalable cloud architectures, instant software license dispatch, real-time analytics intelligence, and dedicated custom enterprise consulting.',
    },
    {
      q: 'How quickly can we get started?',
      a: 'Immediate activation is available for standard and professional packages with automated credential dispatch and sandbox access in seconds. Custom enterprise deployments typically complete guided provisioning within 24 to 48 hours.',
    },
    {
      q: 'Is the platform scalable?',
      a: 'Yes. Our platform utilizes containerized, auto-scaling microservices hosted across geographically distributed edge nodes. It effortlessly scales to support millions of concurrent transactions with sub-15ms regional latency.',
    },
    {
      q: 'Is my data secure?',
      a: 'Security is paramount. We employ AES-256 GCM encryption at rest and TLS 1.3 in transit, strict zero-trust role-based access controls (RBAC), multi-factor authentication, and continuous automated vulnerability scans.',
    },
    {
      q: 'Do you offer customer support?',
      a: 'Yes, we provide 24/7 dedicated support via direct email (support@playbeat.digital), priority live chat, and instant WhatsApp support (+923321029333). Enterprise clients are assigned a dedicated Tier-3 Solutions Engineer.',
    },
    {
      q: 'Can the platform integrate with existing systems?',
      a: 'Absolutely. We provide comprehensive RESTful and GraphQL APIs, customizable Webhooks, and pre-built connectors for standard ERPs, CRMs, authentication providers (Okta, Azure AD), and payment infrastructure.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F8] border border-[#C8CDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041126] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Everything you need to know about our technology, onboarding, and enterprise security.
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 bg-[#FFFFFF] overflow-hidden ${
                  isOpen
                    ? 'border-[#071A3D] shadow-md'
                    : 'border-[#C8CDD5] hover:border-[#071A3D]/60'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Yellow Active Indicator */}
                    <span
                      className={`w-2 h-2 rounded-full transition-colors shrink-0 ${
                        isOpen ? 'bg-[#F5C542] shadow-[0_0_8px_#F5C542]' : 'bg-[#C8CDD5]'
                      }`}
                    />
                    <span className="text-base sm:text-lg font-bold text-[#041126]">
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#071A3D] text-[#F5C542]' : 'bg-[#F3F5F8] text-[#071A3D]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#475569] leading-relaxed border-t border-[#F3F5F8] animate-in fade-in-50 duration-200 pl-11">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
