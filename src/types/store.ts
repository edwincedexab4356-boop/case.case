export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // e.g. 'cabina', 'medianas', 'grandes', etc.
  categoryName: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  images: string[];
  colors: ProductVariantColor[];
  sizes: string[];
  dimensions?: string;
  weight?: string;
  volume?: string;
  material?: string;
  features: string[];
  inStock: boolean;
  stock: number;
  lowStockThreshold: number;
  featured?: boolean;
  isDeal?: boolean;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount?: number;
  iconName?: string;
}

export interface CartItem {
  id: string; // generated composite ID: `${product.id}-${color}-${size}`
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type OrderStatus = 'pendiente' | 'confirmado' | 'preparando' | 'enviado' | 'entregado';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryAddress?: string;
  city?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  whatsappMessage?: string;
  isDemo?: boolean;
}

export interface StoreConfig {
  storeName: string;
  subtitle: string;
  brandTagline: string;
  logoUrl: string;
  currencySymbol: string;
  currencyCode: string;
  whatsappNumber: string; // International format without + or with +, e.g. "5491123456789"
  supportEmail: string;
  phoneDisplay: string;
  addressDisplay: string;
  hoursDisplay: string;
  freeShippingThreshold: number;
  flatShippingRate: number;
  announcementText: string;
  showAnnouncement: boolean;
  adminPin: string;
}
