import { vehicleName as sharedVehicleName } from '@/lib/name-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { Filters } from './types';

export { formatCurrency, formatNumber, sharedVehicleName as vehicleName };

export const compact = (filters: Filters) => Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== '' && value !== false));
export const imageUrl = (path?: string) => path ? (path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`) : '/placeholder.svg';
