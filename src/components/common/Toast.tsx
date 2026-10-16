import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className="bg-slate-950/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_35px_rgba(2,132,199,0.35)] border border-sky-400/30 flex items-center gap-3 text-xs font-semibold">
        <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-sky-400" />
        </div>
        <span className="tracking-wide text-slate-100">{toastMessage}</span>
      </div>
    </div>
  );
};
