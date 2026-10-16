import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Plane, 
  Layers, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Truck
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, config } = useStore();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Sync state when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setActivePhotoIdx(0);
      setSelectedColor(selectedProduct.colors[0]?.name || 'Estándar');
      setSelectedSize(selectedProduct.sizes[0] || 'Única');
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setSelectedProduct(null);
  };

  const handleBuyOnWhatsApp = () => {
    const cleanNumber = config.whatsappNumber.replace(/[^0-9]/g, '');
    const itemSub = product.price * quantity;
    const msg = [
      `¡Hola ${config.storeName}! Deseo encargar este artículo:`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `📦 *${product.name}*`,
      `🎨 *Color:* ${selectedColor}`,
      `📐 *Medida/Variante:* ${selectedSize}`,
      `🔢 *Cantidad:* ${quantity} unidad(es)`,
      `💰 *Total:* ${config.currencySymbol}${itemSub} ${config.currencyCode}`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `¿Tienen stock disponible para coordinar la entrega y el pago?`
    ].join('\n');

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with smooth blur */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setSelectedProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-sky-100 z-10 animate-fadeIn">
          
          {/* Close button with hover animation */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-900 bg-white/90 hover:bg-sky-50 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            aria-label="Cerrar detalles"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Gallery Left (6 cols) */}
            <div className="md:col-span-6 bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-50 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
              
              {/* Main photo */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white p-5 flex items-center justify-center border border-slate-200/90 shadow-sm">
                <img
                  src={product.images[activePhotoIdx] || product.images[0]}
                  alt={`${product.name} - Vista ${activePhotoIdx + 1}`}
                  className="w-full h-full object-contain transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {discountPct > 0 && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    -{discountPct}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails list with azure highlight */}
              <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl bg-white p-1 border overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                      activePhotoIdx === idx
                        ? 'border-sky-500 ring-2 ring-sky-500/40 shadow-sm scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-sky-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              {/* Technical trust badges */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold text-slate-800">Garantía 5 años</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold text-slate-800">Envío asegurado</span>
                </div>
              </div>

            </div>

            {/* Contiguous Purchase Module Right (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
              
              <div>
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    {product.categoryName}
                  </span>
                  {product.dimensions && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{product.dimensions}</span>
                    </>
                  )}
                  {product.volume && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{product.volume}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
                  {product.name}
                </h2>

                {/* Price with signature azure color */}
                <div className="mt-3 flex items-baseline gap-2.5">
                  <span className="text-3xl font-extrabold text-sky-700 font-mono-num">
                    {config.currencySymbol}{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through font-mono-num">
                      {config.currencySymbol}{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 ml-1 font-medium">
                    {config.currencyCode} · IVA incluido
                  </span>
                </div>

                {/* Long Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Material & Specs */}
                {product.material && (
                  <div className="mt-4 p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 text-xs">
                    <span className="font-bold text-sky-950 block mb-0.5">Composición y materiales:</span>
                    <span className="text-slate-700">{product.material}</span>
                  </div>
                )}

                {/* Features list */}
                {product.features.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
                      Características destacadas:
                    </span>
                    {product.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-6">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      Color seleccionado: <span className="font-semibold normal-case text-sky-700">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                            selectedColor === c.name
                              ? 'ring-2 ring-sky-500 scale-125 border-white shadow-sm'
                              : 'border-slate-300 opacity-80 hover:opacity-100 hover:scale-110'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size / Dimensions Selector */}
                {product.sizes.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      Tamaño / Medida:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                            selectedSize === s
                              ? 'border-sky-600 bg-gradient-to-r from-sky-600 to-cyan-700 text-white shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Cantidad:
                  </span>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
                      aria-label="Restar una unidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono-num font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
                      aria-label="Sumar una unidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.stock > 0 ? `${product.stock} disponibles en stock` : 'Agotado'}
                  </span>
                </div>

              </div>

              {/* Action Buttons with rich animations */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stock === 0}
                  className="w-full py-4 px-4 bg-gradient-to-r from-sky-600 via-blue-700 to-cyan-800 hover:from-sky-500 hover:to-cyan-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(2,132,199,0.35)] hover:shadow-[0_8px_28px_rgba(2,132,199,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar a mi maleta de compra</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyOnWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Comprar directo por WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
