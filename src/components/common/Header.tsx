import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Shield, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { config, cartCount, setIsCartOpen, setCategory, filters, setViewMode } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setSearch } = useStore();

  const handleNavClick = (categorySlug: string) => {
    setCategory(categorySlug);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Official Brand Logo with cases.jfif */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCategory('todas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 shrink-0 group transition-transform duration-200 ease-out hover:opacity-95"
          >
            <div className="relative rounded-xl overflow-hidden border border-sky-300 shadow-sm bg-[#0080FF] p-0.5 transition-transform duration-200 group-hover:scale-102">
              <img
                src={config.logoUrl || '/src/assets/images/cases.jfif'}
                alt={config.storeName}
                className="h-10 sm:h-11 w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-slate-950 font-display leading-none group-hover:text-[#0080FF] transition-colors">
                {config.storeName}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-sky-700 mt-1">
                Equipaje & Travel Gear
              </span>
            </div>
          </a>

          {/* Zone 2: Clean, sharp text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('todas')}
              className={`relative py-1 transition-all duration-200 whitespace-nowrap shrink-0 hover:text-[#0080FF] cursor-pointer ${
                filters.category === 'todas'
                  ? 'text-[#0080FF] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0080FF]'
                  : 'text-slate-600 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0080FF] after:transition-all'
              }`}
            >
              Colección completa
            </button>
            <button
              onClick={() => scrollToSection('categorias')}
              className="relative py-1 text-slate-600 hover:text-[#0080FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0080FF] after:transition-all"
            >
              Categorías
            </button>
            <button
              onClick={() => scrollToSection('equipaje-ideal')}
              className="relative py-1 text-slate-600 hover:text-[#0080FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0080FF] after:transition-all flex items-center gap-1.5"
            >
              <span>Equipaje ideal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0080FF]" />
            </button>
            <button
              onClick={() => handleNavClick('ofertas')}
              className={`relative py-1 transition-all duration-200 whitespace-nowrap shrink-0 hover:text-[#0080FF] cursor-pointer ${
                filters.category === 'ofertas'
                  ? 'text-[#0080FF] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0080FF]'
                  : 'text-slate-600 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0080FF] after:transition-all'
              }`}
            >
              Ofertas
            </button>
            <button
              onClick={() => scrollToSection('beneficios')}
              className="relative py-1 text-slate-600 hover:text-[#0080FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0080FF] after:transition-all"
            >
              Garantía y Envíos
            </button>
          </nav>

          {/* Zone 3: Functional interactive actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search toggler */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-slate-600 hover:text-[#0080FF] hover:bg-sky-50 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Buscar producto"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin portal shortcut */}
            <button
              onClick={() => setViewMode('admin')}
              className="hidden sm:flex items-center gap-1.5 p-2.5 text-slate-500 hover:text-[#0080FF] hover:bg-sky-50 rounded-xl transition-all duration-200 text-xs active:scale-95 cursor-pointer"
              title="Panel Administrativo de la Tienda"
              aria-label="Panel Administrativo"
            >
              <Shield className="w-4 h-4 text-slate-400 hover:text-[#0080FF]" />
            </button>

            {/* Cart trigger button with logo electric blue and tactile animation */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0080FF] text-white hover:bg-[#006ee0] active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:shadow-sky-500/25 transition-all duration-200 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={`Ver carrito con ${cartCount} productos`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Mi Maleta</span>
              <span className="font-mono-num font-bold bg-white/20 px-2 py-0.5 rounded-full text-[11px] border border-white/25">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#0080FF] rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Search Input with sharp border */}
        {isSearchOpen && (
          <div className="py-3 px-1 border-t border-slate-200 animate-fadeIn">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0080FF]" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por cabina, bodega, mochila tech, policarbonato, candado..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0080FF]/30 focus:border-[#0080FF] shadow-xs"
                autoFocus
              />
              {filters.search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white shadow-xl rounded-b-2xl animate-fadeIn">
            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-800 px-2">
              <button
                onClick={() => handleNavClick('todas')}
                className="text-left px-3.5 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-700 transition-colors"
              >
                Colección completa
              </button>
              <button
                onClick={() => scrollToSection('categorias')}
                className="text-left px-3.5 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-700 transition-colors"
              >
                Categorías de equipaje
              </button>
              <button
                onClick={() => scrollToSection('equipaje-ideal')}
                className="text-left px-3.5 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-700 transition-colors flex items-center justify-between"
              >
                <span>Asistente de viaje</span>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">Recomendador</span>
              </button>
              <button
                onClick={() => handleNavClick('ofertas')}
                className="text-left px-3.5 py-2.5 rounded-xl hover:bg-sky-50 text-sky-700 font-semibold"
              >
                Ofertas de temporada
              </button>
              <button
                onClick={() => scrollToSection('beneficios')}
                className="text-left px-3.5 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-700 transition-colors"
              >
                Garantía y Envíos
              </button>
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setViewMode('admin');
                  }}
                  className="w-full flex items-center gap-2 text-left px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-xl"
                >
                  <Shield className="w-3.5 h-3.5 text-sky-600" />
                  <span>Acceso Panel Administrativo</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
