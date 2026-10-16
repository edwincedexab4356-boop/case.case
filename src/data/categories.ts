import { Category } from '../types/store';

export const STORE_CATEGORIES: Category[] = [
  {
    id: 'cabina',
    slug: 'cabina',
    name: 'Maletas de cabina',
    description: 'Dimensiones aprobadas IATA para llevar a bordo sin facturar.',
    iconName: 'Luggage'
  },
  {
    id: 'medianas',
    slug: 'medianas',
    name: 'Maletas medianas',
    description: 'Capacidad equilibrada para viajes de 5 a 10 días.',
    iconName: 'PackageCheck'
  },
  {
    id: 'grandes',
    slug: 'grandes',
    name: 'Maletas grandes',
    description: 'Máximo volumen para travesías largas y mudanzas temporales.',
    iconName: 'Boxes'
  },
  {
    id: 'juegos',
    slug: 'juegos',
    name: 'Juegos de maletas',
    description: 'Sets combinados de 2 y 3 piezas con estética uniforme.',
    iconName: 'Layers'
  },
  {
    id: 'mochilas',
    slug: 'mochilas',
    name: 'Mochilas',
    description: 'Ergonomía urbana, compartimento tech y resistencia hidrófuga.',
    iconName: 'Backpack'
  },
  {
    id: 'bolsos',
    slug: 'bolsos',
    name: 'Bolsos de viaje',
    description: 'Duffels de fin de semana, lonas enceradas y cuero genuino.',
    iconName: 'Briefcase'
  },
  {
    id: 'maletines',
    slug: 'maletines',
    name: 'Maletines y bolsos de mano',
    description: 'Diseño ejecutivo y portabilidad rápida para viajes de negocios.',
    iconName: 'FolderKanban'
  },
  {
    id: 'organizadores',
    slug: 'organizadores',
    name: 'Neceseres y organizadores',
    description: 'Cubos de compresión y neceseres higiénicos ultra compactos.',
    iconName: 'Grid'
  },
  {
    id: 'accesorios',
    slug: 'accesorios',
    name: 'Candados y accesorios',
    description: 'Candados certificados TSA, correas, básculas y fundas de protección.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'ofertas',
    slug: 'ofertas',
    name: 'Ofertas',
    description: 'Descuentos exclusivos en modelos seleccionados por tiempo limitado.',
    iconName: 'Percent'
  }
];
