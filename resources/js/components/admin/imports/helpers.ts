import { formatCurrency, formatNumber, imageUrl, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { customerName } from '@/components/admin/customers/helpers';
import type { ImportRequest, ImportUser, ImportVehicle, ImportSupplier } from './types';

export { formatCurrency, formatNumber, imageUrl };
export const formatDateTime = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
export const formatDate = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';
export function userName(user?: ImportUser): string { return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned'); }
export function vehicleName(vehicle?: ImportVehicle): string { return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]); }
export function supplierName(supplier?: ImportSupplier): string { return supplier?.company_name ?? supplier?.name ?? 'Unknown supplier'; }
export function requesterName(request: ImportRequest): string { return request.customer ? customerName(request.customer) : userName(request.user); }
export function importVehicleName(request?: ImportRequest): string { return request?.vehicle ? vehicleName(request.vehicle) : request?.request_data?.vehicle_name || 'Import vehicle'; }
