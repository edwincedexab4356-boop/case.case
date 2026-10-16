import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { WhatsAppCheckoutModal } from './WhatsAppCheckoutModal';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    shippingCost, 
    cartTotal, 
    freeShippingRemaining,
    config,
    clearCart,
    setCategory
  } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / config.freeShippingThreshold) * 100)
  );

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideLeft">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-tr from-sky-600 to-cyan-500 text-white rounded-xl shadow-xs">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950 font-display text-base">
                    Tu Maleta de Viaje
                  </h3>
                  <p className="text-[11px] text-sky-700 font-semibold">{cart.length} modelo(s) seleccionado(s)</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200/50 transition-colors cursor-pointer"
                aria-label="Cerrar maleta"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress bar with electric cyan gradient */}
            <div className="px-5 py-3.5 bg-sky-50/50 border-b border-sky-100">
              <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-600" />
                  {freeShippingRemaining === 0 ? (
                    <strong className="text-sky-800">¡Calificas para Envío Gratis!</strong>
                  ) : (
                    <span>
                      Faltan <strong className="font-mono-num text-sky-700">{config.currencySymbol}{freeShippingRemaining}</strong> para envío gratis
                    </span>
                  )}
                </span>
                <span className="font-mono-num text-[11px] font-bold text-sky-700">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 h-2 rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto mb-4 border border-sky-100">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Tu maleta está vacía</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto font-light">
                    Explora nuestra colección y añade el equipaje que te acompañará en tu próxima aventura.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCategory('todas');
                      const el = document.getElementById('catalogo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-6 px-5 py-3 bg-gradient-to-r from-sky-600 to-cyan-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 transition-all active:scale-95 cursor-pointer"
                  >
                    Ver equipaje recomendado
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-200/90 p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-950 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                            title="Quitar artículo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variants label */}
                        <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-x-2">
                          <span className="font-medium text-slate-700">Color: {item.selectedColor}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span>{item.selectedSize}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Subtotal */}
                      <div className="flex items-center justify-between mt-2.5 pt-1">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
                            aria-label="Restar una unidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono-num font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
                            aria-label="Sumar una unidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-sky-700 font-mono-num">
                          {config.currencySymbol}{item.product.price * item.quantity}
                        </span>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-mono-num font-semibold text-slate-900">
                      {config.currencySymbol}{cartSubtotal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Envío</span>
                    <span className="font-mono-num font-semibold text-slate-900">
                      {shippingCost === 0 ? 'Sin cargo' : `${config.currencySymbol}${shippingCost}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-950">
                    <span>Total estimado</span>
                    <span className="font-mono-num text-base text-sky-700 font-extrabold">
                      {config.currencySymbol}{cartTotal} {config.currencyCode}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-500 hover:to-teal-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirmar pedido por WhatsApp</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
                  >
                    Vaciar maleta
                  </button>
                  <span className="text-[11px] text-slate-400">
                    Atención directa
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <WhatsAppCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};
