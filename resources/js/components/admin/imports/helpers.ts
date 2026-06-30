import { customerName } from '@/components/admin/customers/helpers';
import { imageUrl, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { ImportRequest, ImportUser, ImportVehicle, ImportSupplier } from './types';

export { formatDate, formatDateTime, formatCurrency, formatNumber, imageUrl };

export function userName(user?: ImportUser): string {
  return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned');
}

export function vehicleName(vehicle?: ImportVehicle): string {
  return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]);
}

export function supplierName(supplier?: ImportSupplier): string {
  return supplier?.company_name ?? supplier?.name ?? 'Unknown supplier';
}

export function requesterName(request: ImportRequest): string {
  return request.customer ? customerName(request.customer) : userName(request.user);
}

export function importVehicleName(request?: ImportRequest): string {
  return request?.vehicle ? vehicleName(request.vehicle) : request?.request_data?.vehicle_name || 'Import vehicle';
}
