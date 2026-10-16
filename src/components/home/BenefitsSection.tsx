import React from 'react';
import { ShieldCheck, Award, MessageCircle, Truck, RefreshCw, Feather } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Policarbonato Makrolon® Puro',
      description: 'Termoplástico de grado aeroespacial que absorbe impactos sin rajarse ni sufrir deformaciones permanentes.'
    },
    {
      icon: Feather,
      title: 'Ruedas Hinomoto® Lisof 360°',
      description: 'Cojinetes japoneses sellados y lubricados para un deslizamiento silencioso en terminales y aceras.'
    },
    {
      icon: ShieldCheck,
      title: 'Cerraduras TSA Oficiales',
      description: 'Homologadas para inspección sin rotura en aeropuertos de América, Europa y Asia.'
    },
    {
      icon: MessageCircle,
      title: 'Atención Directa por WhatsApp',
      description: 'Sin esperas ni bots genéricos. Comunicación ágil con nuestro equipo para asesorarte antes de despachar.'
    },
    {
      icon: Truck,
      title: 'Envíos Protegidos & Cuidados',
      description: 'Empaque reforzado de alta densidad para asegurar que tu equipaje llegue en condiciones impecables.'
    },
    {
      icon: RefreshCw,
      title: 'Garantía Estructural de 5 Años',
      description: 'Cobertura oficial integral contra defectos en cremalleras, ruedas, asas telescópicas y armazón.'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0080FF]" />
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
              Ingeniería & Confianza
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display">
            ¿Por qué elegir nuestro equipaje?
          </h2>
          <p className="text-sm text-slate-600 mt-2.5 font-normal">
            Cada pieza combina materiales de primera línea internacional, diseño sobrio y ergonomía probada en miles de kilómetros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0080FF]/50 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-200 ease-out"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0080FF] text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2 font-display group-hover:text-[#0080FF] transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
