import adminRoutes from '@/routes/admin';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import RefundForm from '@/components/admin/payments/refund-form';
import type { Refund } from '@/components/admin/payments/types';

export default function Edit({ refund, payments }: { refund: Refund; payments?: Array<{ id: number; amount: number; customer?: { name: string } }> }) {
  return (
    <PaymentShell title="Edit Refund" description="Update refund details and processing information." actions={<PaymentBackButton href={adminRoutes.refunds.show(refund.id).url} />}>
      <RefundForm refund={refund} action={adminRoutes.refunds.update(refund.id).url} payments={payments} />
    </PaymentShell>
  );
}
