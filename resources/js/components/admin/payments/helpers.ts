import { vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { customerName } from '@/components/admin/customers/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { Payment, PaymentUser, PaymentVehicle } from './types';

export { formatDate, formatDateTime, formatCurrency, formatNumber };

export function userName(user?: PaymentUser): string {
  return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned');
}

export function vehicleName(vehicle?: PaymentVehicle): string {
  return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]);
}

export function customerNameFromPayment(payment: Payment): string {
  return payment.customer ? customerName(payment.customer) : userName(payment.user);
}

export function paymentTypeName(payment?: Payment): string {
  return payment?.metadata?.payment_type ?? payment?.method ?? 'Payment';
}
