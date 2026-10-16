import React from 'react';
import { Star, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Matías Benítez',
      role: 'Arquitecto y viajero frecuente',
      city: 'Santiago de Chile',
      product: 'Aviator Hardshell Carry-On Pro',
      comment: 'El compartimento frontal para la laptop cambió mi forma de pasar los controles en aeropuertos. Las ruedas Hinomoto son impresionantemente silenciosas, incluso sobre adoquines.',
      rating: 5
    },
    {
      name: 'Clara Domínguez',
      role: 'Directora de Operaciones Internacionales',
      city: 'Buenos Aires',
      product: 'Horizon Check-In M 68cm',
      comment: 'La maleta mediana tiene una capacidad asombrosa gracias al fuelle expansible. Viajo con trajes y documentos sensibles y el marco ofrece una seguridad inmejorable.',
      rating: 5
    },
    {
      name: 'Ignacio Valenzuela',
      role: 'Fotógrafo documental',
      city: 'Montevideo',
      product: 'Heritage Weekender Canvas & Leather 45L',
      comment: 'El bolso duffel tiene acabados de cuero dignos de una marca de lujo europea. El compartimento aislado para calzado me permite mantener el equipo fotográfico limpio.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Experiencias de Viaje
            </span>
            <h2 className="text-3xl font-bold text-[#121316] font-display">
              Opiniones de la Comunidad
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-900">{t.name}</p>
                <p className="text-[11px] text-stone-500">{t.role} · {t.city}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Equipaje: {t.product}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
