import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-800/80 bg-slate-900/95 text-slate-100 shadow-emerald-950/50',
    error: 'border-rose-800/80 bg-slate-900/95 text-slate-100 shadow-rose-950/50',
    info: 'border-cyan-800/80 bg-slate-900/95 text-slate-100 shadow-cyan-950/50',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md text-xs font-medium max-w-sm ${
          borders[toast.type || 'info']
        }`}
      >
        {icons[toast.type || 'info']}
        <p className="leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};

export const ToastContainer = Toast;
