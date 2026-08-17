import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  User,
  Key,
  ArrowRight,
  Sparkles,
  Globe,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sliders,
  Radio,
} from 'lucide-react';

export const WPAdminLoginView: React.FC = () => {
  const { setCurrentUser, setActiveView, showToast, refreshData } = useApp();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('playbeat123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/wp-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCurrentUser(data.user);
        setSuccessMsg('Verification confirmed. Loading PlayBeat Admin Dashboard...');
        showToast('Authenticated as Super Admin (playbeat123) ⚡', 'success');
        await refreshData();
        setTimeout(() => {
          setActiveView('admin');
        }, 600);
      } else {
        setErrorMsg(data.message || 'Invalid username or password. (Hint: admin / playbeat123)');
        showToast('Login failed', 'error');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdminLogin = () => {
    setUsername('admin');
    setPassword('playbeat123');
    setTimeout(() => {
      handleLogin();
    }, 100);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-[#050508]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#1e1b4b_0%,transparent_60%)] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Simulated URL Header Pill */}
      <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono backdrop-blur-md shadow-lg">
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-slate-400">Target Gateway:</span>
        <span className="text-cyan-300 font-bold">http://playbeat.digital/wp-admin</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
      </div>

      {/* Main Login Box */}
      <div className="w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.4)] mb-4">
            <div className="w-7 h-7 bg-white rounded-xs rotate-45 flex items-center justify-center">
              <span className="text-black font-black text-xs -rotate-45">W</span>
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>PLAYBEAT</span>
            <span className="text-cyan-400">ADMIN</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            WordPress & Digital Keys Administration Gateway
          </p>
        </div>

        {/* Credentials Notice Pill */}
        <div className="mb-6 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-400/30 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Configured Admin Credentials</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-[10px] font-mono font-bold">
              READY
            </span>
          </div>
          <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-1 font-mono">
            <div>
              User: <span className="text-white font-semibold">admin</span>
            </div>
            <div>
              Pass: <span className="text-cyan-300 font-semibold">playbeat123</span>
            </div>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-300 mb-1.5">
              Username or Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type="text"
                id="wp-admin-username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin or email"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-300">
                Password
              </label>
              <span className="text-[10px] text-cyan-400 font-mono">playbeat123</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="wp-admin-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-0"
              />
              <span>Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => showToast('Password reset link dispatched to admin@playbeat.digital', 'info')}
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Lost your password?
            </button>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            id="wp-admin-submit-btn"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>Log In (playbeat123)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Instant 1-Click Login Button */}
          <button
            type="button"
            id="wp-admin-instant-btn"
            onClick={handleQuickAdminLogin}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>One-Click Instant Super Admin Login</span>
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setActiveView('home')}
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            ← Go to PlayBeat Storefront
          </button>
          <button
            onClick={() => setActiveView('node-studio')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Radio className="w-3 h-3 text-cyan-400" /> Node Studio
          </button>
        </div>
      </div>
    </div>
  );
};
