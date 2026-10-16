import React, { useState } from 'react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { Eye, ShoppingBag, MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { config, addToCart, setSelectedProduct } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [hovered, setHovered] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWhatsAppQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = config.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `¡Hola ${config.storeName}! Me interesa adquirir *${product.name}* (Color: ${selectedColor || 'Estándar'}, Precio: ${config.currencySymbol}${product.price}). ¿Tienen disponibilidad inmediata para coordinar el envío?`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  return (
    <article 
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-300 ease-out hover:border-sky-300 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] hover:-translate-y-1.5"
    >
      {/* Product Image Stage (65-70% height emphasis) */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-[#F1F5F9]/60 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-108"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Indicators - Brand Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 bg-gradient-to-r from-sky-600 to-cyan-700 text-white rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-700 text-white rounded-md shadow-xs">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Stock warning if low */}
        {product.stock <= product.lowStockThreshold && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-amber-900 bg-amber-50/90 backdrop-blur-xs border border-amber-200 px-2 py-0.5 rounded-md shadow-xs">
            Últimas {product.stock} unidades
          </span>
        )}

        {/* Quick View overlay button */}
        <div className={`absolute inset-0 bg-sky-950/10 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-all duration-300 ${
          hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-3 bg-white text-sky-700 rounded-full shadow-lg hover:bg-sky-50 transition-all duration-200 active:scale-95"
            title="Vista rápida"
            aria-label="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Unboxed Metadata: Category & Spec */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="uppercase tracking-wider font-bold text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
              {product.categoryName}
            </span>
            {product.volume && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{product.volume}</span>
              </>
            )}
            {product.weight && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{product.weight}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-light">
            {product.shortDescription}
          </p>

          {/* Color variant dots if available */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 mr-1 font-medium">Color:</span>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                    selectedColor === c.name
                      ? 'ring-2 ring-sky-500 scale-125 border-white shadow-xs'
                      : 'border-slate-300 opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-slate-500 ml-1 truncate font-medium">
                {selectedColor}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Functional Actions */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Price with tabular numerals */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-sky-700 font-mono-num">
              {config.currencySymbol}{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono-num">
                {config.currencySymbol}{product.originalPrice}
              </span>
            )}
          </div>

          {/* Action buttons with animations */}
          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Quick Buy */}
            <button
              onClick={handleWhatsAppQuickBuy}
              className="p-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
              title="Consultar por WhatsApp"
              aria-label="Comprar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Add to Cart button with brand azure gradient */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, selectedColor, product.sizes[0], 1);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-700 text-white hover:from-sky-500 hover:to-cyan-600 rounded-xl text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-sky-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Añadir a mi maleta"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>

        </div>

      </div>
    </article>
  );
};
