import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText,
  Copy,
  ExternalLink
} from 'lucide-react';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({ isOpen, onClose }) => {
  const { config, cart, cartSubtotal, shippingCost, cartTotal, createOrder, setIsCartOpen, showToast } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg('Por favor ingresa tu número de WhatsApp para contactarte.');
      return;
    }
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Por favor especifica tu dirección de entrega.');
      return;
    }

    setErrorMsg('');

    const result = createOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      deliveryMethod,
      deliveryAddress: deliveryAddress.trim(),
      city: city.trim(),
      notes: notes.trim()
    });

    setOrderConfirmed(result);
    setIsCartOpen(false);
  };

  const handleCopyMessage = () => {
    if (orderConfirmed?.whatsappText) {
      navigator.clipboard.writeText(orderConfirmed.whatsappText);
      setCopied(true);
      showToast('Mensaje de pedido copiado al portapapeles');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenWhatsApp = () => {
    if (orderConfirmed?.whatsappUrl) {
      window.open(orderConfirmed.whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-fadeIn">
          
          {/* Header with Solid Brand Cobalt */}
          <div className="bg-[#0B192C] border-b border-sky-950 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0080FF] text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-wide font-display">
                  {orderConfirmed ? 'Pedido Preparado para WhatsApp' : 'Finalizar Pedido por WhatsApp'}
                </h3>
                <p className="text-xs text-sky-300 font-normal">
                  {orderConfirmed ? 'Paso final: enviar mensaje por WhatsApp' : 'Atención directa y personalizada de nuestro equipo'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar modal de pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form state vs Confirmed state */}
          {!orderConfirmed ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Error alert if any */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Order summary mini-strip */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-stone-500 block">Total a confirmar:</span>
                  <span className="text-base font-bold text-stone-900 font-mono-num">
                    {config.currencySymbol}{cartTotal} {config.currencyCode}
                  </span>
                </div>
                <div className="text-right text-stone-500">
                  <span>{cart.length} artículo(s)</span>
                  <span className="block text-[11px] text-emerald-700 font-medium">
                    {shippingCost === 0 ? 'Envío sin cargo' : `Envío: ${config.currencySymbol}${shippingCost}`}
                  </span>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej. Lucas Fernández"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    WhatsApp / Celular *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Ej. +54 9 11 1234-5678"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Email */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Correo Electrónico (Opcional, para copia de garantía)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="lucas@ejemplo.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery method selector */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Modalidad de Entrega:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                      deliveryMethod === 'delivery'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 font-semibold text-stone-900'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <Truck className="w-4 h-4 mb-1 text-stone-700" />
                    <span>Envío a domicilio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                      deliveryMethod === 'pickup'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 font-semibold text-stone-900'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mb-1 text-stone-700" />
                    <span>Retiro en showroom</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address fields */}
              {deliveryMethod === 'delivery' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Dirección y Número *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Calle, número, piso, dpto"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Ciudad / Localidad
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-600">
                  <span className="font-semibold block text-stone-800">Dirección para retiro:</span>
                  <span>{config.addressDisplay}</span>
                  <span className="block text-[11px] text-stone-500 mt-0.5">{config.hoursDisplay}</span>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Notas de viaje o indicaciones especiales
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Fecha límite de viaje, indicaciones para entrega, etc."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>

              {/* Submission button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Generar pedido y abrir WhatsApp</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  No se cobrará nada automáticamente. El pedido se confirmará directamente por WhatsApp con nuestro equipo.
                </p>
              </div>

            </form>
          ) : (
            /* Order Confirmed View */
            <div className="p-6 space-y-5">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-stone-900 font-display">
                  ¡Pedido Preparado con Éxito!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Identificador provisional asignado: <strong className="font-mono text-stone-800">#{orderConfirmed.order.orderNumber}</strong>
                </p>
              </div>

              {/* Message Preview Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs font-mono text-stone-700 max-h-48 overflow-y-auto whitespace-pre-line leading-relaxed">
                {orderConfirmed.whatsappText}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir WhatsApp y Enviar Pedido</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full py-2.5 px-4 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-98 rounded-xl text-xs font-medium transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? '¡Copiado con éxito!' : 'Copiar texto del pedido'}</span>
                </button>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-relaxed">
                <strong>Importante:</strong> Debes enviar el mensaje en WhatsApp para que un asesor te asigne número de guía, confirme la disponibilidad física del stock y coordine el medio de pago.
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  Cerrar y seguir navegando en la tienda
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
