import React from 'react';
import { ShieldCheck, Award, MessageCircle, Truck, RefreshCw, Feather } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Policarbonato Makrolon® Puro',
      description: 'Termoplástico de grado aeroespacial que absorbe la deformación por impacto sin quebrarse ni deformarse.'
    },
    {
      icon: Feather,
      title: 'Ruedas Hinomoto® Lisof 360°',
      description: 'Cojinetes japoneses sellados y lubricados de por vida para un deslizamiento fluido sin ruido en cualquier piso.'
    },
    {
      icon: ShieldCheck,
      title: 'Cerraduras TSA Oficiales',
      description: 'Homologadas para inspección sin rotura en aeropuertos de EE.UU., Europa, Asia y Latinoamérica.'
    },
    {
      icon: MessageCircle,
      title: 'Atención Directa por WhatsApp',
      description: 'Sin bots impersonales ni pasarelas complejas. Asesoramiento individualizado y confirmación inmediata.'
    },
    {
      icon: Truck,
      title: 'Envíos Protegidos & Cuidados',
      description: 'Empaque de doble cartón corrugado y funda antipolvo para que tu equipaje llegue en estado inmaculado.'
    },
    {
      icon: RefreshCw,
      title: 'Garantía Estructural de 5 Años',
      description: 'Cobertura integral contra defectos en cierres, ruedas, asas telescópicas y marcos de aluminio.'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
              Ingeniería & Confianza
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display">
            ¿Por qué elegir nuestro equipaje?
          </h2>
          <p className="text-sm text-slate-600 mt-2.5 font-light">
            Cada maleta combina materiales de primera línea internacional, diseño sobrio y ergonomía probada en miles de kilómetros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200 hover:border-sky-300 hover:shadow-[0_12px_28px_rgba(2,132,199,0.12)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center mb-5 shadow-md shadow-sky-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2 font-display group-hover:text-sky-900 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
