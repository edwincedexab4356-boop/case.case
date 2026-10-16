import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className="bg-[#0B192C] text-white px-5 py-3.5 rounded-xl shadow-xl border border-sky-500/40 flex items-center gap-3 text-xs font-semibold">
        <div className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <span className="tracking-wide text-slate-100">{toastMessage}</span>
      </div>
    </div>
  );
};
