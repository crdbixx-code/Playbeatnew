import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, Shield, Key } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Quick client credential simulation or admin shortcut
    await new Promise((res) => setTimeout(res, 500));
    setIsLoading(false);
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041126]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFFFF] rounded-3xl border-2 border-[#C8CDD5] shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3F5F8] border border-[#C8CDD5] flex items-center justify-center text-[#071A3D] hover:bg-[#071A3D] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <form onSubmit={handleSignIn} className="space-y-4">
          
          <div className="space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#071A3D] border border-[#C8CDD5] flex items-center justify-center text-[#F5C542] mb-3 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#041126] tracking-tight">
              Enterprise Sign In
            </h3>
            <p className="text-xs text-[#64748B]">
              Access your digital license vault, telemetry analytics, and node clusters.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#041126] mb-1">
                Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@playbeat.digital"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#041126]">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] font-bold text-[#071A3D] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F3F5F8] border border-[#C8CDD5] text-xs text-[#041126] focus:outline-none focus:border-[#071A3D] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#071A3D] hover:bg-[#041126] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4 text-[#F5C542]" />
                </>
              )}
            </button>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-[#64748B]">
              Need access?{' '}
              <button
                type="button"
                onClick={onClose}
                className="font-bold text-[#071A3D] hover:underline"
              >
                Request Enterprise Credentials
              </button>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
