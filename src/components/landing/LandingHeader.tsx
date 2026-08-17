import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Shield,
  Layers,
  Zap,
  Globe,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

interface LandingHeaderProps {
  onOpenGetStarted: () => void;
  onOpenSignIn: () => void;
  onOpenContact: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onOpenGetStarted,
  onOpenSignIn,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for nav highlight
      const sections = ['home', 'solutions', 'features', 'how-it-works', 'pricing', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="landing-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#C8CDD5]/60 shadow-[0_4px_20px_-4px_rgba(7,26,61,0.06)] py-3'
          : 'bg-[#FFFFFF] border-b border-[#C8CDD5]/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#C8CDD5]/50 flex items-center justify-center relative overflow-hidden group shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#071A3D] to-[#041126]" />
              <div className="relative z-10 flex items-center justify-center">
                <span className="text-white text-xs font-bold font-mono">▲</span>
                <span className="w-2 h-2 rounded-full bg-[#F5C542] ml-0.5 animate-pulse shadow-[0_0_8px_#F5C542]" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-[#041126] uppercase flex items-center gap-1.5">
                PlayBeat <span className="text-[#071A3D] font-bold">Digital</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#64748B]">
                Enterprise Technology
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F3F5F8] px-3 py-1.5 rounded-full border border-[#C8CDD5]/60 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#071A3D] text-white shadow-sm'
                      : 'text-[#071A3D] hover:text-[#041126] hover:bg-white/80'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5C542] translate-y-1/2" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSignIn}
              id="header-signin-btn"
              className="px-4 py-2 text-xs font-bold text-[#071A3D] hover:text-[#041126] hover:bg-[#F3F5F8] rounded-xl transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={onOpenGetStarted}
              id="header-get-started-btn"
              className="px-5 py-2.5 bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] font-extrabold text-xs tracking-wide uppercase rounded-xl transition-all shadow-[0_4px_14px_rgba(245,197,66,0.35)] hover:shadow-[0_6px_20px_rgba(245,197,66,0.45)] hover:-translate-y-0.5 flex items-center gap-2 group active:translate-y-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenGetStarted}
              className="px-3 py-1.5 bg-[#F5C542] text-[#041126] font-bold text-xs rounded-lg"
            >
              Start
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F3F5F8] text-[#071A3D] border border-[#C8CDD5]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFFFFF] border-b border-[#C8CDD5] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#071A3D] text-white'
                    : 'text-[#071A3D] hover:bg-[#F3F5F8]'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[#F5C542]" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#C8CDD5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignIn();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-[#071A3D] bg-[#F3F5F8] border border-[#C8CDD5] rounded-xl"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-3 text-center text-xs font-extrabold uppercase tracking-wide bg-[#F5C542] text-[#041126] rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
