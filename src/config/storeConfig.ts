import { StoreConfig } from '../types/store';

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  storeName: 'cases',
  subtitle: 'Equipaje, estilo y libertad para viajar',
  brandTagline: 'Equipaje premium de diseño funcional para exploradores modernos',
  logoUrl: '/src/assets/images/cases.jfif',
  currencySymbol: '$',
  currencyCode: 'USD',
  whatsappNumber: '5491123456789',
  supportEmail: 'contacto@casesviajes.com',
  phoneDisplay: '+54 9 11 2345-6789',
  addressDisplay: 'Av. Libertador 4850, Distrito Diseño, CABA',
  hoursDisplay: 'Lun a Sáb: 10:00 - 20:00 hs',
  freeShippingThreshold: 180,
  flatShippingRate: 12,
  announcementText: 'Envío sin cargo en compras superiores a $180 · Garantía de 5 años en todas las maletas rígidas',
  showAnnouncement: true,
  adminPin: 'demo123'
};

const STORAGE_KEY = 'cases_store_config_v2';

export function getStoredConfig(): StoreConfig {
  if (typeof window === 'undefined') return DEFAULT_STORE_CONFIG;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_STORE_CONFIG;
    return { ...DEFAULT_STORE_CONFIG, ...JSON.parse(data) };
  } catch {
    return DEFAULT_STORE_CONFIG;
  }
}

export function saveStoredConfig(config: StoreConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save store configuration', e);
  }
}
