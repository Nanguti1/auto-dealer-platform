import { formatCurrency, formatNumber, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import type { ReservationRecord } from './types';

export { formatCurrency, formatNumber };

export function formatDate(value?: string): string {
  return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';
}

export function formatDateTime(value?: string): string {
  return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
}

export function vehicleName(reservation?: ReservationRecord): string {
  if (!reservation?.vehicle) return 'No vehicle';
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