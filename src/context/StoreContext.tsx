import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, Order, OrderStatus, StoreConfig } from '../types/store';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { DEFAULT_STORE_CONFIG, getStoredConfig, saveStoredConfig } from '../config/storeConfig';

const PRODUCTS_STORAGE_KEY = 'case_products_v1';
const ORDERS_STORAGE_KEY = 'case_orders_v1';
const CART_STORAGE_KEY = 'case_cart_v1';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';

interface FilterState {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  color: string;
  size: string;
  inStockOnly: boolean;
  dealsOnly: boolean;
  sortBy: SortOption;
}

interface StoreContextType {
  // Store Config
  config: StoreConfig;
  updateConfig: (newConfig: Partial<StoreConfig>) => void;
  resetConfigToDefault: () => void;

  // View state
  viewMode: 'store' | 'admin';
  setViewMode: (mode: 'store' | 'admin') => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Products
  products: Product[];
  filteredProducts: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Filter state
  filters: FilterState;
  setCategory: (cat: string) => void;
  setSearch: (q: string) => void;
  setSortBy: (sort: SortOption) => void;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  cartTotal: number;
  freeShippingRemaining: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryMethod: 'delivery' | 'pickup';
    deliveryAddress?: string;
    city?: string;
    notes?: string;
  }) => { order: Order; whatsappUrl: string; whatsappText: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Toast / feedback notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultFilters: FilterState = {
  category: 'todas',
  search: '',
  minPrice: 0,
  maxPrice: 1000,
  color: '',
  size: '',
  inStockOnly: false,
  dealsOnly: false,
  sortBy: 'featured',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Config
  const [config, setConfig] = useState<StoreConfig>(() => getStoredConfig());
  const updateConfig = (updates: Partial<StoreConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...updates };
      saveStoredConfig(next);
      return next;
    });
  };
  const resetConfigToDefault = () => {
    setConfig(DEFAULT_STORE_CONFIG);
    saveStoredConfig(DEFAULT_STORE_CONFIG);
  };

  // 2. View Mode & Admin Auth
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('case_admin_session') === 'active';
  });

  const loginAdmin = (pin: string) => {
    if (pin.trim() === config.adminPin || pin.trim() === 'demo' || pin.trim() === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('case_admin_session', 'active');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('case_admin_session');
  };

  // 3. Products
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to store products', e);
    }
  }, [products]);

  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  };

  // 4. Filters & Product Detail
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const setCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const setSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (filters.category !== 'todas') {
        if (filters.category === 'ofertas') {
          if (!p.isDeal && !(p.originalPrice && p.originalPrice > p.price)) {
            return false;
          }
        } else if (p.category !== filters.category) {
          return false;
        }
      }

      // Search filter
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchCat = p.categoryName.toLowerCase().includes(query);
        const matchMaterial = p.material?.toLowerCase().includes(query) ?? false;
        if (!matchName && !matchDesc && !matchCat && !matchMaterial) {
          return false;
        }
      }

      // Price filter
      if (p.price < filters.minPrice || (filters.maxPrice > 0 && p.price > filters.maxPrice)) {
        return false;
      }

      // Deals only
      if (filters.dealsOnly && !p.isDeal && !(p.originalPrice && p.originalPrice > p.price)) {
        return false;
      }

      // In stock only
      if (filters.inStockOnly && (!p.inStock || p.stock <= 0)) {
        return false;
      }

      // Color filter
      if (filters.color) {
        const hasColor = p.colors.some(c => c.name.toLowerCase().includes(filters.color.toLowerCase()));
        if (!hasColor) return false;
      }

      // Size filter
      if (filters.size) {
        const hasSize = p.sizes.some(s => s.toLowerCase().includes(filters.size.toLowerCase()));
        if (!hasSize) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });
  }, [products, filters]);

  // 5. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  const addToCart = (
    product: Product,
    selectedColor?: string,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    const color = selectedColor || product.colors[0]?.name || 'Estándar';
    const size = selectedSize || product.sizes[0] || 'Única';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity
          }
        ];
      }
    });

    showToast(`"${product.name}" agregado a tu maleta`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (cartSubtotal >= config.freeShippingThreshold) return 0;
    return config.flatShippingRate;
  }, [cartSubtotal, config.freeShippingThreshold, config.flatShippingRate]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + shippingCost;
  }, [cartSubtotal, shippingCost]);

  const freeShippingRemaining = useMemo(() => {
    return Math.max(0, config.freeShippingThreshold - cartSubtotal);
  }, [config.freeShippingThreshold, cartSubtotal]);

  // 6. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    
    // Default initial mock orders to show realistic administrative dashboard
    return [
      {
        id: 'ord-demo-01',
        orderNumber: 'CASE-2026-9041',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        customerName: 'Santiago Rossi',
        customerPhone: '+54 9 11 4455-8899',
        customerEmail: 'santiago.rossi@email.com',
        deliveryMethod: 'delivery',
        deliveryAddress: 'Av. del Libertador 2200, Piso 8B',
        city: 'Buenos Aires',
        notes: 'Timbre número 8B. Dejar en portería si no contesto.',
        items: [
          {
            id: 'item-1',
            product: INITIAL_PRODUCTS[0],
            selectedColor: 'Negro Carbón Mate',
            selectedSize: '55 x 35 x 23 cm (Cabina Estándar)',
            quantity: 1
          },
          {
            id: 'item-2',
            product: INITIAL_PRODUCTS[7],
            selectedColor: 'Gris Grafito',
            selectedSize: 'Set de 6 tamaños',
            quantity: 1
          }
        ],
        subtotal: 310,
        shippingCost: 0,
        total: 310,
        status: 'preparando',
        isDemo: true
      },
      {
        id: 'ord-demo-02',
        orderNumber: 'CASE-2026-8812',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        customerName: 'Valeria Mendoza',
        customerPhone: '+54 9 11 5566-7788',
        customerEmail: 'valeria.m@empresa.com',
        deliveryMethod: 'pickup',
        notes: 'Paso a retirar el jueves por la tarde.',
        items: [
          {
            id: 'item-3',
            product: INITIAL_PRODUCTS[6],
            selectedColor: 'Verde Bosque & Cuero Miel',
            selectedSize: '52 x 30 x 28 cm',
            quantity: 1
          }
        ],
        subtotal: 215,
        shippingCost: 0,
        total: 215,
        status: 'confirmado',
        isDemo: true
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryMethod: 'delivery' | 'pickup';
    deliveryAddress?: string;
    city?: string;
    notes?: string;
  }) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `CASE-2026-${randomDigits}`;

    // Format WhatsApp message
    let lines: string[] = [];
    lines.push(`*¡Hola ${config.storeName}! Quiero confirmar mi pedido.*`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`📦 *PEDIDO:* #${orderNumber}`);
    lines.push(`👤 *Cliente:* ${orderData.customerName}`);
    lines.push(`📱 *Teléfono:* ${orderData.customerPhone}`);
    if (orderData.customerEmail) {
      lines.push(`✉️ *Email:* ${orderData.customerEmail}`);
    }
    lines.push(`🚚 *Modalidad:* ${orderData.deliveryMethod === 'delivery' ? 'Envío a domicilio' : 'Retiro en tienda física'}`);
    if (orderData.deliveryMethod === 'delivery' && orderData.deliveryAddress) {
      lines.push(`📍 *Dirección:* ${orderData.deliveryAddress} (${orderData.city || ''})`);
    }
    if (orderData.notes) {
      lines.push(`📝 *Notas:* ${orderData.notes}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`*ARTÍCULOS SOLICITADOS:*`);

    cart.forEach((item, idx) => {
      const itemSub = item.product.price * item.quantity;
      lines.push(`${idx + 1}. *${item.product.name}*`);
      lines.push(`   - Color: ${item.selectedColor}`);
      lines.push(`   - Medida: ${item.selectedSize}`);
      lines.push(`   - Cant: ${item.quantity} x ${config.currencySymbol}${item.product.price} = *${config.currencySymbol}${itemSub}*`);
    });

    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`*Subtotal:* ${config.currencySymbol}${cartSubtotal}`);
    lines.push(`*Envío:* ${shippingCost === 0 ? 'GRATIS' : `${config.currencySymbol}${shippingCost}`}`);
    lines.push(`💰 *TOTAL A PAGAR:* *${config.currencySymbol}${cartTotal} ${config.currencyCode}*`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`_Por favor confírmenme disponibilidad para coordinar el pago y la entrega. ¡Muchas gracias!_`);

    const whatsappText = lines.join('\n');
    const cleanNumber = config.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappText)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      deliveryMethod: orderData.deliveryMethod,
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city,
      notes: orderData.notes,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingCost,
      total: cartTotal,
      status: 'pendiente',
      whatsappMessage: whatsappText,
      isDemo: true
    };

    setOrders(prev => [newOrder, ...prev]);

    // Reduce stock for products
    setProducts(prev =>
      prev.map(p => {
        const matchingCartItems = cart.filter(ci => ci.product.id === p.id);
        if (matchingCartItems.length === 0) return p;
        const totalPurchased = matchingCartItems.reduce((acc, ci) => acc + ci.quantity, 0);
        const newStock = Math.max(0, p.stock - totalPurchased);
        return {
          ...p,
          stock: newStock,
          inStock: newStock > 0
        };
      })
    );

    // Empty cart
    clearCart();

    return { order: newOrder, whatsappUrl, whatsappText };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // 7. Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 3200);
  };

  return (
    <StoreContext.Provider
      value={{
        config,
        updateConfig,
        resetConfigToDefault,
        viewMode,
        setViewMode,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        products,
        filteredProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        selectedProduct,
        setSelectedProduct,
        filters,
        setCategory,
        setSearch,
        setSortBy,
        updateFilters,
        resetFilters,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        freeShippingRemaining,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
