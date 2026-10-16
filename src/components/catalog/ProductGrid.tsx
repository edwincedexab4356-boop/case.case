import React, { useState } from 'react';
import { useStore, SortOption } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { STORE_CATEGORIES } from '../../data/categories';
import { SlidersHorizontal, PackageSearch, X } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { filteredProducts, filters, setSortBy, resetFilters, setCategory } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentCategoryName = React.useMemo(() => {
    if (filters.category === 'todas') return 'Todos los artículos';
    if (filters.category === 'ofertas') return 'Ofertas y Promociones Especiales';
    const found = STORE_CATEGORIES.find(c => c.slug === filters.category);
    return found ? found.name : 'Colección';
  }, [filters.category]);

  return (
    <section id="catalogo" className="py-14 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                Catálogo Exclusivo
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              {currentCategoryName}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="font-semibold text-slate-700">{filteredProducts.length} artículos</span>
              {filters.search && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-sky-700 font-medium">Buscando "{filters.search}"</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-sky-400 rounded-xl text-xs font-bold text-slate-700 shadow-2xs active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
              <span>Filtros</span>
            </button>

            {/* Sort Selector with brand focus */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 whitespace-nowrap hidden sm:inline">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 focus:outline-none shadow-2xs cursor-pointer"
              >
                <option value="featured">Destacados y Recomendados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Desktop Sidebar Filters on Left + 3-Col Grid on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <ProductFilters />
          </div>

          {/* Product Items Column */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <PackageSearch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-display">No encontramos productos</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-2 leading-relaxed">
                  No hay artículos que coincidan con los filtros seleccionados o el término de búsqueda actual.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="font-bold text-stone-900 text-sm">Filtros de Equipaje</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ProductFilters />
            </div>
            <div className="pt-4 border-t border-stone-200 mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                Ver resultados ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
