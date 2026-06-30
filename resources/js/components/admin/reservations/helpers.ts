import { vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { ReservationRecord } from './types';

export { formatDate, formatDateTime, formatCurrency, formatNumber };

export function vehicleName(reservation?: ReservationRecord): string {
  if (!reservation?.vehicle) {
return 'No vehicle';
}

  return inventoryVehicleName(reservation.vehicle as Parameters<typeof inventoryVehicleName>[0]);
}

export function customerName(reservation?: ReservationRecord): string {
  return reservation?.user?.name ?? reservation?.user?.email ?? 'No customer';
}

export function statusBadge(status: string): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } {
  const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pending', variant: 'secondary' },
    confirmed: { label: 'Confirmed', variant: 'default' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
    completed: { label: 'Completed', variant: 'default' },
    expired: { label: 'Expired', variant: 'outline' },
  };

  return statusMap[status] || { label: status, variant: 'outline' };
}