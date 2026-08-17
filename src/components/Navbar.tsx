import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Heart,
  Search,
  User as UserIcon,
  Shield,
  Zap,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Gamepad2,
  Laptop,
  Cpu,
  Tv,
  Gift,
  Package,
  Layers,
  HelpCircle,
  LogOut,
  SlidersHorizontal,
  Lock,
  Radio,
  Globe,
  DollarSign,
  ArrowRight,
  Flame,
  Star,
  CheckCircle2,
  Play,
  Square,
  Briefcase,
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    wishlist,
    currentUser,
    switchRole,
    setIsSearchOpen,
    openCategory,
    openProductDetail,
    currency,
    setCurrency,
    formatPrice,
    settings,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('GLOBAL');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterMega = (menuId: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeaveMega = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const isAdminOrStaff =
    currentUser?.role === 'super_admin' ||
    currentUser?.role === 'admin' ||
    currentUser?.role === 'store_manager' ||
    currentUser?.role === 'support_agent' ||
    currentUser?.role === 'finance';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#C8CDD5] bg-[#FFFFFF]/95 backdrop-blur-2xl shadow-sm text-[#071A3D]">
      {/* Top Value Banner */}
      <div className="bg-[#071A3D] px-4 py-1.5 text-xs text-[#C8CDD5] border-b border-[#C8CDD5]/20 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-4 text-[#C8CDD5]">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Zap className="w-3.5 h-3.5 text-[#F5C542]" /> Instant Vault Delivery: &lt;60s
            </span>
            <span className="text-[#C8CDD5]/40">•</span>
            <span className="flex items-center gap-1 text-[#C8CDD5]">
              <Shield className="w-3.5 h-3.5 text-[#F5C542]" /> 100% Genuine Verified Digital Keys
            </span>
            <span className="text-[#C8CDD5]/40">•</span>
            <span className="flex items-center gap-1 text-white">
              <Star className="w-3.5 h-3.5 fill-[#F5C542] text-[#F5C542]" /> 24/7 Live Key Vault Delivery & Support
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Region Selector */}
            <div className="relative">
              <button
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="flex items-center gap-1 text-[#C8CDD5] hover:text-white transition-colors"
                title="Select Region"
              >
                <Globe className="w-3 h-3 text-[#F5C542]" />
                <span className="font-mono">{selectedRegion}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              {isRegionDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-[#041126] border border-[#C8CDD5]/30 rounded-xl p-1 shadow-2xl z-50 animate-in fade-in">
                  {['GLOBAL', 'US', 'EU', 'UK', 'ASIA'].map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        setSelectedRegion(r);
                        setIsRegionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1 text-xs rounded-lg flex items-center justify-between ${
                        selectedRegion === r ? 'bg-[#071A3D] text-[#F5C542] font-bold' : 'text-[#C8CDD5] hover:bg-white/10'
                      }`}
                    >
                      <span>{r}</span>
                      {selectedRegion === r && <CheckCircle2 className="w-3 h-3 text-[#F5C542]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[#C8CDD5]/30">|</span>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-[#F5C542] font-mono font-bold transition-colors"
                title="Select Currency"
              >
                <span>{currency}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#041126] border border-[#C8CDD5]/30 rounded-xl p-1 shadow-2xl z-50 animate-in fade-in">
                  {[
                    { code: 'USD', symbol: '$', label: 'USD ($)' },
                    { code: 'PKR', symbol: '₨', label: 'PKR (₨)' },
                    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
                    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
                  ].map(c => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        currency === c.code ? 'bg-[#071A3D] text-[#F5C542] font-bold' : 'text-[#C8CDD5] hover:bg-white/10'
                      }`}
                    >
                      <span>{c.label}</span>
                      {currency === c.code && <CheckCircle2 className="w-3 h-3 text-[#F5C542]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[#C8CDD5]/30">|</span>

            <button
              onClick={() => setActiveView('services')}
              className="text-[#F5C542] hover:text-[#DFAF2B] transition-colors font-semibold flex items-center gap-1"
            >
              <Briefcase className="w-3 h-3" />
              <span>Services & Solutions</span>
            </button>

            <span className="text-[#C8CDD5]/30">|</span>

            <button
              onClick={() => setActiveView('support')}
              className="text-[#C8CDD5] hover:text-white transition-colors"
            >
              24/7 Live Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo, Sequencer Transport Header, Search Bar, Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-5 py-2">
          {/* Brand Logo ▲ + ● playbeat digital */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              {/* Audiomodern Peak Logo Icon ▲ */}
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#C8CDD5] flex items-center justify-center shadow-md group-hover:border-[#041126] transition-all">
                <span className="text-white text-base font-black leading-none select-none">▲</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  {/* Yellow circular element ● */}
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5C542] shadow-[0_0_8px_#F5C542] inline-block" />
                  <span className="text-xl font-black tracking-tight text-[#041126] uppercase">
                    PLAYBEAT <span className="text-[#071A3D]">DIGITAL</span>
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#64748B] mt-0.5">
                  playbeat.digital
                </span>
              </div>
            </button>
          </div>

          {/* Header Section Transport Bar: BPM Display & Central Play Button */}
          <div className="hidden xl:flex items-center gap-2 bg-[#F3F5F8] px-3.5 py-1.5 rounded-2xl border border-[#C8CDD5] shadow-xs">
            {/* BPM Display */}
            <div className="flex items-center gap-1.5 pr-2.5 border-r border-[#C8CDD5]">
              <div className="flex flex-col text-left">
                <span className="text-[8px] uppercase font-bold text-[#64748B] tracking-wider">BPM</span>
                <span className="text-xs font-black text-[#041126] font-mono">120.00</span>
              </div>
            </div>

            {/* Central Prominent Yellow Circular Play Button */}
            <button
              id="header-transport-play-btn"
              onClick={() => setActiveView('node-studio')}
              className="w-8 h-8 rounded-full bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
              title="Open Sequencer Studio / Play Rhythm"
            >
              <Play className="w-4 h-4 fill-[#041126] ml-0.5" />
            </button>

            {/* Stop / Studio Shortcut */}
            <button
              onClick={() => setActiveView('node-studio')}
              className="p-1.5 rounded-lg bg-white hover:bg-[#071A3D] text-[#071A3D] hover:text-white border border-[#C8CDD5] transition-colors cursor-pointer"
              title="Open Playbeat 4 Studio"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>

            <button
              onClick={() => setActiveView('node-studio')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#071A3D] hover:bg-[#041126] text-[#F5C542] text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#F5C542]" />
              <span>Studio</span>
            </button>
          </div>

          {/* Full-width Search Bar */}
          <div className="flex-1 max-w-xl">
            <button
              id="header-full-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F3F5F8] hover:bg-[#FFFFFF] border border-[#C8CDD5] hover:border-[#071A3D] text-[#64748B] hover:text-[#041126] text-xs transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-[#071A3D] group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[#64748B] group-hover:text-[#041126] text-xs truncate font-medium">
                  Search game keys, AI tools, gift cards, software... Press Enter to search
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white text-[#071A3D] rounded border border-[#C8CDD5]">
                  ⌘K
                </kbd>
              </div>
            </button>
          </div>

          {/* Right-side quick controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Sequencer Studio pill */}
            <button
              id="nav-node-studio-btn"
              onClick={() => setActiveView('node-studio')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F3F5F8] hover:bg-[#071A3D] hover:text-white border border-[#C8CDD5] text-[#071A3D] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-[#F5C542]" />
              Sequencer Studio
            </button>

            {/* Wishlist */}
            <button
              id="wishlist-nav-btn"
              onClick={() => setActiveView('account')}
              className="relative p-2 rounded-xl text-[#071A3D] hover:bg-[#F3F5F8] border border-[#C8CDD5] transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-[#F5C542] text-[#041126] text-[9px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Subtotal badge */}
            <button
              id="cart-nav-btn"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] text-xs font-extrabold shadow-sm transition-all group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] text-[#041126]/80 font-bold hidden sm:inline">Cart</span>
                <span className="text-xs font-mono font-black">{formatPrice(cartSubtotal)}</span>
              </div>
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#041126] text-[#F5C542] text-[10px] font-black font-mono ml-0.5">
                {cartCount}
              </span>
            </button>

            {/* Account Menu */}
            <div className="relative">
              <button
                id="user-menu-btn"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#F3F5F8] hover:bg-white border border-[#C8CDD5] text-[#071A3D] text-xs transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071A3D] text-[#F5C542] flex items-center justify-center font-bold text-xs">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-[#041126] line-clamp-1">
                    {currentUser?.name || 'My Account'}
                  </div>
                  <div className="text-[9px] text-[#64748B] font-mono capitalize">
                    {currentUser?.role?.replace('_', ' ') || 'Customer'}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-[#64748B] hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 p-2 bg-[#FFFFFF] border border-[#C8CDD5] rounded-2xl shadow-2xl z-50 animate-in fade-in duration-150 text-[#071A3D]">
                  <div className="px-3 py-2 border-b border-[#C8CDD5]/60">
                    <p className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold">Signed in as</p>
                    <p className="text-xs font-bold text-[#041126] truncate">{currentUser?.email}</p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-[#F3F5F8] text-[#071A3D] border border-[#C8CDD5] font-mono font-bold">
                        {currentUser?.role?.replace('_', ' ')}
                      </span>
                      <span className="text-[#071A3D] font-mono font-bold">
                        Vault: Active ⚡
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      id="dropdown-storefront-btn"
                      onClick={() => {
                        setActiveView('shop');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#071A3D] hover:bg-[#F3F5F8] rounded-xl transition-colors font-semibold"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#071A3D]" />
                      <span>Storefront Catalog (/storefront)</span>
                    </button>

                    <button
                      id="dropdown-admin-panel-btn"
                      onClick={() => {
                        setActiveView('admin');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#041126] hover:bg-[#F3F5F8] rounded-xl font-bold transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Shield className="w-4 h-4 text-[#F5C542]" />
                        <span>Admin Panel (/adminpanel)</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#071A3D] text-[#F5C542]">
                        playbeat1122
                      </span>
                    </button>

                    <button
                      id="dropdown-account-btn"
                      onClick={() => {
                        setActiveView('account');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#071A3D] hover:bg-[#F3F5F8] rounded-xl transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#64748B]" />
                      Digital Keys Vault
                    </button>

                    <button
                      id="dropdown-support-btn"
                      onClick={() => {
                        setActiveView('support');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#071A3D] hover:bg-[#F3F5F8] rounded-xl transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-[#64748B]" />
                      Support Tickets & FAQ
                    </button>
                  </div>

                  <div className="pt-1 border-t border-[#C8CDD5]/60">
                    <button
                      id="dropdown-logout-btn"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-[#071A3D] hover:bg-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Nav Mega-Menu Strip (Desktop) */}
      <div className="hidden lg:block border-t border-[#C8CDD5] bg-[#F3F5F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-1 py-1">
              {/* Projectors Tab (Pinned Showcase) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('projectors')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('projectors')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'projectors'
                      ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 shadow-md'
                      : 'text-cyan-400 hover:text-cyan-300 hover:bg-slate-900/60'
                  }`}
                >
                  <Tv className="w-4 h-4 text-cyan-400" />
                  <span>Projectors</span>
                  <span className="px-1.5 py-0.2 text-[9px] rounded bg-cyan-900/80 text-cyan-300 font-extrabold ml-0.5 border border-cyan-700/50">
                    Smart 4K
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'projectors' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-3 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Magcubic & Smart Series
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openProductDetail('magcubic-hy300-pro')} className="hover:text-cyan-300 transition-colors text-left">
                            <span className="font-bold text-white block">Magcubic HY300 PRO</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Rs 24,750 • 200 ANSI</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openProductDetail('hy300-plus-projector')} className="hover:text-cyan-300 transition-colors text-left">
                            <span className="font-bold text-white block">HY300 Plus Projector</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Rs 24,750 • Electric Focus</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openProductDetail('magcubic-hy300pro-plus')} className="hover:text-cyan-300 transition-colors text-left">
                            <span className="font-bold text-white block">Magcubic HY300Pro Plus</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Rs 29,150 • 300 ANSI</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Full HD & Flagship Cinema
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openProductDetail('ht23-smart-projector')} className="hover:text-cyan-300 transition-colors text-left">
                            <span className="font-bold text-white block">HT23 Smart Cinema</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Rs 29,150 • Motorized Focus</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openProductDetail('hcs350pro-smart-projector')} className="hover:text-cyan-300 transition-colors text-left">
                            <span className="font-bold text-white block">HCS350PRO Full HD 1080P</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Rs 37,950 • 450 ANSI</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openProductDetail('hm103-a-smart-projector')} className="hover:text-cyan-300 transition-colors text-left">
                            <span className="font-bold text-white block">HM103-A Amlogic 500 ANSI</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Rs 42,900 • Auto Keystone</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                          Rechargeable & Gaming
                        </span>
                        <p className="text-xs font-bold text-white">HY7 Battery & HCS350-Pro Retro</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Cordless battery cinema and 10,000+ arcade titles with 2x wireless controllers.
                        </p>
                      </div>
                      <button
                        onClick={() => openCategory('projectors')}
                        className="mt-3 w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold text-center transition-all"
                      >
                        Browse All Projectors (8)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Games Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('games')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('games')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'games'
                      ? 'text-cyan-300 bg-slate-800/80 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                  <span>Games</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'games' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Top Categories
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Steam Global Keys
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Epic Games Codes
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            In-Game Currency & Gold
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Season Passes & DLCs
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        By Platform
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Steam PC
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Xbox Series X/S & One
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            PlayStation 4 & 5
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Nintendo Switch & Epic
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        By Genre
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Action & Souls-like
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Open World & RPGs
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Sports & FC 25
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="hover:text-cyan-300 transition-colors">
                            Multiplayer & Co-op
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-rose-950 text-rose-300 border border-rose-800 inline-block mb-1.5">
                        Cheap Games
                      </span>
                      <p className="text-xs font-bold text-white mb-2">Budget Gaming Vault</p>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('games')} className="text-cyan-300 hover:underline">
                            Under $10 Specials →
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="text-cyan-300 hover:underline">
                            Under $20 Blockbusters →
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('games')} className="text-amber-300 hover:underline font-semibold">
                            Top 10 Best Sellers →
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Software Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('software')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('software')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'software'
                      ? 'text-cyan-300 bg-slate-800/80 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>Software</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'software' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Office & Productivity
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Microsoft Office 2024 Pro
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Office 365 Lifetime Slots
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            PDF Expert & Editors
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Design & Creativity
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Adobe Creative Cloud All Apps
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Figma Enterprise & Teams
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            FuseLab UI/UX Design System
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        VPN & Security
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            NordVPN 2-Year Ultimate
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Surfshark & ExpressVPN
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Kaspersky & Bitdefender
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        OS & Developer Tools
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Windows 11 Pro Retail Key
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            JetBrains All Products Pack
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('software')} className="hover:text-cyan-300 transition-colors">
                            Visual Studio Enterprise
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Tools Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('ai-tools')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('ai-tools')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'ai-tools'
                      ? 'text-cyan-300 bg-slate-800/80 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>AI Tools</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'ai-tools' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Chatbots & LLMs
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            ChatGPT Plus & o1
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Claude 3.5 Sonnet Pro
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Google Gemini Advanced
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Image & Video AI
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Midjourney v6 Pro Fast GPU
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Runway Gen-3 Alpha Video
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            FLUX.1 Pro & Stable Diffusion
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Coding AI
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Cursor AI Pro Code Editor
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            GitHub Copilot 1-Year Pass
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Replit Core & Devin Assistant
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Writing & Agents
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Notion AI Unlimited
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            ElevenLabs Voice Studio
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('ai-tools')} className="hover:text-cyan-300 transition-colors">
                            Jasper & Grammarly Premium
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Subscriptions Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('subscriptions')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('subscriptions')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'subscriptions'
                      ? 'text-cyan-300 bg-slate-800/80 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Tv className="w-4 h-4 text-cyan-400" />
                  <span>Subscriptions</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'subscriptions' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Streaming Media
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            Netflix Premium 4K UHD
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            Spotify Premium 6M/1Y
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            YouTube Premium 1-Year
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            Disney+ & Crunchyroll Pass
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Gaming Passes
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            Xbox Game Pass Ultimate
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            PlayStation Plus Deluxe
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            EA Play Pro & Ubisoft+
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Cloud & Storage
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            Google One 2TB Storage
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            iCloud+ Family Slots
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('subscriptions')} className="hover:text-cyan-300 transition-colors">
                            Dropbox & OneDrive Pro
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-indigo-950 text-indigo-300 border border-indigo-800 inline-block mb-1.5">
                        Masterpass
                      </span>
                      <p className="text-xs font-bold text-white mb-2">Streaming Trio Pack</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        Netflix 4K + Spotify + YouTube Premium bundled at 70% off.
                      </p>
                      <button
                        onClick={() => openCategory('bundles')}
                        className="text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
                      >
                        Explore Masterpass <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Gift Cards Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('gift-cards')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('gift-cards')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'gift-cards'
                      ? 'text-cyan-300 bg-slate-800/80 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Gift className="w-4 h-4 text-cyan-400" />
                  <span>Gift Cards</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'gift-cards' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        By Brand
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Steam Wallet Vouchers
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Apple & iTunes Store Cards
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Google Play Store
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Amazon eGift Vouchers
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Gaming Credits
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            PlayStation Network (PSN)
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Xbox Live Gift Cards
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Razer Gold Global
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Roblox & Riot Points
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        By Region
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Global (Worldwide)
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            United States (USD)
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            Europe (EUR)
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            United Kingdom (GBP)
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        By Value
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            $10 / $20 Starter Cards
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors">
                            $50 Standard Vouchers
                          </button>
                        </li>
                        <li>
                          <button onClick={() => openCategory('gift-cards')} className="hover:text-cyan-300 transition-colors font-bold text-amber-300">
                            $100 VIP Vault Codes
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Bundles Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('bundles')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('bundles')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'bundles'
                      ? 'text-cyan-300 bg-slate-800/80 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>Bundles</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'bundles' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        AI Creator Suite
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">
                        ChatGPT Plus + Midjourney v6 + Runway Gen-3
                      </p>
                      <button
                        onClick={() => openCategory('bundles')}
                        className="text-xs text-cyan-300 font-bold hover:underline"
                      >
                        View AI Bundle (Save 60%) →
                      </button>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Streaming Masterpass
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">
                        Netflix 4K UHD + Spotify + YouTube 1-Year
                      </p>
                      <button
                        onClick={() => openCategory('bundles')}
                        className="text-xs text-cyan-300 font-bold hover:underline"
                      >
                        View Streaming Bundle →
                      </button>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Developer Power-Pack
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">
                        JetBrains All IDEs + Win 11 Pro + Cursor AI
                      </p>
                      <button
                        onClick={() => openCategory('bundles')}
                        className="text-xs text-cyan-300 font-bold hover:underline"
                      >
                        View Dev Stack Pack →
                      </button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-950/80 to-indigo-950/80 p-3.5 rounded-xl border border-blue-800/80">
                      <p className="text-xs font-bold text-white mb-1">Custom Bundle Builder</p>
                      <p className="text-[11px] text-blue-200 leading-relaxed mb-3">
                        Select any 3 items across the store and get an automatic 20% bundle discount.
                      </p>
                      <button
                        onClick={() => openCategory('bundles')}
                        className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                      >
                        Build Your Bundle
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Free Tools Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterMega('free-tools')}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  onClick={() => openCategory('free-tools')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMegaMenu === 'free-tools'
                      ? 'text-emerald-300 bg-slate-800/80 shadow-md'
                      : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-900/60'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Free Tools</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {activeMegaMenu === 'free-tools' && (
                  <div className="absolute top-full left-0 w-[780px] p-5 bg-[#090d1a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-4 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-emerald-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        Local LLM Runner
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">
                        Offline AI prompt studio for Ollama, LM Studio & HuggingFace.
                      </p>
                      <button
                        onClick={() => openCategory('free-tools')}
                        className="text-xs text-emerald-400 font-bold hover:underline"
                      >
                        Run Local LLM Studio →
                      </button>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-emerald-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        256-Bit Vault Key Gen
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">
                        Quantum entropy passwords & license validation masks.
                      </p>
                      <button
                        onClick={() => openCategory('free-tools')}
                        className="text-xs text-emerald-400 font-bold hover:underline"
                      >
                        Generate Safe Keys →
                      </button>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase text-emerald-400 tracking-wider mb-2.5 pb-1 border-b border-slate-800">
                        AI SEO Schema Builder
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">
                        JSON-LD rich snippets & OpenGraph social card creator.
                      </p>
                      <button
                        onClick={() => openCategory('free-tools')}
                        className="text-xs text-emerald-400 font-bold hover:underline"
                      >
                        Build SEO Schema →
                      </button>
                    </div>

                    <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-800/60">
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-emerald-500 text-slate-950 inline-block mb-1.5">
                        100% Free
                      </span>
                      <p className="text-xs font-bold text-white mb-1">Open Source Hub</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        No credit card, account, or telemetry required.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Services & Business Solutions Tab */}
              <div>
                <button
                  onClick={() => setActiveView('services')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FF6B6B] hover:text-white hover:bg-slate-900/60 transition-all"
                >
                  <Briefcase className="w-4 h-4 text-[#FF6B6B]" />
                  <span>Services</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] font-mono">B2B</span>
                </button>
              </div>
            </div>

            {/* Quick Flash Deal indicator */}
            <button
              onClick={() => setActiveView('shop')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/60 transition-all hover:bg-rose-950/80"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              Flash Deals (-70%)
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden py-4 px-4 border-t border-slate-800 bg-[#070a14] flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                openCategory('projectors');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-cyan-950/60 rounded-xl text-left border border-cyan-500/40 col-span-2 sm:col-span-1"
            >
              <Tv className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Projectors</span>
                <span className="text-[9px] bg-cyan-900/80 text-cyan-300 px-1 py-0.2 rounded font-extrabold border border-cyan-700/50">Smart Cinema</span>
              </div>
              <div className="text-[10px] text-cyan-300">8 Cinema Models</div>
            </button>
            <button
              onClick={() => {
                openCategory('games');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 rounded-xl text-left border border-slate-800"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white">Games</div>
              <div className="text-[10px] text-slate-400">Steam, Epic, Xbox</div>
            </button>
            <button
              onClick={() => {
                openCategory('software');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 rounded-xl text-left border border-slate-800"
            >
              <Laptop className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white">Software</div>
              <div className="text-[10px] text-slate-400">Office, Windows, Dev</div>
            </button>
            <button
              onClick={() => {
                openCategory('ai-tools');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 rounded-xl text-left border border-slate-800"
            >
              <Cpu className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white">AI Tools</div>
              <div className="text-[10px] text-slate-400">ChatGPT, Midjourney</div>
            </button>
            <button
              onClick={() => {
                openCategory('subscriptions');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 rounded-xl text-left border border-slate-800"
            >
              <Tv className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white">Subscriptions</div>
              <div className="text-[10px] text-slate-400">Netflix, Spotify, YT</div>
            </button>
            <button
              onClick={() => {
                openCategory('gift-cards');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 rounded-xl text-left border border-slate-800"
            >
              <Gift className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white">Gift Cards</div>
              <div className="text-[10px] text-slate-400">Steam, Apple, Amazon</div>
            </button>
            <button
              onClick={() => {
                openCategory('bundles');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 rounded-xl text-left border border-slate-800"
            >
              <Package className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs font-bold text-white">Bundles</div>
              <div className="text-[10px] text-slate-400">Save up to 60%</div>
            </button>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <button
              onClick={() => {
                setActiveView('services');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-bold uppercase text-[#FF6B6B] bg-[#232131] border border-[#FF6B6B]/40 rounded-xl flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#FF6B6B]" /> Services & Turnkey Solutions
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF6B6B]/20 text-[#FF6B6B]">B2B</span>
            </button>
            <button
              onClick={() => {
                setActiveView('node-studio');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-bold uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 rounded-xl flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" /> Node Studio
            </button>
            <button
              onClick={() => {
                setActiveView('shop');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl"
            >
              All Products Catalog
            </button>
            <button
              onClick={() => {
                setActiveView('account');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl"
            >
              My Vault & Orders
            </button>
            <button
              onClick={() => {
                setActiveView('support');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl"
            >
              Support Helpdesk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
