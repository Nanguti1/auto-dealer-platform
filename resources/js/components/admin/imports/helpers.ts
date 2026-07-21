import { userName, vehicleName } from '@/lib/name-utils';
import { customerName } from '@/components/admin/customers/helpers';
import { imageUrl } from '@/components/admin/inventory/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { ImportRequest, ImportUser, ImportVehicle, ImportSupplier } from './types';

export { formatDate, formatDateTime, formatCurrency, formatNumber, imageUrl, userName, vehicleName };

export function supplierName(supplier?: ImportSupplier): string {
  return supplier?.company_name ?? 'Unknown supplier';
}

export function requesterName(request: ImportRequest): string {
  return request.customer ? customerName(request.customer) : userName(request.user);
}

export function importVehicleName(request?: ImportRequest): string {
  return request?.vehicle ? vehicleName(request.vehicle) : request?.request_data?.vehicle_name || 'Import vehicle';
}
