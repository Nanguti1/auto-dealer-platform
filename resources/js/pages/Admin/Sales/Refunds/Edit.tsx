import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import RefundForm from '@/components/admin/payments/refund-form';
import type { Refund } from '@/components/admin/payments/types';

export default function Edit({ refund }: { refund: Refund }) {
  return (
    <PaymentShell title="Edit Refund" description="Update refund details and processing information." actions={<PaymentBackButton href={`/admin/refunds/${refund.id}`} />}>
      <RefundForm refund={refund} action={`/admin/refunds/${refund.id}`} />
    </PaymentShell>
  );
}
