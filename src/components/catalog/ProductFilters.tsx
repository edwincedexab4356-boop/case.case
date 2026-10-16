import React from 'react';
import { useStore, SortOption } from '../../context/StoreContext';
import { STORE_CATEGORIES } from '../../data/categories';
import { Filter, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export const ProductFilters: React.FC = () => {
  const { filters, updateFilters, resetFilters, setCategory, setSortBy } = useStore();

  const priceRanges = [
    { label: 'Todos los precios', min: 0, max: 1000 },
    { label: 'Hasta $100', min: 0, max: 100 },
    { label: '$100 a $200', min: 100, max: 200 },
    { label: '$200 a $300', min: 200, max: 300 },
    { label: 'Más de $300', min: 300, max: 1000 }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">Filtros de Equipaje</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restablecer</span>
        </button>
      </div>

      {/* Category selection list */}
      <div>
        <label className="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2.5">
          Categoría
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setCategory('todas')}
            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${
              filters.category === 'todas'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-700 text-white font-semibold shadow-xs'
                : 'text-slate-700 hover:bg-sky-50 hover:text-sky-800'
            }`}
          >
            <span>Todas las categorías</span>
            {filters.category === 'todas' && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
          {STORE_CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-700 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-800'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Ranges */}
      <div>
        <label className="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2.5">
          Rango de Precio
        </label>
        <div className="space-y-1.5">
          {priceRanges.map((range, idx) => {
            const isCurrent = filters.minPrice === range.min && filters.maxPrice === range.max;
            return (
              <button
                key={idx}
                onClick={() => updateFilters({ minPrice: range.min, maxPrice: range.max })}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-50 text-sky-900 border border-sky-300 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50/50'
                }`}
              >
                <span>{range.label}</span>
                {isCurrent && <span className="w-2 h-2 rounded-full bg-sky-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles: In Stock & Deals */}
      <div className="pt-3 border-t border-slate-200 space-y-2.5">
        <label className="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">
          Disponibilidad y Ofertas
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => updateFilters({ inStockOnly: e.target.checked })}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
          />
          <span className="font-medium">Solo artículos en stock</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.dealsOnly}
            onChange={(e) => updateFilters({ dealsOnly: e.target.checked })}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
          />
          <span className="font-semibold text-sky-800">Solo promociones y ofertas</span>
        </label>
      </div>

    </div>
  );
};
