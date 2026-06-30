import { customerName } from '@/components/admin/customers/helpers';
import { formatCurrency, formatNumber, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import type { FinanceApplication, FinanceUser, FinanceVehicle, PaymentInstallment } from './types';

export { formatCurrency, formatNumber };

export function formatDate(value?: string): string {
  return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';
}

export function formatDateTime(value?: string): string {
  return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
}

export function userName(user?: FinanceUser): string {
  return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned');
}

export function applicantName(application: FinanceApplication): string {
  return application.customer ? customerName(application.customer) : userName(application.user);
}

export function vehicleName(vehicle?: FinanceVehicle): string {
  return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]);
}

export function officerName(application: FinanceApplication): string {
  return userName(application.assigned_user ?? application.assignedUser ?? application.officer);
}

export function deposit(application: FinanceApplication): string | number | undefined {
  return application.down_payment ?? application.deposit;
}

export function term(application: FinanceApplication): number | undefined {
  return application.term_months ?? application.loan_term;
}

export function monthlyPayment(application: FinanceApplication): string | number | undefined {
  return application.estimated_monthly_payment ?? application.monthly_payment;
}

export function installmentNumber(installment: PaymentInstallment, index: number): number {
  return installment.installment ?? installment.number ?? index + 1;
}
