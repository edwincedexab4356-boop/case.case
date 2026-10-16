import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Matías Benítez',
      role: 'Arquitecto y viajero frecuente',
      city: 'Santiago de Chile',
      product: 'Aviator Hardshell Carry-On Pro',
      comment: 'El compartimento frontal para la laptop cambió mi forma de pasar los controles en aeropuertos. Las ruedas Hinomoto son silenciosas incluso sobre pavimentos difíciles.',
      rating: 5
    },
    {
      name: 'Clara Domínguez',
      role: 'Directora de Operaciones',
      city: 'Buenos Aires',
      product: 'Horizon Check-In M 68cm',
      comment: 'La maleta mediana tiene una capacidad excelente gracias al fuelle expansible. Viajo con trajes y documentos sensibles y el armazón ofrece una rigidez impecable.',
      rating: 5
    },
    {
      name: 'Ignacio Valenzuela',
      role: 'Fotógrafo documental',
      city: 'Montevideo',
      product: 'Heritage Weekender Canvas & Leather 45L',
      comment: 'El bolso duffel tiene acabados de cuero de primera categoría. El compartimento aislado para calzado me permite mantener el equipo fotográfico aislado y limpio.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-2">
              Experiencias de Viaje
            </span>
            <h2 className="text-3xl font-bold text-slate-950 font-display">
              Opiniones de Clientes
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#0080FF]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Compra Verificada</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-950">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.role} · {t.city}</p>
                <p className="text-[11px] text-[#0080FF] font-medium mt-0.5">Equipaje: {t.product}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
