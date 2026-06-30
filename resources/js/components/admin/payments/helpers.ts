import { formatCurrency, formatNumber, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { customerName } from '@/components/admin/customers/helpers';
import type { Payment, PaymentUser, PaymentVehicle } from './types';

export { formatCurrency, formatNumber };
export const formatDateTime = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
export const formatDate = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';
export function userName(user?: PaymentUser): string { return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned'); }
export function vehicleName(vehicle?: PaymentVehicle): string { return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]); }
export function customerNameFromPayment(payment: Payment): string { return payment.customer ? customerName(payment.customer) : userName(payment.user); }
export function paymentTypeName(payment?: Payment): string { return payment?.metadata?.payment_type ?? payment?.method ?? 'Payment'; }
