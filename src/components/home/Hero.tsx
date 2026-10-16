import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Compass, PlaneTakeoff, RotateCcw, Sparkles } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-[#FAF9F6] to-white border-b border-slate-200/80">
      
      {/* Ambient background light matching logo colors */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-sky-300/15 to-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] bg-gradient-to-tr from-blue-300/10 to-sky-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Main 2-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Unboxed natural kicker with brand tone */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-sky-50 border border-sky-200/80 rounded-full w-fit mb-5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span className="text-xs font-semibold text-sky-800 tracking-wider uppercase">Colección Alta Gama 2026</span>
              <span className="text-sky-300">·</span>
              <span className="text-xs font-medium text-sky-700">Ingeniería Aeronáutica</span>
            </div>

            {/* Headline strictly balanced with deep slate and ocean touch */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-display leading-[1.08] mb-6 [text-wrap:balance]">
              Tu próximo destino{' '}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                comienza aquí
              </span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-9 font-light">
              Descubre maletas, mochilas y accesorios diseñados para acompañarte en cada aventura. Resistencia inigualable en policarbonato Makrolon®, ruedas ultrasilenciosas Hinomoto 360° y compartimentos de acceso inteligente.
            </p>

            {/* Functional CTAs with enhanced transitions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={handleExplore}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-sky-600 via-blue-700 to-cyan-800 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(2,132,199,0.35)] hover:shadow-[0_8px_28px_rgba(2,132,199,0.5)] hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Explorar colección</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={handleDeals}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-300 text-slate-800 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50/50 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Ver ofertas</span>
              </button>
            </div>

            {/* Adjacent Proof Badges */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-4">
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/70 shadow-xs hover:border-sky-300 transition-colors">
                <p className="text-xl sm:text-2xl font-bold text-sky-700 font-mono-num">5 Años</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Garantía estructural</p>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/70 shadow-xs hover:border-sky-300 transition-colors">
                <p className="text-xl sm:text-2xl font-bold text-sky-700 font-mono-num">IATA</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Dimensiones de cabina</p>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/70 shadow-xs hover:border-sky-300 transition-colors">
                <p className="text-xl sm:text-2xl font-bold text-sky-700 font-mono-num">100%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Makrolon® virgen</p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Hero Photography */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-2xl border border-sky-100 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_luggage_airport_1792168451253.jpg"
                alt="Colección premium de maletas de viaje en terminal de aeropuerto"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Subtle glass overlay banner with brand azure badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-slate-950/85 backdrop-blur-md text-white p-4 rounded-xl border border-sky-400/30 text-xs flex items-center gap-3.5 shadow-xl">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(14,165,233,0.5)]">
                  <PlaneTakeoff className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white tracking-wide">Línea Signature 2026</p>
                  <p className="text-sky-200 text-[11px]">Ruedas Hinomoto® Lisof 360° silenciosas</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Feature Strip with brand color accents */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-3.5 rounded-xl hover:bg-white transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Cerraduras TSA</h4>
              <p className="text-xs text-slate-500 mt-0.5">Seguridad aeroportuaria internacional sin riesgo de rotura.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl hover:bg-white transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Policarbonato Bayer</h4>
              <p className="text-xs text-slate-500 mt-0.5">Flexibilidad elástica que absorbe impactos en bodegas.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl hover:bg-white transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Atención WhatsApp</h4>
              <p className="text-xs text-slate-500 mt-0.5">Asesoramiento directo antes y después de comprar.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl hover:bg-white transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-200 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl shrink-0">
              <PlaneTakeoff className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Envíos Protegidos</h4>
              <p className="text-xs text-slate-500 mt-0.5">Embalaje reforzado con seguimiento en tiempo real.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
