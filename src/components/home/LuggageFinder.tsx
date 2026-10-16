import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Compass, CheckCircle2, ArrowRight, Plane, Briefcase, Calendar, Shield } from 'lucide-react';

interface QuizOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const DURATION_OPTIONS: QuizOption[] = [
  {
    id: 'weekend',
    label: 'Fin de semana',
    description: '2 a 4 días · Equipaje de mano sin facturar',
    icon: 'Plane'
  },
  {
    id: 'medium',
    label: '1 a 2 semanas',
    description: '5 a 14 días · Capacidad equilibrada y expandible',
    icon: 'Calendar'
  },
  {
    id: 'long',
    label: 'Larga estancia',
    description: '+15 días · Máximo volumen y protección en bodega',
    icon: 'Briefcase'
  },
  {
    id: 'business',
    label: 'Viaje de negocios',
    description: '1 a 3 días · Foco en laptop, documentos y agilidad',
    icon: 'Shield'
  }
];

const PREFERENCE_OPTIONS: QuizOption[] = [
  {
    id: 'hardshell',
    label: 'Rigidez y máxima protección',
    description: 'Policarbonato Makrolon® indeformable y candado TSA',
    icon: 'Shield'
  },
  {
    id: 'lightweight',
    label: 'Mochila técnica & agilidad',
    description: 'Bolsillo tech para laptop y paso rápido por seguridad',
    icon: 'Plane'
  },
  {
    id: 'heritage',
    label: 'Elegancia en lona y cuero',
    description: 'Lona encerada y cuero genuino para viajes de fin de semana',
    icon: 'Briefcase'
  },
  {
    id: 'family',
    label: 'Juego completo combinado',
    description: 'Set de 3 maletas anidadas para toda la familia',
    icon: 'Calendar'
  }
];

export const LuggageFinder: React.FC = () => {
  const { products, setSelectedProduct, addToCart, config } = useStore();
  const [selectedDuration, setSelectedDuration] = useState<string>('weekend');
  const [selectedPreference, setSelectedPreference] = useState<string>('hardshell');

  // Match optimal product based on choice
  const matchedProduct = React.useMemo(() => {
    if (selectedDuration === 'business') {
      return products.find(p => p.id === 'prod-mochilas-01') || products[0];
    }
    if (selectedPreference === 'family') {
      return products.find(p => p.id === 'prod-juegos-01') || products[0];
    }
    if (selectedPreference === 'heritage') {
      return products.find(p => p.id === 'prod-bolsos-01') || products[0];
    }
    if (selectedPreference === 'lightweight') {
      return products.find(p => p.id === 'prod-mochilas-01') || products[0];
    }
    if (selectedDuration === 'long') {
      return products.find(p => p.id === 'prod-grande-01') || products[0];
    }
    if (selectedDuration === 'medium') {
      return products.find(p => p.id === 'prod-mediana-01') || products[0];
    }
    return products.find(p => p.id === 'prod-cabina-01') || products[0];
  }, [products, selectedDuration, selectedPreference]);

  return (
    <section id="equipaje-ideal" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-sky-800 rounded-md text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#0080FF]" />
            <span>Guía de Elección de Equipaje</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display [text-wrap:balance]">
            Encuentra el equipaje ideal para tu próximo viaje
          </h2>
          <p className="text-base text-slate-600 mt-2.5 font-normal">
            Selecciona la duración de tu escapada y tu prioridad para descubrir la recomendación precisa según tus necesidades.
          </p>
        </div>

        {/* Finder Grid: Quiz Controls on Left, Live Recommendation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Duration */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3.5">
                1. ¿Cuánto tiempo durará tu viaje?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DURATION_OPTIONS.map((opt) => {
                  const isActive = selectedDuration === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedDuration(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 text-xs cursor-pointer ${
                        isActive
                          ? 'border-[#0080FF] bg-sky-50/60 ring-2 ring-[#0080FF]/25 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-bold text-sm ${isActive ? 'text-[#0080FF]' : 'text-slate-900'}`}>
                          {opt.label}
                        </span>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-[#0080FF]" />}
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{opt.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Preference */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3.5">
                2. ¿Cuál es tu prioridad principal?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PREFERENCE_OPTIONS.map((opt) => {
                  const isActive = selectedPreference === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedPreference(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 text-xs cursor-pointer ${
                        isActive
                          ? 'border-[#0080FF] bg-sky-50/60 ring-2 ring-[#0080FF]/25 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-bold text-sm ${isActive ? 'text-[#0080FF]' : 'text-slate-900'}`}>
                          {opt.label}
                        </span>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-[#0080FF]" />}
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{opt.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Recommendation Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-md flex-1 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5">
                  <span className="font-bold text-[#0080FF] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md text-[11px] tracking-wide uppercase">
                    Modelo Recomendado
                  </span>
                  <span className="font-semibold text-slate-700">{matchedProduct.categoryName}</span>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-4 border border-slate-200 p-2 group">
                  <img
                    src={matchedProduct.images[0]}
                    alt={matchedProduct.name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {matchedProduct.badge && (
                    <span className="absolute top-3 left-3 bg-[#0080FF] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {matchedProduct.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-950 font-display">
                  {matchedProduct.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {matchedProduct.shortDescription}
                </p>

                {/* Specific Specs */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                  {matchedProduct.dimensions && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Medidas</span>
                      <span className="font-bold text-slate-800">{matchedProduct.dimensions}</span>
                    </div>
                  )}
                  {matchedProduct.volume && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Volumen</span>
                      <span className="font-bold text-slate-800">{matchedProduct.volume}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#0080FF] font-mono-num">
                    {config.currencySymbol}{matchedProduct.price}
                  </span>
                  {matchedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono-num">
                      {config.currencySymbol}{matchedProduct.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedProduct(matchedProduct)}
                  className="flex-1 py-3 px-4 bg-[#0080FF] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#006ee0] hover:-translate-y-0.5 active:scale-95 transition-all text-center cursor-pointer"
                >
                  Ver especificación
                </button>
                <button
                  onClick={() => addToCart(matchedProduct)}
                  className="py-3 px-4 bg-slate-100 hover:bg-sky-50 hover:text-[#0080FF] hover:border-sky-300 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all text-center cursor-pointer active:scale-95"
                >
                  Añadir a mi maleta
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
