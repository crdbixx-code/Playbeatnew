import React, { useState } from 'react';
import {
  Briefcase,
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe,
  Headphones,
  CheckCircle2,
  Cpu,
  BarChart3,
  Server,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  DollarSign,
  Lock,
  FileCode,
  Store,
  Filter,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesView: React.FC = () => {
  const { setActiveView, openCategory, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('');
  const [contactMsg, setContactMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Solution request submitted successfully! An architect will reach out within 2 hours ⚡', 'success');
      setContactName('');
      setContactEmail('');
      setContactOrg('');
      setContactMsg('');
      setSelectedSolutionId('');
    }, 700);
  };

  // Turnkey Business Solutions & Enterprise Management Systems ($800 - $5,000 range with 100% Escrow & Full Source Code)
  const turnkeyBusinessSolutions = [
    {
      id: 'saas-digital-vault',
      category: 'saas',
      icon: <Server className="w-6 h-6 text-[#FF6B6B]" />,
      title: 'Digital License & Key Vault E-Commerce Platform',
      tagline: 'Automated 60s Key Fulfillment & Multi-Currency Store Engine',
      valuation: '$2,450',
      priceRange: '$2,000 – $3,500 USD',
      description:
        'Complete automated digital goods storefront with instant encrypted license key distribution, customer vault management, recurring subscription billing, and real-time fraud scoring.',
      features: [
        'Full source code + React & TypeScript production build',
        'Built-in Stripe, JazzCash, Easypaisa, USDT TRC20 & Wire',
        'Automated inventory deduplication & license unmasking',
        '256-Bit HSM encrypted vault database with export tools',
      ],
      escrowGuarantee: '100% Escrow Protected Transfer',
      techStack: 'React 18 • TypeScript • Tailwind • Node.js • SQLite/Postgres',
      badge: 'Turnkey SaaS',
      deliveryTime: '24-Hour Deployment',
    },
    {
      id: 'cinema-projection-workplace',
      category: 'hardware',
      icon: <Layers className="w-6 h-6 text-[#4ECDC4]" />,
      title: 'Smart Cinema & Boardroom Projection Workplace Setup',
      tagline: 'High-Lumen Optical Engines, Motorized Mounts & Audio Synchronization',
      valuation: '$3,800',
      priceRange: '$1,500 – $4,800 USD',
      description:
        'Turn-key hardware deployment package for modern corporate meeting rooms, hybrid studios, and interactive retail. Includes customized firmware branding, dual Wi-Fi 6 casting, and synchronized surround audio.',
      features: [
        'Bulk procurement of 8 cinema models (HY320, HCS350, Android 11)',
        'Pre-flashed corporate boot logos and locked kiosk mode',
        'Multi-unit wireless HDMI & AirPlay casting hubs',
        '3-Year extended replacement SLA & hardware logistics',
      ],
      escrowGuarantee: 'Verified Hardware Courier Escrow',
      techStack: 'Android 11 Kiosk OS • Wi-Fi 6 • 4K Optical Decode',
      badge: 'Hardware Package',
      deliveryTime: 'Global Express Logistics',
    },
    {
      id: 'ai-workspace-orchestrator',
      category: 'ai',
      icon: <Cpu className="w-6 h-6 text-[#FFE66D]" />,
      title: 'Enterprise AI Workspace & Token Pooling Hub',
      tagline: 'Centralized Multi-Seat ChatGPT, Claude, Midjourney & GPU Credits',
      valuation: '$1,950',
      priceRange: '$1,200 – $3,200 USD',
      description:
        'Unified enterprise AI management portal. Provisions pooled API credits, team-shared workspace seats with zero data retention, and automated department cost metering.',
      features: [
        'Centralized dashboard for OpenAI, Anthropic, Gemini & FLUX.1',
        'Departmental quota allocation & automated spend caps',
        'SOC2 compliance zero-data-retention routing middleware',
        'Team member on-boarding & off-boarding API automation',
      ],
      escrowGuarantee: '100% Escrow Protected Transfer',
      techStack: 'REST API • Multi-Tenant Proxy • Next.js • Tailwind',
      badge: 'AI & Cloud',
      sla: 'Instant Provisioning',
    },
    {
      id: 'saas-cost-optimizer',
      category: 'management',
      icon: <BarChart3 className="w-6 h-6 text-[#45B7D1]" />,
      title: 'Organizational SaaS Audit & Spend Optimization Suite',
      tagline: 'Portfolio-Wide License Purge, Vendor Benchmarking & Bill Consolidation',
      valuation: '$1,650',
      priceRange: '$800 – $2,500 USD',
      description:
        'Enterprise management suite that scans corporate tool expenditures, identifies zombie subscriptions and duplicate licenses, and automates single-invoice vendor consolidation.',
      features: [
        'Automated discovery of shadow IT and dormant software seats',
        'Direct contract price renegotiation benchmarks (20-35% savings)',
        'Single consolidated tax invoice for all enterprise vendors',
        'Real-time renewals calendar with 30-day price surge alerts',
      ],
      escrowGuarantee: 'Verified ROI & Audit Guarantee',
      techStack: 'FinOps Engine • Accounting API • SSO Integrations',
      badge: 'Managed Solution',
      deliveryTime: 'Same-Week Audit',
    },
    {
      id: 'cybersecurity-mesh',
      category: 'security',
      icon: <ShieldCheck className="w-6 h-6 text-[#E84A8C]" />,
      title: 'Zero-Trust Business VPN & Endpoint Security Gateway',
      tagline: 'Encrypted Dedicated IP Mesh, Multi-Tenant Antivirus & Threat Telemetry',
      valuation: '$3,200',
      priceRange: '$1,800 – $4,500 USD',
      description:
        'Hardened remote-work security infrastructure. Deploys dedicated business static IP gateways, centralized endpoint telemetry, and automated malware containment for distributed teams.',
      features: [
        'Dedicated corporate static IP nodes across US, EU & Asia',
        'Centralized cloud management console with role-based access',
        'Automated real-time ransomware & phishing containment',
        'Multi-platform installers (Windows, macOS, Linux, Android, iOS)',
      ],
      escrowGuarantee: '100% Escrow Protected Transfer',
      techStack: 'WireGuard Mesh • Zero-Trust Access • Cloud Console',
      badge: 'Security Suite',
      deliveryTime: '48-Hour Network Setup',
    },
    {
      id: 'wholesale-api-reseller',
      category: 'saas',
      icon: <Zap className="w-6 h-6 text-[#9B59B6]" />,
      title: 'White-Label Digital Key Reseller REST API Hub',
      tagline: 'Automated Wholesale Digital Inventory & Real-Time Webhook Engine',
      valuation: '$4,500',
      priceRange: '$2,500 – $5,000 USD',
      description:
        'Turnkey e-commerce reseller engine allowing digital retailers and marketplaces to connect via REST API to dispatch verified software, gaming keys, and gift cards with dynamic margin controls.',
      features: [
        'Sub-second RESTful key delivery webhooks & OpenAPI 3.0 specs',
        'Dynamic wholesale pricing tiers with prepaid wallet reload',
        'Ready-to-deploy sandbox environment with simulated test orders',
        '99.99% high-availability infrastructure architecture',
      ],
      escrowGuarantee: '100% Escrow & Full Source Code',
      techStack: 'Node.js • Express • PostgreSQL • Redis Queue • React Admin',
      badge: 'Wholesale Platform',
      deliveryTime: 'Immediate Access',
    },
  ];

  const filteredSolutions =
    selectedCategory === 'all'
      ? turnkeyBusinessSolutions
      : turnkeyBusinessSolutions.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#2D2B3D] text-white pb-20 selection:bg-[#FF6B6B] selection:text-white">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#232131] border-b border-[#4A4666]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#B8B5C7]">
            <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-[#FF6B6B] font-semibold">Services & Turnkey Business Solutions</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[#4ECDC4] text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Escrow & Transfer Guarantee</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-[#4A4666]/60 bg-gradient-to-b from-[#232131] via-[#2D2B3D] to-[#232131]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#232131] border border-[#4ECDC4]/40 text-[#4ECDC4] text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Turnkey Business Solutions & Management</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Turnkey Business Solutions &{' '}
              <span className="bg-gradient-to-r from-[#FF6B6B] via-[#E84A8C] to-[#4ECDC4] bg-clip-text text-transparent">
                Enterprise Management
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#B8B5C7] leading-relaxed">
              Acquire fully built, production-ready turnkey digital platforms and corporate management systems. Every solution includes complete source code, white-label customization specs, automated payment gateways, and a 100% escrow transfer guarantee with fair acquisition valuations ranging from $800 to $5,000 USD.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#solutions-catalog"
                className="px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF6B6B]/20 flex items-center gap-2 transition-all group"
              >
                <span>Browse Ready Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#inquiry-form"
                className="px-5 py-3 bg-[#353248] hover:bg-[#3E3B54] text-white font-semibold text-xs rounded-xl border border-[#4A4666] flex items-center gap-2 transition-colors"
              >
                <Headphones className="w-4 h-4 text-[#4ECDC4]" />
                <span>Custom Solution Inquiry</span>
              </a>

              <button
                onClick={() => openCategory('projectors')}
                className="px-4 py-3 bg-[#232131] hover:bg-[#2D2B3D] text-[#B8B5C7] hover:text-white font-semibold text-xs rounded-xl border border-[#4A4666] transition-colors"
              >
                Projector Hardware (8 Models)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Escrow & Guarantee Highlights */}
      <div className="border-b border-[#4A4666] bg-[#232131]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#4ECDC4] font-black text-2xl font-mono">
                <Lock className="w-5 h-5" /> 100%
              </div>
              <p className="text-xs text-[#B8B5C7] font-medium">Safe Escrow Distribution Guarantee</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#FFE66D] font-black text-2xl font-mono">
                <DollarSign className="w-5 h-5" /> $800 – $5,000
              </div>
              <p className="text-xs text-[#B8B5C7] font-medium">Fair & Realistic Acquisition Range</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#FF6B6B] font-black text-2xl font-mono">
                <FileCode className="w-5 h-5" /> Full Code
              </div>
              <p className="text-xs text-[#B8B5C7] font-medium">White-Label Customization Specs</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#45B7D1] font-black text-2xl font-mono">
                <Award className="w-5 h-5" /> Audited
              </div>
              <p className="text-xs text-[#B8B5C7] font-medium">Verified Financial & Code Audits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Solutions Catalog */}
      <div id="solutions-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#4A4666] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B6B] font-bold">
              Ready-to-Deploy Assets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Featured Turnkey Business Solutions
            </h2>
            <p className="text-xs text-[#B8B5C7] mt-1 max-w-xl">
              Select an audited turnkey platform below for immediate escrow acquisition or custom management deployment.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'saas', label: 'SaaS Platforms' },
              { id: 'hardware', label: 'Hardware Packages' },
              { id: 'ai', label: 'AI & Cloud Hubs' },
              { id: 'management', label: 'Spend Optimization' },
              { id: 'security', label: 'Cybersecurity' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#FF6B6B] text-white shadow-md'
                    : 'bg-[#232131] text-[#B8B5C7] hover:text-white border border-[#4A4666]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map(solution => (
            <div
              key={solution.id}
              className="p-6 rounded-3xl bg-[#232131] border border-[#4A4666] flex flex-col justify-between space-y-6 hover:border-[#FF6B6B]/60 transition-all shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#353248] border border-[#4A4666] group-hover:border-[#FF6B6B]/50 transition-colors">
                    {solution.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1E1C2B] text-[#4ECDC4] border border-[#4A4666] block">
                      {solution.badge}
                    </span>
                    <span className="text-xs font-mono font-black text-[#FFE66D] mt-1 block">
                      {solution.valuation}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF6B6B] transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-xs text-[#4ECDC4] font-medium mt-0.5">{solution.tagline}</p>
                  <p className="text-xs text-[#B8B5C7] leading-relaxed mt-2.5">{solution.description}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#1E1C2B] border border-[#4A4666] text-[11px] font-mono text-slate-300">
                  <span className="text-[#B8B5C7] block text-[10px] uppercase font-bold">Tech Architecture:</span>
                  <span>{solution.techStack}</span>
                </div>

                <div className="pt-2 border-t border-[#4A4666]/60 space-y-2">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                    Deliverables & Included Assets:
                  </span>
                  {solution.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#B8B5C7]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#4A4666] flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-[#B8B5C7] font-mono">
                  <span className="text-[#4ECDC4] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {solution.escrowGuarantee}
                  </span>
                  <span className="text-[#FFE66D]">{solution.priceRange}</span>
                </div>

                <a
                  href="#inquiry-form"
                  onClick={() => {
                    setSelectedSolutionId(solution.title);
                    setContactMsg(`I am interested in acquiring/deploying: ${solution.title} (${solution.valuation}). Please send complete transfer specs.`);
                  }}
                  className="w-full py-2.5 bg-[#353248] hover:bg-[#FF6B6B] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <span>Acquire / Request Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive: Turnkey Transfer & Custom Management Protocol */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#232131] via-[#2A283B] to-[#1F1D2E] border-2 border-[#4ECDC4]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1C2B] text-[#4ECDC4] text-[11px] font-mono font-bold border border-[#4ECDC4]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Solution Management Workflow</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                How Our Business Solution Transfer & Management Works
              </h3>

              <p className="text-xs sm:text-sm text-[#B8B5C7] leading-relaxed">
                Whether deploying a turnkey e-commerce store, configuring high-lumen projector conference rooms, or consolidating corporate software subscriptions, all project transfers are executed through secure milestone-based escrow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-[#1E1C2B] border border-[#4A4666]">
                  <span className="text-[#FF6B6B] font-bold block mb-1">1. Milestone Escrow</span>
                  <span className="text-[#B8B5C7]">Funds safely held until all code, assets, and credentials pass inspection.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1E1C2B] border border-[#4A4666]">
                  <span className="text-[#4ECDC4] font-bold block mb-1">2. White-Label Setup</span>
                  <span className="text-[#B8B5C7]">Custom domains, payment gateway keys, and corporate branding applied.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1E1C2B] border border-[#4A4666]">
                  <span className="text-[#FFE66D] font-bold block mb-1">3. Ongoing Management</span>
                  <span className="text-[#B8B5C7]">Optional 24/7 infrastructure monitoring, updates, and SLA support.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
              <div className="p-5 rounded-2xl bg-[#1E1C2B] border border-[#4A4666] w-full text-center space-y-2">
                <span className="text-xs text-[#B8B5C7] uppercase font-bold">Standard Pricing Window</span>
                <div className="text-2xl font-black text-[#4ECDC4] font-mono">$800 – $5,000 USD</div>
                <p className="text-[11px] text-[#B8B5C7]">Transparent valuations with no hidden licensing royalties.</p>
                <a
                  href="#inquiry-form"
                  className="mt-2 w-full py-2.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Start a Project Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Project Inquiry / Acquisition Form */}
        <section id="inquiry-form" className="max-w-3xl mx-auto pt-8">
          <div className="p-8 rounded-3xl bg-[#232131] border border-[#4A4666] space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#353248] border border-[#4A4666] flex items-center justify-center text-[#FF6B6B] mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Request Solution Proposal & Escrow Transfer
              </h3>
              <p className="text-xs text-[#B8B5C7] max-w-md mx-auto">
                Submit your project or organization requirements. Our solution architects will review your request and provide transfer specs within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Proposal Dispatched</h4>
                <p className="text-xs text-emerald-200">
                  Thank you! Your requirements have been received. A dedicated solution manager will connect with you via email with audited specs and escrow details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Another Solution Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#B8B5C7] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 bg-[#1E1C2B] border border-[#4A4666] rounded-xl text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#B8B5C7] uppercase tracking-wider mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 bg-[#1E1C2B] border border-[#4A4666] rounded-xl text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#B8B5C7] uppercase tracking-wider mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactOrg}
                      onChange={e => setContactOrg(e.target.value)}
                      placeholder="e.g. Acme Enterprise LLC"
                      className="w-full px-4 py-2.5 bg-[#1E1C2B] border border-[#4A4666] rounded-xl text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#B8B5C7] uppercase tracking-wider mb-1.5">
                      Selected Solution
                    </label>
                    <select
                      value={selectedSolutionId}
                      onChange={e => setSelectedSolutionId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#1E1C2B] border border-[#4A4666] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B6B]"
                    >
                      <option value="">Custom Solution Package</option>
                      {turnkeyBusinessSolutions.map(s => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.valuation})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#B8B5C7] uppercase tracking-wider mb-1.5">
                    Project Requirements & Deployment Scope *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={e => setContactMsg(e.target.value)}
                    placeholder="Specify project scope, customization requirements, preferred payment method (Stripe, JazzCash, Easypaisa, USDT, Bank Wire), or timeline..."
                    className="w-full px-4 py-2.5 bg-[#1E1C2B] border border-[#4A4666] rounded-xl text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#4ECDC4] font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Protected by 100% Escrow & Transfer Guarantee</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all"
                  >
                    {isSubmitting ? 'Transmitting Request...' : 'Submit Solution Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
