import React, { useState } from 'react';
import { LandingHeader } from '../components/landing/LandingHeader';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustSection } from '../components/landing/TrustSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { SolutionsSection } from '../components/landing/SolutionsSection';
import { WhyChooseUsSection } from '../components/landing/WhyChooseUsSection';
import { StatisticsSection } from '../components/landing/StatisticsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { PricingSection } from '../components/landing/PricingSection';
import { PremiumCTASection } from '../components/landing/PremiumCTASection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { FinalCTABanner } from '../components/landing/FinalCTABanner';
import { LandingFooter } from '../components/landing/LandingFooter';
import { LeadModal } from '../components/landing/LeadModal';
import { SignInModal } from '../components/landing/SignInModal';

export const LandingPageView: React.FC = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [selectedSolutionForLead, setSelectedSolutionForLead] = useState('Enterprise Digital Suite');

  const handleOpenLeadModal = (solutionName: string = 'Enterprise Digital Suite') => {
    setSelectedSolutionForLead(solutionName);
    setIsLeadModalOpen(true);
  };

  const handleExploreSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleDiscoverMore = () => {
    const el = document.getElementById('features');
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#071A3D] flex flex-col selection:bg-[#F5C542] selection:text-[#041126] font-sans relative antialiased">
      
      {/* 1. STICKY HEADER */}
      <LandingHeader
        onOpenGetStarted={() => handleOpenLeadModal('General Enterprise Inquiry')}
        onOpenSignIn={() => setIsSignInModalOpen(true)}
        onOpenContact={() => handleOpenLeadModal('Contact Sales Team')}
      />

      {/* MAIN BODY FLOW */}
      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <HeroSection
          onGetStarted={() => handleOpenLeadModal('Hero CTA Launch')}
          onExploreSolutions={handleExploreSolutions}
        />

        {/* 3. TRUST SECTION */}
        <TrustSection />

        {/* 4. FEATURES SECTION */}
        <FeaturesSection
          onLearnMore={(title) => handleOpenLeadModal(`Feature Inquiry: ${title}`)}
        />

        {/* 5. SOLUTIONS SECTION (Navy Blue Full-Width) */}
        <SolutionsSection
          onSelectSolution={(sol) => handleOpenLeadModal(`Solution: ${sol}`)}
        />

        {/* 6. WHY CHOOSE US (Split Screen) */}
        <WhyChooseUsSection
          onDiscoverMore={handleDiscoverMore}
        />

        {/* 7. STATISTICS SECTION (Large Numbers) */}
        <StatisticsSection />

        {/* 8. HOW IT WORKS (4-Step Horizontal Process) */}
        <HowItWorksSection
          onStepClick={(step) => handleOpenLeadModal(`Step ${step} Onboarding`)}
        />

        {/* 9. PRICING SECTION */}
        <PricingSection
          onSelectPlan={(plan) => handleOpenLeadModal(`Plan Selected: ${plan}`)}
        />

        {/* 10. PREMIUM CTA SECTION (Dramatic Navy with Glow) */}
        <PremiumCTASection
          onGetStartedToday={() => handleOpenLeadModal('CTA Banner Conversion')}
          onTalkToTeam={() => handleOpenLeadModal('Sales Team Consultation')}
        />

        {/* 11. TESTIMONIALS */}
        <TestimonialsSection />

        {/* 12. FAQ (Expandable Accordion) */}
        <FAQSection />

        {/* 13. FINAL CTA BANNER */}
        <FinalCTABanner
          onGetStarted={() => handleOpenLeadModal('Final Banner Action')}
        />
      </main>

      {/* 14. FOOTER (Dark Navy) */}
      <LandingFooter
        onNavigateToSection={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenContact={() => handleOpenLeadModal('Footer Contact Link')}
      />

      {/* INTERACTIVE MODALS */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialSolution={selectedSolutionForLead}
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSuccess={() => {
          // Toast or direct redirect
          setIsSignInModalOpen(false);
        }}
      />

    </div>
  );
};
