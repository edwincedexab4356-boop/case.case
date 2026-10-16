import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { config } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!config.showAnnouncement || dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#032d47] via-[#0369a1] to-[#0c4a6e] text-white text-xs font-medium py-2 px-4 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6" /> {/* spacer for balance */}
        <div className="flex items-center gap-3 text-center truncate">
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-sky-400/20 text-sky-200 border border-sky-400/30 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
            <span>Garantía Oficial</span>
          </span>
          <span className="hidden sm:inline text-sky-300/60">/</span>
          <p className="truncate tracking-wide font-normal text-sky-50">
            {config.announcementText}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-sky-200 hover:text-white p-1 rounded transition-colors hover:bg-white/10"
          aria-label="Cerrar anuncio"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
