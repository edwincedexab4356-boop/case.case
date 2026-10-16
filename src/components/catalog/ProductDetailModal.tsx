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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 transition-opacity duration-200"
        onClick={() => setSelectedProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 animate-fadeIn">
          
          {/* Close button with hover animation */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-all duration-150 border border-slate-200 shadow-sm active:scale-95 cursor-pointer"
            aria-label="Cerrar detalles"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Gallery Left (6 cols) */}
            <div className="md:col-span-6 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
              
              {/* Main photo */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white p-5 flex items-center justify-center border border-slate-200 shadow-2xs">
                <img
                  src={product.images[activePhotoIdx] || product.images[0]}
                  alt={`${product.name} - Vista ${activePhotoIdx + 1}`}
                  className="w-full h-full object-contain transition-all duration-300 ease-out"
                  referrerPolicy="no-referrer"
                />

                {discountPct > 0 && (
                  <span className="absolute top-3 left-3 bg-[#0080FF] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs">
                    -{discountPct}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl bg-white p-1 border overflow-hidden shrink-0 transition-all duration-150 cursor-pointer ${
                      activePhotoIdx === idx
                        ? 'border-[#0080FF] ring-2 ring-[#0080FF]/30 shadow-xs scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
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

              {/* Quality Badges */}
              <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0080FF] shrink-0" />
                  <span>Garantía Oficial 5 Años</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0080FF] shrink-0" />
                  <span>Envíos Protegidos</span>
                </div>
              </div>

            </div>

            {/* Product Details & Purchase Form Right (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
              
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] font-bold text-[#0080FF] uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded">
                    {product.categoryName}
                  </span>
                  {product.badge && (
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-extrabold text-slate-950 font-display">
                  {product.name}
                </h2>

                {/* Pricing Block */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#0080FF] font-mono-num">
                    {config.currencySymbol}{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through font-mono-num">
                      {config.currencySymbol}{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">IVA incluido</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Specifications Checklist */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                      Características destacadas:
                    </span>
                    {product.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#0080FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-6">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      Color seleccionado: <span className="font-semibold normal-case text-[#0080FF]">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-150 cursor-pointer ${
                            selectedColor === c.name
                              ? 'ring-2 ring-[#0080FF] scale-125 border-white shadow-xs'
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
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      Tamaño / Medida:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                            selectedSize === s
                              ? 'border-[#0080FF] bg-[#0080FF] text-white shadow-2xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
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
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Cantidad:
                  </span>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
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
                      className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
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

              {/* Action Buttons with tactile transitions */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stock === 0}
                  className="w-full py-4 px-4 bg-[#0080FF] hover:bg-[#006ee0] active:scale-98 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:shadow-sky-500/25 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar a mi maleta de compra</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyOnWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-2xs hover:shadow-sm cursor-pointer"
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
