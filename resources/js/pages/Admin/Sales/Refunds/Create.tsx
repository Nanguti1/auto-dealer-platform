import adminRoutes from '@/routes/admin';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import RefundForm from '@/components/admin/payments/refund-form';

export default function Create({ payments }: { payments?: Array<{ id: number; amount: number; customer?: { name: string } }> }) {
  return (
    <PaymentShell title="Create Refund" description="Process a refund for an existing payment transaction." actions={<PaymentBackButton />}>
      <RefundForm action={adminRoutes.refunds.store().url} payments={payments} />
    </PaymentShell>
  );
}
