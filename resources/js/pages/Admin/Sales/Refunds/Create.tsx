import adminRoutes from '@/routes/admin';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import RefundForm from '@/components/admin/payments/refund-form';

export default function Create() {
  return (
    <PaymentShell title="Create Refund" description="Process a refund for an existing payment transaction." actions={<PaymentBackButton />}>
      <RefundForm action={adminRoutes.refunds.store().url} />
    </PaymentShell>
  );
}
