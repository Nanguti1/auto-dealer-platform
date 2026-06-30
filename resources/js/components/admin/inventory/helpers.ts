import type { Filters } from './types';
import { formatCurrency, formatNumber } from '@/lib/format-utils';

export { formatCurrency, formatNumber };

export const compact = (filters: Filters) => Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== '' && value !== false));
export const vehicleName = (vehicle?: { title?: string; year?: number; make?: { name?: string }; model?: { name?: string }; stock_number?: string }) => vehicle?.title ?? ([vehicle?.year, vehicle?.make?.name, vehicle?.model?.name].filter(Boolean).join(' ') || vehicle?.stock_number || 'Untitled vehicle');
export const imageUrl = (path?: string) => path ? (path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`) : '/placeholder.svg';
