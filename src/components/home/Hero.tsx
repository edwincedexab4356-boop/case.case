import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Compass, PlaneTakeoff, RotateCcw } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCategory } = useStore();

  const handleExplore = () => {
    setCategory('todas');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeals = () => {
    setCategory('ofertas');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      
      {/* Crisp subtle geometric hairline accent (NO blurry diffuse AI blobs) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0080ff08_1px,transparent_1px),linear-gradient(to_bottom,#0080ff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Main 2-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Clean, sharp kicker badge without sparkles */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-300 rounded-md w-fit mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0080FF]" />
              <span className="text-xs font-bold text-sky-900 tracking-wider uppercase">Colección Oficial 2026</span>
              <span className="text-sky-300">/</span>
              <span className="text-xs font-medium text-sky-700">Ingeniería para Viajeros</span>
            </div>

            {/* Headline with high contrast & logo royal blue highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-display leading-[1.08] mb-6 [text-wrap:balance]">
              Tu próximo destino{' '}
              <span className="text-[#0080FF]">
                comienza aquí
              </span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-9 font-normal">
              Descubre maletas, mochilas y accesorios diseñados para acompañarte en cada aventura. Estructura de policarbonato Makrolon®, ruedas ultrasilenciosas Hinomoto 360° y compartimentos de acceso inmediato.
            </p>

            {/* Functional CTAs with enhanced tactile transitions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={handleExplore}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#0080FF] hover:bg-[#006ee0] active:scale-95 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-sky-500/25 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Explorar colección</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={handleDeals}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-300 text-slate-800 hover:border-[#0080FF] hover:text-[#0080FF] hover:bg-sky-50/50 active:scale-95 rounded-xl text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Ver ofertas</span>
              </button>
            </div>

            {/* Crisp Proof Badges */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200 shadow-2xs hover:border-sky-400 transition-colors">
                <p className="text-xl sm:text-2xl font-bold text-[#0080FF] font-mono-num">5 Años</p>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">Garantía estructural</p>
              </div>
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200 shadow-2xs hover:border-sky-400 transition-colors">
                <p className="text-xl sm:text-2xl font-bold text-[#0080FF] font-mono-num">IATA</p>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">Norma de cabina</p>
              </div>
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200 shadow-2xs hover:border-sky-400 transition-colors">
                <p className="text-xl sm:text-2xl font-bold text-[#0080FF] font-mono-num">100%</p>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">Makrolon® virgen</p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Hero Photography */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_luggage_airport_1792168451253.jpg"
                alt="Colección premium de maletas de viaje en terminal de aeropuerto"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Solid luxury tag overlay */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#0B1E38] text-white p-4 rounded-xl border border-sky-400/40 text-xs flex items-center gap-3.5 shadow-xl">
                <div className="w-9 h-9 rounded-lg bg-[#0080FF] flex items-center justify-center shrink-0 shadow-sm">
                  <PlaneTakeoff className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white tracking-wide">Línea Signature 2026</p>
                  <p className="text-sky-300 text-[11px]">Ruedas Hinomoto® Lisof 360° silenciosas</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Feature Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-300 transition-all duration-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-100 text-sky-800 rounded-lg shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide">Cerraduras TSA</h4>
              <p className="text-xs text-slate-600 mt-0.5">Inspección aeroportuaria sin riesgo de rotura.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-300 transition-all duration-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-100 text-sky-800 rounded-lg shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide">Policarbonato Bayer</h4>
              <p className="text-xs text-slate-600 mt-0.5">Flexibilidad elástica que absorbe impactos.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-300 transition-all duration-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide">Pedidos por WhatsApp</h4>
              <p className="text-xs text-slate-600 mt-0.5">Atención personalizada y rápida confirmación.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-300 transition-all duration-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-100 text-sky-800 rounded-lg shrink-0">
              <PlaneTakeoff className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide">Envíos Protegidos</h4>
              <p className="text-xs text-slate-600 mt-0.5">Embalaje reforzado con seguimiento activo.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
