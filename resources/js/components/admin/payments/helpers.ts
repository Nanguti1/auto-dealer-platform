import { userName, vehicleName } from '@/lib/name-utils';
import { customerName } from '@/components/admin/customers/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { Payment, PaymentUser, PaymentVehicle } from './types';

export { formatDate, formatDateTime, formatCurrency, formatNumber, userName, vehicleName };

export function customerNameFromPayment(payment: Payment): string {
  return payment.customer ? customerName(payment.customer) : userName(payment.user);
}

export function paymentTypeName(payment?: Payment): string {
  return payment?.metadata?.payment_type ?? payment?.method ?? 'Payment';
}
