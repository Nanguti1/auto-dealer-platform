import type { Filters } from './types';

export const formatCurrency = (value?: string | number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value ?? 0));
export const formatNumber = (value?: string | number) => new Intl.NumberFormat('en-US').format(Number(value ?? 0));
export const compact = (filters: Filters) => Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== '' && value !== false));
export const vehicleName = (vehicle?: { title?: string; year?: number; make?: { name?: string }; model?: { name?: string }; stock_number?: string }) => vehicle?.title ?? ([vehicle?.year, vehicle?.make?.name, vehicle?.model?.name].filter(Boolean).join(' ') || vehicle?.stock_number || 'Untitled vehicle');
export const imageUrl = (path?: string) => path ? (path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`) : '/placeholder.svg';
