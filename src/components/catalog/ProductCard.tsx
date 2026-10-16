import React, { useState } from 'react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { Eye, ShoppingBag, MessageCircle } from 'lucide-react';

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
      className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200 ease-out hover:border-[#0080FF]/50 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-[#F8FAFC] overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-[#0080FF] text-white rounded-md shadow-2xs">
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#0B1E38] text-sky-200 rounded-md shadow-2xs">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Low Stock Badge */}
        {product.stock <= product.lowStockThreshold && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs">
            Últimas {product.stock} unidades
          </span>
        )}

        {/* Quick View Button */}
        <div className={`absolute bottom-3 right-3 transition-all duration-200 ${
          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-2.5 bg-white text-slate-800 rounded-xl shadow-md border border-slate-200 hover:text-[#0080FF] hover:border-[#0080FF] transition-all duration-150 active:scale-95 cursor-pointer"
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
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="uppercase tracking-wider font-bold text-[10px] text-[#0080FF] bg-sky-50 px-2 py-0.5 rounded">
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
          <h3 className="text-sm font-bold text-slate-950 line-clamp-1 group-hover:text-[#0080FF] transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>

          {/* Color variant dots */}
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
                  className={`w-4 h-4 rounded-full border transition-all duration-150 cursor-pointer ${
                    selectedColor === c.name
                      ? 'ring-2 ring-[#0080FF] scale-125 border-white shadow-xs'
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
          
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-[#0080FF] font-mono-num">
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
              className="p-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
              title="Consultar por WhatsApp"
              aria-label="Comprar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Add to Cart button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, selectedColor, product.sizes[0], 1);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#0080FF] text-white hover:bg-[#006ee0] active:scale-95 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-sky-500/20 transition-all duration-150 cursor-pointer"
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
