import PaymentForm from '@/components/admin/payments/payment-form';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';

export default function Create() {
  return (
    <PaymentShell title="Create Payment" description="Record a new customer payment transaction." actions={<PaymentBackButton />}>
      <PaymentForm action="/admin/payments" />
    </PaymentShell>
  );
}
