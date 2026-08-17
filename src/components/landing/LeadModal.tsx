import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Send,
  Building,
} from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSolution?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  initialSolution = 'Enterprise Digital Suite',
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [solutionType, setSolutionType] = useState(initialSolution);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief API lead processing
    await new Promise((res) => setTimeout(res, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setWorkEmail('');
    setCompanyName('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041126]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl border-2 border-[#C8CDD5] shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] flex items-center justify-center text-[#071A3D] hover:bg-[#071A3D] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F3F5F8] border-2 border-[#F5C542] text-[#071A3D] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9 text-[#F5C542]" />
            </div>

            <h3 className="text-2xl font-extrabold text-[#041126]">
              Request Received!
            </h3>

            <p className="text-sm text-[#475569] leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-bold text-[#041126]">{fullName || 'there'}</span>. A Senior Solution Architect will contact your team at <span className="font-bold text-[#071A3D]">{workEmail}</span> within 15 minutes.
            </p>

            <div className="p-4 rounded-2xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#071A3D] space-y-2">
              <span className="font-bold block uppercase tracking-wider text-[10px] text-[#64748B]">
                Immediate Assistance:
              </span>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://wa.me/923321029333"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#25D366] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> WhatsApp: +923321029333
                </a>
                <span>•</span>
                <a
                  href="mailto:support@playbeat.digital"
                  className="font-bold text-[#071A3D] hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" /> support@playbeat.digital
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#071A3D] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#041126] transition-colors"
              >
                Back to Overview
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] text-[10px] font-mono font-bold text-[#071A3D] uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
                Get Started
              </div>
              <h3 className="text-2xl font-extrabold text-[#041126] tracking-tight">
                Launch Your Digital Solution
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                Fill in your details below to activate immediate trial access and custom onboarding.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#041126] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#041126] mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#041126] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Apex Global Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#041126] mb-1">
                  Target Solution Tier
                </label>
                <select
                  value={solutionType}
                  onChange={(e) => setSolutionType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium"
                >
                  <option value="Business Solutions">Business Solutions (Operations)</option>
                  <option value="Digital Solutions">Digital Solutions (Customer Experience)</option>
                  <option value="Enterprise Solutions">Enterprise Solutions (Scale & Resilience)</option>
                  <option value="Starter Plan">Starter Plan ($39/mo)</option>
                  <option value="Professional Plan">Professional Plan ($119/mo)</option>
                  <option value="Custom Enterprise">Custom Enterprise Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#041126] mb-1">
                  Project Notes or Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your team size, expected throughput, or deployment timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium resize-none"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#F5C542] hover:bg-[#DFAF2B] text-[#041126] font-extrabold text-xs uppercase tracking-wide rounded-xl transition-all shadow-[0_4px_14px_rgba(245,197,66,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Connecting to Provisioning Node...</span>
                ) : (
                  <>
                    <span>Submit & Launch Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Footer note */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#071A3D]" />
              <span>Zero obligation • 256-bit encrypted data protection</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
