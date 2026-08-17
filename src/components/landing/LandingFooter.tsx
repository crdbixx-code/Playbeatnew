import React from 'react';
import {
  Mail,
  Phone,
  ArrowUpRight,
  Shield,
  CheckCircle2,
  Globe,
} from 'lucide-react';

interface LandingFooterProps {
  onNavigateToSection?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onNavigateToSection,
  onOpenContact,
}) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#041126] text-white border-t border-[#C8CDD5]/20 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand summary & Direct support channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#C8CDD5]/20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] border border-[#C8CDD5]/40 flex items-center justify-center relative overflow-hidden shadow-md">
                <span className="text-white text-xs font-bold font-mono">▲</span>
                <span className="w-2 h-2 rounded-full bg-[#F5C542] ml-0.5 shadow-[0_0_8px_#F5C542]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                PlayBeat <span className="text-[#C8CDD5]">Digital</span>
              </span>
            </div>

            <p className="text-xs text-[#C8CDD5] leading-relaxed max-w-sm font-normal">
              Next-generation enterprise technology powering scalable, intelligent and secure digital ecosystems worldwide.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs">
              <a
                href="mailto:support@playbeat.digital"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#071A3D] border border-[#C8CDD5]/30 hover:border-[#F5C542] text-[#C8CDD5] hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F5C542]" />
                <span>support@playbeat.digital</span>
              </a>

              <a
                href="https://wa.me/923321029333"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#071A3D] border border-[#C8CDD5]/30 hover:border-[#25D366] text-[#C8CDD5] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: +923321029333</span>
              </a>
            </div>
          </div>

          {/* 4 Categorized Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1: Company */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C542] font-mono">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-[#C8CDD5]">
                <li>
                  <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                    Contact
                  </button>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C542] font-mono">
                Solutions
              </h4>
              <ul className="space-y-2 text-xs text-[#C8CDD5]">
                <li>
                  <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors cursor-pointer">
                    Business Solutions
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors cursor-pointer">
                    Digital Solutions
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors cursor-pointer">
                    Enterprise Solutions
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors cursor-pointer">
                    Technology
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C542] font-mono">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-[#C8CDD5]">
                <li>
                  <a href="#faq" onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="mailto:support@playbeat.digital" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                    FAQs
                  </button>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C542] font-mono">
                Connect
              </h4>
              <ul className="space-y-2 text-xs text-[#C8CDD5]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C8CDD5]">
          <p>© 2026 PlayBeat Digital. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
