import { formatCurrency } from '@/components/admin/payments/helpers';
import PaymentForm from '@/components/admin/payments/payment-form';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import type { Payment } from '@/components/admin/payments/types';

export default function Edit({ payment }: { payment: Payment }) {
  return (
    <PaymentShell title="Edit Payment" description={`Payment #${payment.id} · ${formatCurrency(payment.amount)}`} actions={<PaymentBackButton href={`/admin/payments/${payment.id}`} />}>
      <PaymentForm payment={payment} action={`/admin/payments/${payment.id}`} />
    </PaymentShell>
  );
}
