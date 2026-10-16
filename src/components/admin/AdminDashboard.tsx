import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus } from '../../types/store';
import { STORE_CATEGORIES } from '../../data/categories';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  ExternalLink,
  MessageCircle,
  Truck,
  DollarSign,
  Boxes,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    config, 
    updateConfig, 
    resetConfigToDefault,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    orders, 
    updateOrderStatus, 
    deleteOrder,
    setViewMode, 
    logoutAdmin,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'kpis' | 'products' | 'orders' | 'config'>('kpis');

  // KPI calculations
  const totalSalesRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pendiente');
  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);

  // Product modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'cabina',
    categoryName: 'Maletas de cabina',
    price: 199,
    originalPrice: 249,
    shortDescription: '',
    description: '',
    material: '',
    dimensions: '',
    weight: '',
    volume: '',
    stock: 10,
    lowStockThreshold: 3,
    images: ['/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'],
    colors: [
      { name: 'Negro Carbón', hex: '#1C1C1E' },
      { name: 'Plata Titanio', hex: '#B8BAC0' }
    ],
    sizes: ['55 x 35 x 23 cm'],
    features: ['Policarbonato virgen', 'Ruedas Hinomoto 360°', 'Cerradura TSA']
  });

  // Selected Order Detail View
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Editable config local draft
  const [draftConfig, setDraftConfig] = useState(config);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      category: 'cabina',
      categoryName: 'Maletas de cabina',
      price: 190,
      originalPrice: 220,
      shortDescription: '',
      description: '',
      material: 'Policarbonato Makrolon® alemán',
      dimensions: '55 x 35 x 23 cm',
      weight: '3.0 kg',
      volume: '38 Litros',
      stock: 12,
      lowStockThreshold: 3,
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
      images: [
        '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg',
        '/src/assets/images/hero_luggage_airport_1792168451253.jpg',
        '/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'
      ],
      colors: [
        { name: 'Negro Carbón', hex: '#1C1C1E' },
        { name: 'Plata Titanio', hex: '#C0C2C8' }
      ],
      sizes: ['55 x 35 x 23 cm'],
      features: ['Cerradura TSA homologada', 'Ruedas silenciosas 360°', 'Garantía oficial 5 años']
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const catObj = STORE_CATEGORIES.find(c => c.slug === productForm.category);
    const categoryName = catObj ? catObj.name : 'Equipaje';

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        categoryName,
        inStock: (productForm.stock || 0) > 0
      });
      showToast(`Producto "${productForm.name}" actualizado`);
    } else {
      addProduct({
        name: productForm.name!,
        slug: productForm.name!.toLowerCase().replace(/\s+/g, '-'),
        category: productForm.category || 'cabina',
        categoryName,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        shortDescription: productForm.shortDescription || '',
        description: productForm.description || '',
        images: productForm.images && productForm.images.length > 0 ? productForm.images : ['/src/assets/images/product_polycarbonate_cabin_1792168452570.jpg'],
        colors: productForm.colors || [{ name: 'Negro', hex: '#000000' }],
        sizes: productForm.sizes || ['Estándar'],
        dimensions: productForm.dimensions,
        weight: productForm.weight,
        volume: productForm.volume,
        material: productForm.material,
        features: productForm.features || ['Cerradura TSA'],
        stock: Number(productForm.stock) || 1,
        inStock: (Number(productForm.stock) || 1) > 0,
        lowStockThreshold: Number(productForm.lowStockThreshold) || 3,
        rating: 4.9,
        reviewsCount: 12
      });
      showToast(`Nuevo producto "${productForm.name}" añadido al catálogo`);
    }

    setIsProductModalOpen(false);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(draftConfig);
    showToast('Configuración del negocio guardada y aplicada en vivo');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-stone-900 pb-16">
      
      {/* Admin Top Header */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-0.5 rounded-lg bg-[#0080FF] border border-sky-400/40">
              <img
                src={config.logoUrl || '/src/assets/images/cases.jfif'}
                alt={config.storeName}
                className="h-7 w-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-bold text-lg text-white">
              {config.storeName}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider bg-slate-800/80 px-2.5 py-1 rounded">
              Panel Administrativo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0080FF] hover:bg-[#006ee0] text-white text-xs font-medium rounded-lg transition-all duration-150 active:scale-95 shadow-2xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver tienda pública</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer active:scale-98 ${
              activeTab === 'kpis'
                ? 'bg-[#0080FF] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-[#0080FF] border border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas & Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer active:scale-98 ${
              activeTab === 'products'
                ? 'bg-[#0080FF] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-[#0080FF] border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestión de Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer active:scale-98 ${
              activeTab === 'orders'
                ? 'bg-[#0080FF] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-[#0080FF] border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Gestión de Pedidos ({orders.length})</span>
            {pendingOrders.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#0080FF] flex items-center justify-center text-[10px] font-mono-num font-bold">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setDraftConfig(config);
              setActiveTab('config');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer active:scale-98 ${
              activeTab === 'config'
                ? 'bg-[#0080FF] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-[#0080FF] border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración de Marca</span>
          </button>
        </div>

        {/* TAB 1: KPIS & METRICS */}
        {activeTab === 'kpis' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Metric KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Facturación Total</span>
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-stone-900 font-mono-num">
                  {config.currencySymbol}{totalSalesRevenue.toLocaleString()}
                </p>
                <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>En pedidos registrados en la plataforma</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Pedidos Recibidos</span>
                  <div className="p-2 bg-stone-100 text-stone-700 rounded-lg">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-stone-900 font-mono-num">
                  {orders.length}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  {pendingOrders.length} pendiente(s) de confirmación
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Artículos Activos</span>
                  <div className="p-2 bg-stone-100 text-stone-700 rounded-lg">
                    <Boxes className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-stone-900 font-mono-num">
                  {products.length}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Distribuidos en {STORE_CATEGORIES.length} categorías
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Alertas de Stock Bajo</span>
                  <div className={`p-2 rounded-lg ${lowStockProducts.length > 0 ? 'bg-amber-50 text-amber-700' : 'bg-stone-100 text-stone-500'}`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-stone-900 font-mono-num">
                  {lowStockProducts.length}
                </p>
                <p className="text-[11px] text-amber-800 mt-1">
                  Modelos con &le; 4 unidades disponibles
                </p>
              </div>
            </div>

            {/* Low stock table & Recent orders split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Orders Overview (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-stone-900 font-display">
                    Últimos Pedidos Registrados
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-stone-500 hover:text-stone-900 underline"
                  >
                    Ver todos ({orders.length})
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-stone-900">#{ord.orderNumber}</span>
                          <span className="text-stone-400">·</span>
                          <span className="font-medium text-stone-800">{ord.customerName}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {ord.items.length} artículo(s) · {new Date(ord.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-bold font-mono-num text-stone-900">
                          {config.currencySymbol}{ord.total}
                        </span>
                        <div className="mt-0.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            ord.status === 'entregado' ? 'bg-emerald-100 text-emerald-800' :
                            ord.status === 'enviado' ? 'bg-blue-100 text-blue-800' :
                            ord.status === 'preparando' ? 'bg-purple-100 text-purple-800' :
                            ord.status === 'confirmado' ? 'bg-stone-200 text-stone-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low stock alerts (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="font-bold text-sm text-stone-900 font-display mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Control de Inventario Crítico</span>
                </h3>

                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-stone-500 py-6 text-center">
                    Todos los productos cuentan con stock suficiente.
                  </p>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {lowStockProducts.slice(0, 5).map((p) => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="truncate pr-2">
                          <p className="font-medium text-stone-900 truncate">{p.name}</p>
                          <p className="text-[11px] text-stone-500">{p.categoryName}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono-num font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs">
                            {p.stock} unid.
                          </span>
                          <button
                            onClick={() => {
                              updateProduct(p.id, { stock: p.stock + 5 });
                              showToast(`Stock de "${p.name}" aumentado a ${p.stock + 5}`);
                            }}
                            className="p-1 text-stone-500 hover:text-stone-900 bg-stone-100 rounded"
                            title="Reponer +5 unidades"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  Inventario de Artículos de Viaje
                </h3>
                <p className="text-xs text-stone-500">
                  Crea, modifica, ajusta existencias o sube nuevas fotografías de catálogo.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#121316] text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Nuevo Producto</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] text-stone-600 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Artículo</th>
                      <th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4">Precio</th>
                      <th className="py-3 px-4">Existencias</th>
                      <th className="py-3 px-4">Variantes</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 p-1 shrink-0">
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-stone-900">{prod.name}</p>
                              <p className="text-[11px] text-stone-400 line-clamp-1">{prod.shortDescription}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-stone-600">
                          {prod.categoryName}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-mono-num font-bold text-stone-900">
                            {config.currencySymbol}{prod.price}
                          </div>
                          {prod.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through font-mono-num">
                              {config.currencySymbol}{prod.originalPrice}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateProduct(prod.id, { stock: Math.max(0, prod.stock - 1) })}
                              className="w-5 h-5 rounded border border-stone-300 flex items-center justify-center text-stone-500 hover:bg-stone-100"
                            >
                              -
                            </button>
                            <span className={`font-mono-num font-bold px-1.5 text-xs ${prod.stock <= prod.lowStockThreshold ? 'text-amber-700' : 'text-stone-900'}`}>
                              {prod.stock}
                            </span>
                            <button
                              onClick={() => updateProduct(prod.id, { stock: prod.stock + 1 })}
                              className="w-5 h-5 rounded border border-stone-300 flex items-center justify-center text-stone-500 hover:bg-stone-100"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {prod.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-stone-300"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                              title="Editar producto"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Eliminar "${prod.name}" del catálogo?`)) {
                                  deleteProduct(prod.id);
                                  showToast(`Producto "${prod.name}" eliminado`);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                Pedidos Generados para WhatsApp
              </h3>
              <p className="text-xs text-stone-500">
                Supervisa el estado logístico de cada pedido recibido por el canal de mensajería.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] text-stone-600 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">N° Pedido</th>
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">WhatsApp</th>
                      <th className="py-3 px-4">Modalidad</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Detalle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900">
                          #{ord.orderNumber}
                        </td>
                        <td className="py-3 px-4 text-stone-500">
                          {new Date(ord.createdAt).toLocaleDateString()} {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-4 font-medium text-stone-900">
                          {ord.customerName}
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          <a
                            href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>{ord.customerPhone}</span>
                          </a>
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          {ord.deliveryMethod === 'delivery' ? 'Domicilio' : 'Retiro'}
                        </td>
                        <td className="py-3 px-4 font-mono-num font-bold text-stone-900">
                          {config.currencySymbol}{ord.total}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value as OrderStatus);
                              showToast(`Estado de #${ord.orderNumber} cambiado a ${e.target.value}`);
                            }}
                            className="text-xs bg-white border border-stone-300 rounded px-2 py-1 text-stone-800 font-medium focus:ring-1 focus:ring-stone-900 focus:outline-none"
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="preparando">Preparando</option>
                            <option value="enviado">Enviado</option>
                            <option value="entregado">Entregado</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewingOrder(ord)}
                              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                              title="Ver ficha completa"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Eliminar registro del pedido #${ord.orderNumber}?`)) {
                                  deleteOrder(ord.id);
                                  showToast(`Pedido #${ord.orderNumber} eliminado`);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar pedido"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STORE & BRAND CONFIG */}
        {activeTab === 'config' && (
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                Identidad y Configuración de Negocio
              </h3>
              <p className="text-xs text-stone-500">
                Personaliza el nombre de la tienda, subtítulos, número de WhatsApp, moneda y políticas.
              </p>
            </div>

            <form onSubmit={handleSaveConfig} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nombre del Negocio / Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={draftConfig.storeName}
                    onChange={(e) => setDraftConfig({ ...draftConfig, storeName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-400 mt-0.5">Nombre centralizado en toda la tienda.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Subtítulo de Marca
                  </label>
                  <input
                    type="text"
                    value={draftConfig.subtitle}
                    onChange={(e) => setDraftConfig({ ...draftConfig, subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Ruta o URL del Logotipo de Marca
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={draftConfig.logoUrl || ''}
                    onChange={(e) => setDraftConfig({ ...draftConfig, logoUrl: e.target.value })}
                    placeholder="/src/assets/images/cases.jfif"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                  {draftConfig.logoUrl && (
                    <div className="h-9 px-2 bg-stone-100 rounded border border-stone-200 flex items-center justify-center shrink-0">
                      <img
                        src={draftConfig.logoUrl}
                        alt="Vista previa logo"
                        className="h-7 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">Por defecto utiliza la imagen de logotipo /src/assets/images/cases.jfif</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    WhatsApp para Pedidos (Internacional) *
                  </label>
                  <input
                    type="text"
                    required
                    value={draftConfig.whatsappNumber}
                    onChange={(e) => setDraftConfig({ ...draftConfig, whatsappNumber: e.target.value })}
                    placeholder="Ej. 5491123456789"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-400 mt-0.5">Solo dígitos con código de país.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Símbolo de Moneda
                  </label>
                  <input
                    type="text"
                    value={draftConfig.currencySymbol}
                    onChange={(e) => setDraftConfig({ ...draftConfig, currencySymbol: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Código de Moneda
                  </label>
                  <input
                    type="text"
                    value={draftConfig.currencyCode}
                    onChange={(e) => setDraftConfig({ ...draftConfig, currencyCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Umbral para Envío Gratis
                  </label>
                  <input
                    type="number"
                    value={draftConfig.freeShippingThreshold}
                    onChange={(e) => setDraftConfig({ ...draftConfig, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Tarifa Plana de Envío
                  </label>
                  <input
                    type="number"
                    value={draftConfig.flatShippingRate}
                    onChange={(e) => setDraftConfig({ ...draftConfig, flatShippingRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Dirección del Showroom
                  </label>
                  <input
                    type="text"
                    value={draftConfig.addressDisplay}
                    onChange={(e) => setDraftConfig({ ...draftConfig, addressDisplay: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Horario de Atención
                  </label>
                  <input
                    type="text"
                    value={draftConfig.hoursDisplay}
                    onChange={(e) => setDraftConfig({ ...draftConfig, hoursDisplay: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Texto de la Barra Superior de Anuncios
                </label>
                <input
                  type="text"
                  value={draftConfig.announcementText}
                  onChange={(e) => setDraftConfig({ ...draftConfig, announcementText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    resetConfigToDefault();
                    setDraftConfig(config);
                    showToast('Configuración restablecida a valores iniciales');
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer valores de muestra</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0080FF] hover:bg-[#006ee0] text-white rounded-lg text-xs font-semibold transition-all duration-150 active:scale-98 flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar y Aplicar Cambios</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 p-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="text-base font-bold text-stone-900 font-display">
                  {editingProduct ? `Editar: ${editingProduct.name}` : 'Añadir Nuevo Artículo'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Ej. Voyager Hardshell Cabin 55cm"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Categoría</label>
                    <select
                      value={productForm.category || 'cabina'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    >
                      {STORE_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Precio Actual ({config.currencySymbol}) *</label>
                    <input
                      type="number"
                      required
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Precio Anterior / Tachado</label>
                    <input
                      type="number"
                      value={productForm.originalPrice || ''}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Stock Disponible</label>
                    <input
                      type="number"
                      value={productForm.stock || 0}
                      onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Material</label>
                    <input
                      type="text"
                      value={productForm.material || ''}
                      onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                      placeholder="Ej. Policarbonato Makrolon®, Cuero, etc."
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Descripción Breve</label>
                  <input
                    type="text"
                    value={productForm.shortDescription || ''}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Descripción Completa</label>
                  <textarea
                    rows={3}
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Fotografía Principal (Ruta o URL de imagen)
                  </label>
                  <input
                    type="text"
                    value={productForm.images?.[0] || ''}
                    onChange={(e) => {
                      const newImages = [...(productForm.images || [])];
                      newImages[0] = e.target.value;
                      setProductForm({ ...productForm, images: newImages });
                    }}
                    placeholder="/src/assets/images/..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0080FF] hover:bg-[#006ee0] text-white rounded-lg font-semibold transition-all duration-150 active:scale-98 shadow-sm cursor-pointer"
                  >
                    Guardar Producto
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* Order Detail View Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setViewingOrder(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 p-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    Pedido #{viewingOrder.orderNumber}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Registrado el {new Date(viewingOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <p><strong>Cliente:</strong> {viewingOrder.customerName}</p>
                  <p><strong>WhatsApp:</strong> {viewingOrder.customerPhone}</p>
                  {viewingOrder.customerEmail && <p><strong>Email:</strong> {viewingOrder.customerEmail}</p>}
                  <p><strong>Modalidad:</strong> {viewingOrder.deliveryMethod === 'delivery' ? `Envío a domicilio (${viewingOrder.deliveryAddress}, ${viewingOrder.city || ''})` : 'Retiro en showroom'}</p>
                  {viewingOrder.notes && <p><strong>Notas:</strong> {viewingOrder.notes}</p>}
                </div>

                <div>
                  <strong className="block text-stone-700 uppercase tracking-wider mb-2 text-[11px]">Artículos:</strong>
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg p-2 max-h-36 overflow-y-auto">
                    {viewingOrder.items.map((it, idx) => (
                      <div key={idx} className="py-1.5 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-stone-900">{it.product.name}</p>
                          <p className="text-[10px] text-stone-500">Color: {it.selectedColor} · Medida: {it.selectedSize} · x{it.quantity}</p>
                        </div>
                        <span className="font-mono-num font-bold text-stone-900">
                          {config.currencySymbol}{it.product.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-sm font-bold border-t border-stone-200">
                  <span>Total Pedido:</span>
                  <span className="font-mono-num text-base text-stone-900">
                    {config.currencySymbol}{viewingOrder.total} {config.currencyCode}
                  </span>
                </div>

                {viewingOrder.whatsappMessage && (
                  <div>
                    <strong className="block text-stone-700 uppercase tracking-wider mb-1 text-[11px]">
                      Texto generado para WhatsApp:
                    </strong>
                    <div className="p-3 bg-stone-100 rounded-lg font-mono text-[11px] whitespace-pre-line max-h-32 overflow-y-auto">
                      {viewingOrder.whatsappMessage}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setViewingOrder(null)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                >
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
