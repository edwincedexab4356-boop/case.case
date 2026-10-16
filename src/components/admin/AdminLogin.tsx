import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Shield, Lock, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setViewMode, config } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
    }
  };

  const handleQuickDemoAccess = () => {
    loginAdmin(config.adminPin || 'demo123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8">
        
        {/* Top Header with Logo */}
        <div className="text-center mb-8">
          <img
            src={config.logoUrl || '/src/assets/images/cases.jfif'}
            alt={config.storeName}
            className="h-12 w-auto max-w-[120px] object-contain rounded-md mx-auto mb-3"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-2xl font-bold text-[#121316] font-display">
            Panel de Control
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Gestión interna de inventario, pedidos y configuración de {config.storeName}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Clave incorrecta. Puedes ingresar con <strong>demo123</strong>.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1.5">
              Clave de Acceso Administrativo
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Ingresa la clave..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Clave de acceso: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">demo123</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#121316] text-white hover:bg-stone-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Fast Access */}
        <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded-lg text-xs font-medium transition-colors"
          >
            Acceso Rápido
          </button>

          <button
            type="button"
            onClick={() => setViewMode('store')}
            className="flex items-center justify-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 pt-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la tienda de clientes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
