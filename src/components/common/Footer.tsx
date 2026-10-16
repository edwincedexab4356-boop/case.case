import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Lock,
  ArrowUpRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setCategory, setViewMode } = useStore();

  const handleCategoryClick = (catSlug: string) => {
    setCategory(catSlug);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070B14] text-slate-300 pt-16 pb-12 border-t border-sky-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.35)]">
                <img
                  src={config.logoUrl || '/src/assets/images/cases.jfif'}
                  alt={config.storeName}
                  className="h-10 w-10 object-cover rounded-[10px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight font-display uppercase leading-none">
                  {config.storeName}
                </h3>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-sky-400 mt-1 block">
                  Equipaje, Estilo & Viaje
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              {config.subtitle}. Diseñamos y comercializamos equipaje de alta gama, pensado para resistir el rigor de los viajes frecuentes con la máxima sofisticación estética.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{config.addressDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{config.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{config.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{config.hoursDisplay}</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('cabina')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Maletas de cabina (IATA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('medianas')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Maletas medianas de bodega
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('grandes')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Maletas grandes y Baúles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('juegos')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Juegos anidados de 3 piezas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('mochilas')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Mochilas técnicas para laptop
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('bolsos')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Bolsos de fin de semana
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('ofertas')}
                  className="text-sky-400 hover:text-sky-300 transition-colors font-semibold cursor-pointer text-left"
                >
                  Ofertas y promociones
                </button>
              </li>
            </ul>
          </div>

          {/* Travel Trust & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Servicios & Soporte
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-300">Garantía oficial de 5 años</span>
              </li>
              <li>
                <span className="text-slate-300">Envíos a todo el país</span>
              </li>
              <li>
                <span className="text-slate-300">Retiro inmediato en showroom</span>
              </li>
              <li>
                <span className="text-slate-300">Candados y normas TSA</span>
              </li>
              <li>
                <span className="text-slate-300">Guía de tallas y medidas aéreas</span>
              </li>
              <li>
                <span className="text-slate-300">Asistencia técnica y repuestos</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct & Admin Portal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Canal de Venta Directa
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              ¿Dudas sobre dimensiones o stock? Consulta directamente a nuestro equipo por WhatsApp.
            </p>

            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola%2C%20quisiera%20asesoramiento%20sobre%20equipaje`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-[0_4px_16px_rgba(5,150,105,0.3)] transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>

            <div className="pt-2">
              <button
                onClick={() => setViewMode('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-300 transition-colors underline cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso administrativo</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {config.storeName}. Todos los derechos reservados.
          </p>

          <p className="text-sky-400 font-medium">
            {config.subtitle}
          </p>
        </div>

      </div>
    </footer>
  );
};
