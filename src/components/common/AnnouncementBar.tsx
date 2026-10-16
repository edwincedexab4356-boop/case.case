import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { config } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!config.showAnnouncement || dismissed) return null;

  return (
    <div className="relative bg-[#0B1E38] text-white text-xs font-medium py-2 px-4 border-b border-sky-900/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6" /> {/* spacer for balance */}
        <div className="flex items-center gap-3 text-center truncate">
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Garantía Oficial</span>
          </span>
          <span className="hidden sm:inline text-sky-400/40">/</span>
          <p className="truncate tracking-wide font-normal text-slate-100">
            {config.announcementText}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-sky-300 hover:text-white p-1 rounded transition-colors hover:bg-white/10 cursor-pointer"
          aria-label="Cerrar anuncio"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
