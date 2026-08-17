import React, { useState } from 'react';
import {
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Clock,
  Building,
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Starter Business',
      desc: 'Perfect for small teams and expanding digital practices.',
      priceMonthly: 49,
      priceAnnual: 39,
      features: [
        'Up to 10 Team Seats',
        'Standard RESTful API Access',
        'Automated License Provisioning',
        'Community & Email Support (24h)',
        '99.9% Platform SLA',
      ],
      isPopular: false,
      tag: 'Basic Setup',
    },
    {
      name: 'Professional Digital',
      desc: 'Ideal for scaling businesses requiring advanced automation.',
      priceMonthly: 149,
      priceAnnual: 119,
      features: [
        'Unlimited Team Seats',
        'Full GraphQL & Webhook Feeds',
        'Advanced Analytics & Reporting',
        'Priority Live Chat & WhatsApp (+923321029333)',
        'Automated Daily Cloud Backups',
        'Zero-Trust Access Controls',
      ],
      isPopular: true,
      tag: 'Most Popular',
    },
    {
      name: 'Custom Enterprise',
      desc: 'Tailored infrastructure with dedicated solution architects.',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      features: [
        'Dedicated Cloud Edge Clusters',
        'Custom Single Sign-On (SAML / Okta)',
        'Custom Security Compliance Audits',
        'Dedicated 24/7 Solution Architect',
        '1-Hour Response SLA',
        'Custom Billing & Wire Invoicing',
      ],
      isPopular: false,
      tag: 'Enterprise Tier',
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F3F5F8] border-y border-[#C8CDD5]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#C8CDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#071A3D]">
              TRANSPARENT PRICING
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041126] tracking-tight">
            Predictable Plans for Every Stage
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            No hidden costs. Scale your digital solutions on demand with transparent volume-tiered licensing.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-[#FFFFFF] border border-[#C8CDD5] shadow-xs text-xs font-bold">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#071A3D] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#041126]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-[#071A3D] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#041126]'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#F5C542] text-[#041126] text-[9px] font-black">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isCustom = typeof plan.priceAnnual === 'string';
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 bg-[#FFFFFF] border transition-all duration-300 flex flex-col justify-between ${
                  plan.isPopular
                    ? 'border-2 border-[#071A3D] shadow-[0_20px_45px_rgba(7,26,61,0.12)] -translate-y-2'
                    : 'border-[#C8CDD5] shadow-sm hover:shadow-xl hover:border-[#071A3D]'
                }`}
              >
                {/* Popular Pill */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F5C542] text-[#041126] text-[10px] font-black uppercase tracking-wider shadow-md">
                    Recommended Choice
                  </div>
                )}

                <div>
                  {/* Plan Name & Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#041126]">
                      {plan.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] text-[10px] font-mono font-bold text-[#071A3D]">
                      {plan.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                    {plan.desc}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-[#C8CDD5]/60 flex items-baseline gap-1">
                    {isCustom ? (
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#041126] font-mono">
                        Contact Us
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl sm:text-5xl font-black text-[#041126] font-mono">
                          ${price}
                        </span>
                        <span className="text-xs text-[#64748B] font-bold">
                          / month {billingCycle === 'annual' && '(billed annually)'}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                      Everything Included:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#334155]">
                        <div className="w-4 h-4 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#071A3D] stroke-[3]" />
                        </div>
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.isPopular
                        ? 'bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] shadow-md hover:shadow-lg'
                        : 'bg-[#071A3D] hover:bg-[#041126] text-white'
                    }`}
                  >
                    <span>{isCustom ? 'Inquire for Custom Quote' : `Select ${plan.name.split(' ')[0]}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
