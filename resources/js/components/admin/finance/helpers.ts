import { userName as sharedUserName, vehicleName as sharedVehicleName } from '@/lib/name-utils';
import { customerName } from '@/components/admin/customers/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { FinanceApplication, FinanceUser, FinanceVehicle, PaymentInstallment } from './types';

export { formatDate, formatDateTime, formatNumber, sharedUserName as userName, sharedVehicleName as vehicleName };
export { formatCurrency };

export function applicantName(application: FinanceApplication): string {
  return application.customer ? customerName(application.customer) : sharedUserName(application.user);
}

export function officerName(application: FinanceApplication): string {
  return sharedUserName(application.assigned_user ?? application.assignedUser ?? application.officer);
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
