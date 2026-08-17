import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { PlaybeatSequencer } from '../components/PlaybeatSequencer';
import {
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronRight,
  Gamepad2,
  Laptop,
  Tv,
  Gift,
  Cpu,
  Package,
  Star,
  CheckCircle2,
  Lock,
  Headphones,
  Flame,
  Clock,
  DollarSign,
  Tag,
  Shield,
  BookOpen,
  Mail,
  Users,
  Check,
  Percent,
  Sparkle,
  Radio,
  ExternalLink,
  ShoppingBag,
  Search,
  SlidersHorizontal,
  Layers,
  Music,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    openCategory,
    setActiveView,
    openProductDetail,
    setIsSearchOpen,
    formatPrice,
    settings,
    addToCart,
    buyNow,
  } = useApp();

  const [activeCatalogTab, setActiveCatalogTab] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [selectedBudgetFilter, setSelectedBudgetFilter] = useState<number | null>(null);
  const [catalogSearchKeyword, setCatalogSearchKeyword] = useState('');
  const [catalogSortBy, setCatalogSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  // Flash Sale Countdown calculation
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDeals = products.filter(p => p.isFlashDeal);
  const featuredProducts = products.filter(p => p.isFeatured);
  const bestSellers = products.filter(p => p.isBestSeller || p.rating >= 4.9);
  const projectorProducts = products.filter(p => p.category === 'projectors');

  // Exact 8 Popular / Most Loved items
  const popularEightProducts = products.filter(p =>
    [
      'prod-kaspersky-total-sec',
      'prod-spotify-prem-3m',
      'prod-jasper-ai-tool',
      'prod-eset-internet-sec',
      'prod-norton-360-deluxe',
      'prod-mcafee-total-prot',
      'prod-nordvpn-playbeat',
      'prod-expressvpn-playbeat',
    ].includes(p.id)
  );

  // Filter for the main catalog section matching exact tabs
  const categoryTabs = [
    'All',
    'AI Tools',
    'Blog',
    'Bundles',
    'Earn with Affiliates',
    'Free Tools',
    'Games',
    'Gift Cards',
    'Smart Projectors',
    'Software',
    'Subscriptions',
  ];

  let filteredCatalog = products;

  if (activeCatalogTab !== 'All') {
    if (activeCatalogTab === 'Smart Projectors') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'projectors');
    } else if (activeCatalogTab === 'AI Tools') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'ai-tools' || p.tags.includes('AI Tools'));
    } else if (activeCatalogTab === 'Software') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'software');
    } else if (activeCatalogTab === 'Subscriptions') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'subscriptions');
    } else if (activeCatalogTab === 'Games') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'games');
    } else if (activeCatalogTab === 'Gift Cards') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'gift-cards');
    } else if (activeCatalogTab === 'Bundles') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'bundles');
    } else if (activeCatalogTab === 'Free Tools') {
      filteredCatalog = filteredCatalog.filter(p => p.category === 'free-tools');
    }
  }

  if (catalogSearchKeyword.trim()) {
    const q = catalogSearchKeyword.toLowerCase();
    filteredCatalog = filteredCatalog.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  if (selectedBudgetFilter !== null) {
    filteredCatalog = filteredCatalog.filter(p => {
      const price = p.salePrice || p.price;
      return price <= selectedBudgetFilter;
    });
  }

  // Sorting
  if (catalogSortBy === 'price-low') {
    filteredCatalog = [...filteredCatalog].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (catalogSortBy === 'price-high') {
    filteredCatalog = [...filteredCatalog].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else if (catalogSortBy === 'rating') {
    filteredCatalog = [...filteredCatalog].sort((a, b) => b.rating - a.rating);
  }

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredCatalog.length / itemsPerPage) || 1;
  const paginatedCatalog = filteredCatalog.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const platforms = [
    { name: 'Steam', badge: 'PC Keys' },
    { name: 'Microsoft', badge: 'Windows & Office' },
    { name: 'OpenAI', badge: 'ChatGPT & API' },
    { name: 'Adobe', badge: 'Creative Cloud' },
    { name: 'PlayStation', badge: 'PSN & Plus' },
    { name: 'Xbox', badge: 'Game Pass' },
    { name: 'Spotify', badge: 'Premium Audio' },
    { name: 'Apple', badge: 'iTunes & Gift' },
    { name: 'Google Play', badge: 'Wallet Credits' },
    { name: 'NordVPN', badge: 'Security Suite' },
    { name: 'JetBrains', badge: 'Developer IDEs' },
    { name: 'Figma', badge: 'UI/UX Design' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="space-y-16 pb-20 bg-[#2D2B3D] text-white">
      {/* 1. HERO SECTION (Worldwide Digital Subscriptions) */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-[#4A4666]/60 bg-gradient-to-b from-[#232131] via-[#2D2B3D] to-[#232131]">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#E84A8C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Main Copy */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#232131] border border-[#FF6B6B]/40 text-[#FF6B6B] text-xs font-black shadow-lg uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-ping" />
                <span>The Gateway to Digital Heaven</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Worldwide Digital{' '}
                <span className="bg-gradient-to-r from-[#FF6B6B] via-[#E84A8C] to-[#4ECDC4] bg-clip-text text-transparent">
                  Subscriptions
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#B8B5C7] max-w-2xl leading-relaxed font-normal">
                Every streaming service, gaming pass, AI tool & cloud plan — from every platform, for every region. One store. Every service. No borders. Verified, region-unlocked, and live in seconds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-explore-subs-btn"
                  onClick={() => openCategory('subscriptions')}
                  className="px-6 py-3.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold text-sm rounded-xl shadow-xl shadow-[#FF6B6B]/30 flex items-center gap-2 transition-all group"
                >
                  <Zap className="w-4 h-4 text-white" />
                  Explore Subscriptions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-browse-plans-btn"
                  onClick={() => setActiveView('shop')}
                  className="px-5 py-3.5 bg-[#353248] hover:bg-[#3E3B54] text-white font-semibold text-sm rounded-xl border border-[#4A4666] flex items-center gap-2 transition-colors"
                >
                  <Package className="w-4 h-4 text-[#4ECDC4]" />
                  Browse All Plans
                </button>

                <button
                  id="hero-studio-btn"
                  onClick={() => setActiveView('node-studio')}
                  className="px-4 py-3.5 bg-[#E84A8C]/20 hover:bg-[#E84A8C]/30 border border-[#E84A8C]/40 text-[#E84A8C] font-semibold text-sm rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Radio className="w-4 h-4 text-[#E84A8C] animate-pulse" />
                  PlayBeat 4 Drum Studio
                </button>
              </div>

              {/* Stats Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#4A4666]/60">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">500+</span>
                  <span className="text-xs text-[#B8B5C7] font-semibold">Subscriptions</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#4ECDC4] font-mono">50+</span>
                  <span className="text-xs text-[#B8B5C7] font-semibold">Platforms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#FFE66D] font-mono">Global</span>
                  <span className="text-xs text-[#B8B5C7] font-semibold">Access</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#FF6B6B] font-mono">&lt;60s</span>
                  <span className="text-xs text-[#B8B5C7] font-semibold">Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Hot Deal Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-[#232131] border border-[#4A4666] p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#4A4666] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
                    <span className="font-extrabold text-white uppercase tracking-wider text-[11px]">
                      Featured Pick
                    </span>
                  </div>
                  <span className="font-mono text-[#4ECDC4] font-bold text-[11px]">Instant Key</span>
                </div>

                <div className="mt-4 space-y-3.5">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1E1C2B] border border-[#4A4666] group">
                    <img
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                      alt="Jasper AI"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-[#FF6B6B] text-white font-black text-xs font-mono shadow-md">
                      AI PICK
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] text-[#4ECDC4] font-mono flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Auto-Delivery
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-[#B8B5C7]">
                      <span className="font-medium text-[#4ECDC4]">Jasper AI</span>
                      <div className="flex items-center text-[#FFE66D] gap-1 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#FFE66D]" />
                        <span>4.92</span>
                        <span className="text-[#B8B5C7]">(165)</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 line-clamp-1">Jasper AI Marketing Suite</h3>
                    <p className="text-xs text-[#B8B5C7] mt-1 line-clamp-2">AI writing for marketing — 10x faster.</p>
                  </div>

                  <div className="pt-3 border-t border-[#4A4666] flex items-center justify-between">
                    <div>
                      <div className="text-xl font-black text-white font-mono">
                        Rs 3,348
                      </div>
                      <div className="text-xs text-[#B8B5C7] font-mono">
                        Direct Account Activation
                      </div>
                    </div>
                    <button
                      onClick={() => openProductDetail('jasper-ai')}
                      className="px-4 py-2.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B6B]/30 flex items-center gap-1.5 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 text-white" />
                      Get Access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLAYBEAT 4 RHYTHM SEQUENCER EMBEDDED MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlaybeatSequencer onOpenFullStudio={() => setActiveView('node-studio')} />
      </section>

      {/* 3. 🔥 POPULAR / MOST LOVED BY OUR CUSTOMERS - 8 FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#232131] border border-[#4A4666] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 text-[#FF6B6B] text-xs font-black mb-2 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>🔥 Popular / Most loved by our customers - 8 featured</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Top Rated Subscriptions & Software
              </h2>
              <p className="text-xs sm:text-sm text-[#B8B5C7] mt-1 max-w-2xl">
                Verified genuine licenses, antivirus security suites, streaming passes, and AI marketing tools with instant delivery.
              </p>
            </div>

            <button
              onClick={() => setActiveView('shop')}
              className="px-4 py-2 rounded-xl bg-[#353248] hover:bg-[#3E3B54] border border-[#4A4666] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              View All 41+ Products <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularEightProducts.length > 0 ? (
              popularEightProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))
            ) : (
              featuredProducts.slice(0, 8).map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. PINNED SMART PROJECTORS (10% PROFIT MARGIN TRANSPARENT PRICING) */}
      <section id="pinned-projectors-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#232131] border-2 border-[#4ECDC4]/50 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 text-[#4ECDC4] text-xs font-extrabold uppercase tracking-wider shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-ping" />
                <span>📌 PINNED SHOWCASE • 10% PROFIT MARGIN GUARANTEE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-center gap-2">
                <Tv className="w-7 h-7 text-[#4ECDC4]" />
                Smart Cinema Projectors & Hardware
              </h2>
              <p className="text-xs sm:text-sm text-[#B8B5C7] max-w-2xl mt-1">
                ZeroByte verified inventory with transparent cost-plus pricing. Real hardware specifications, instant local warranty, and direct sourcing links.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-[#353248] border border-[#4A4666] text-xs font-mono font-bold text-[#4ECDC4]">
                8 Models Available
              </span>
              <button
                onClick={() => openCategory('projectors')}
                className="px-4 py-2 bg-[#4ECDC4] hover:bg-[#3dbdb4] text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-[#4ECDC4]/30 flex items-center gap-1.5 transition-all"
              >
                <span>View Department</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transparent Cost Breakdown Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#4A4666] bg-[#1E1C2B]">
            <table className="w-full text-left text-xs text-[#B8B5C7]">
              <thead className="bg-[#232131] text-[11px] font-bold uppercase tracking-wider text-[#4ECDC4] border-b border-[#4A4666]">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Cost Price (PKR)</th>
                  <th className="py-3 px-4">Profit (10%)</th>
                  <th className="py-3 px-4 text-[#4ECDC4] font-extrabold">Final Selling Price</th>
                  <th className="py-3 px-4">Key Specs</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A4666]/60 font-mono">
                {projectorProducts.map(proj => (
                  <tr key={proj.id} className="hover:bg-[#353248]/60 transition-colors">
                    <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2.5">
                      <img
                        src={proj.images[0]}
                        alt={proj.name}
                        className="w-9 h-9 rounded-lg object-cover border border-[#4A4666] shrink-0"
                      />
                      <div>
                        <span
                          onClick={() => openProductDetail(proj.slug)}
                          className="hover:text-[#4ECDC4] cursor-pointer block text-xs"
                        >
                          {proj.name}
                        </span>
                        <span className="text-[10px] text-[#B8B5C7] font-normal">{proj.brand}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">Rs {proj.costPricePKR?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#FFE66D] font-bold">+Rs {proj.profitMarginPKR?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#4ECDC4] font-extrabold text-sm">
                      Rs {proj.pricePKR?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-sans text-[11px] text-[#B8B5C7] max-w-xs truncate">
                      {proj.shortDescription}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openProductDetail(proj.slug)}
                        className="px-2.5 py-1 rounded-lg bg-[#353248] hover:bg-[#4A4666] text-white text-[11px] font-sans font-bold"
                      >
                        Specs
                      </button>
                      <button
                        onClick={() => buyNow(proj)}
                        className="px-2.5 py-1 rounded-lg bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-[11px] font-sans font-bold"
                      >
                        Buy Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards Grid for Projectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {projectorProducts.map(proj => (
              <ProductCard key={proj.id} product={proj} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. "PREMIUM COLLECTION" & CATEGORY FILTER PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B6B]">
            Premium Collection
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Premium digital products. Instant delivery.
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B5C7] leading-relaxed">
            From streaming subscriptions to AI tools and game keys — every product is verified, region-unlocked, and delivered to your inbox in under 60 seconds.
          </p>
        </div>

        {/* Category Filter Pills (Exact Matching) */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-6">
          {categoryTabs.map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveCatalogTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeCatalogTab === tab
                  ? 'bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/30 ring-2 ring-[#FF6B6B]/40'
                  : 'bg-[#232131] hover:bg-[#353248] text-[#B8B5C7] hover:text-white border border-[#4A4666]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Refine / Search Filter Bar */}
        <div className="p-4 rounded-2xl bg-[#232131] border border-[#4A4666] flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5 w-full md:w-80">
            <Search className="w-4 h-4 text-[#B8B5C7]" />
            <input
              type="text"
              placeholder="Refine by keyword..."
              value={catalogSearchKeyword}
              onChange={e => {
                setCatalogSearchKeyword(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#1E1C2B] border border-[#4A4666] rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            <span className="text-[#B8B5C7] font-mono">{filteredCatalog.length} results</span>

            <select
              value={catalogSortBy}
              onChange={e => setCatalogSortBy(e.target.value)}
              className="bg-[#1E1C2B] border border-[#4A4666] text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="popular">Most popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {(catalogSearchKeyword || activeCatalogTab !== 'All' || selectedBudgetFilter !== null) && (
              <button
                onClick={() => {
                  setCatalogSearchKeyword('');
                  setActiveCatalogTab('All');
                  setSelectedBudgetFilter(null);
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#353248] hover:bg-[#4A4666] text-white text-xs font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedCatalog.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {paginatedCatalog.length === 0 && (
          <div className="text-center py-12 bg-[#232131] rounded-2xl border border-[#4A4666]">
            <p className="text-sm text-[#B8B5C7]">No products found matching your search.</p>
            <button
              onClick={() => {
                setActiveCatalogTab('All');
                setCatalogSearchKeyword('');
                setSelectedBudgetFilter(null);
              }}
              className="mt-3 px-4 py-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-xl bg-[#232131] border border-[#4A4666] text-xs font-bold text-[#B8B5C7] disabled:opacity-40 hover:text-white"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  currentPage === idx + 1
                    ? 'bg-[#FF6B6B] text-white shadow-md'
                    : 'bg-[#232131] border border-[#4A4666] text-[#B8B5C7] hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-xl bg-[#232131] border border-[#4A4666] text-xs font-bold text-[#B8B5C7] disabled:opacity-40 hover:text-white"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* 6. "JOIN THE MOVEMENT" COMMUNITY TRUST BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#232131] via-[#353248] to-[#232131] border border-[#4A4666] text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/40 text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Join The Movement</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white">
            Trusted by 12,000+ customers worldwide
          </h3>

          <p className="text-xs sm:text-sm text-[#B8B5C7] max-w-2xl mx-auto leading-relaxed">
            From Islamabad to Istanbul, New York to Nairobi — playbeat.digital powers digital commerce across 50+ platforms and every region. Secure checkout, instant delivery, 24/7 support.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('shop')}
              className="px-6 py-3.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold text-xs rounded-xl shadow-xl shadow-[#FF6B6B]/30 transition-all"
            >
              Start Exploring Today
            </button>
            <button
              onClick={() => setActiveView('support')}
              className="px-6 py-3.5 bg-[#232131] hover:bg-[#353248] border border-[#4A4666] text-white font-bold text-xs rounded-xl transition-all"
            >
              Contact 24/7 Support
            </button>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER / DEAL ALERTS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#232131] border border-[#4A4666] text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#353248] border border-[#4A4666] flex items-center justify-center text-[#FF6B6B] mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Get Secret Weekly Flash Keys</h3>
            <p className="text-xs text-[#B8B5C7] mt-1 max-w-md mx-auto">
              Join 25,000+ gamers and developers. Receive unadvertised discount codes, free tool drops, and $5 off your next order.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1E1C2B] border border-[#4A4666] text-xs text-white placeholder-[#B8B5C7] focus:outline-none focus:border-[#FF6B6B]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-[#FF6B6B]/20"
            >
              Subscribe
            </button>
          </form>

          {newsletterSuccess && (
            <p className="text-xs text-[#4ECDC4] font-semibold animate-in fade-in">
              ✓ Thanks for subscribing! Check your inbox for your $5 welcome coupon code.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
