import React from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_CATEGORIES } from '../../data/categories';
import { 
  Luggage, 
  PackageCheck, 
  Boxes, 
  Layers, 
  Backpack, 
  Briefcase, 
  FolderKanban, 
  Grid, 
  ShieldCheck, 
  Percent,
  Check
} from 'lucide-react';

const categoryIconMap: Record<string, React.ElementType> = {
  cabina: Luggage,
  medianas: PackageCheck,
  grandes: Boxes,
  juegos: Layers,
  mochilas: Backpack,
  bolsos: Briefcase,
  maletines: FolderKanban,
  organizadores: Grid,
  accesorios: ShieldCheck,
  ofertas: Percent
};

export const CategoryNav: React.FC = () => {
  const { filters, setCategory, products } = useStore();

  const getCategoryCount = (slug: string) => {
    if (slug === 'ofertas') {
      return products.filter(p => p.isDeal || (p.originalPrice && p.originalPrice > p.price)).length;
    }
    return products.filter(p => p.category === slug).length;
  };

  const handleSelect = (slug: string) => {
    setCategory(slug);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0080FF]" />
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                Catálogo Especializado
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              Explorar por Categoría
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelect('todas')}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                filters.category === 'todas'
                  ? 'bg-[#0080FF] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-[#0080FF]'
              }`}
            >
              Ver todo el catálogo ({products.length})
            </button>
          </div>
        </div>

        {/* Categories Grid (10 categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {STORE_CATEGORIES.map((cat) => {
            const Icon = categoryIconMap[cat.slug] || Luggage;
            const count = getCategoryCount(cat.slug);
            const isSelected = filters.category === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.slug)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ease-out flex flex-col justify-between group cursor-pointer active:scale-98 ${
                  isSelected
                    ? 'border-[#0080FF] bg-sky-50/70 ring-2 ring-[#0080FF]/25 shadow-xs -translate-y-0.5'
                    : 'border-slate-200 bg-white hover:border-[#0080FF]/60 hover:bg-sky-50/30 hover:-translate-y-0.5 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl transition-colors duration-200 ${
                    isSelected 
                      ? 'bg-[#0080FF] text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-700 group-hover:bg-sky-100 group-hover:text-[#0080FF]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-[#0080FF] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono-num font-medium text-slate-400 group-hover:text-[#0080FF] transition-colors">
                      {count}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`text-xs font-bold leading-tight mb-1 transition-colors ${
                    isSelected ? 'text-[#0080FF]' : 'text-slate-900 group-hover:text-[#0080FF]'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
