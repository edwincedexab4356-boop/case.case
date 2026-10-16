import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Shield, Menu, X, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Logo & Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCategory('todas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 shrink-0 group transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative p-0.5 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.3)] group-hover:shadow-[0_0_22px_rgba(14,165,233,0.5)] transition-all duration-300">
              <img
                src={config.logoUrl || '/src/assets/images/cases.jfif'}
                alt={config.storeName}
                className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-[10px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-slate-950 font-display uppercase leading-none group-hover:text-sky-600 transition-colors">
                {config.storeName}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-sky-700/80 mt-1">
                Equipaje & Travel
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links with animated underline */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('todas')}
              className={`relative py-1 transition-all duration-200 whitespace-nowrap shrink-0 hover:text-sky-600 ${
                filters.category === 'todas'
                  ? 'text-sky-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600'
                  : 'text-slate-600 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all'
              }`}
            >
              Colección completa
            </button>
            <button
              onClick={() => scrollToSection('categorias')}
              className="relative py-1 text-slate-600 hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all"
            >
              Categorías
            </button>
            <button
              onClick={() => scrollToSection('equipaje-ideal')}
              className="relative py-1 text-slate-600 hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all flex items-center gap-1.5"
            >
              <span>Equipaje ideal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            </button>
            <button
              onClick={() => handleNavClick('ofertas')}
              className={`relative py-1 transition-all duration-200 whitespace-nowrap shrink-0 hover:text-sky-600 ${
                filters.category === 'ofertas'
                  ? 'text-sky-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600'
                  : 'text-slate-600 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all'
              }`}
            >
              Ofertas
            </button>
            <button
              onClick={() => scrollToSection('beneficios')}
              className="relative py-1 text-slate-600 hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all"
            >
              Garantía y Envíos
            </button>
          </nav>

          {/* Zone 3: Functional interactive actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search toggler */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-200 active:scale-95"
              aria-label="Buscar producto"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin panel entry button */}
            <button
              onClick={() => setViewMode('admin')}
              className="hidden sm:flex items-center gap-1.5 p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-200 text-xs active:scale-95"
              title="Acceso al Panel de Administración"
              aria-label="Panel de Administración"
            >
              <Shield className="w-4 h-4 text-sky-600" />
            </button>

            {/* Cart trigger button with signature brand gradient */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-700 text-white hover:from-sky-500 hover:to-cyan-600 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_6px_22px_rgba(2,132,199,0.45)] transition-all duration-300 text-xs font-semibold whitespace-nowrap shrink-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
              aria-label={`Ver carrito con ${cartCount} productos`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Mi Maleta</span>
              <span className="font-mono-num font-bold bg-white/25 px-2 py-0.5 rounded-full text-[11px] border border-white/20">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Search Input with cyan glow */}
        {isSearchOpen && (
          <div className="py-3 px-1 border-t border-slate-200 animate-fadeIn">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por maleta de cabina, bodega, mochila tech, policarbonato, candado..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 shadow-sm"
                autoFocus
              />
              {filters.search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-sky-600 hover:text-sky-800"
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
