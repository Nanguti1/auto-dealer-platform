import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import PaymentForm from '@/components/admin/imports/payment-form';
import type { ImportPayment } from '@/components/admin/imports/types';

export default function Edit({ payment }: { payment: ImportPayment }) {
  return (
    <ImportShell title="Edit Import Payment" description="Update payment details for this import request." actions={<ImportBackButton href={`/admin/import-payments/${payment.id}`} />}>
      <PaymentForm payment={payment} action={`/admin/import-payments/${payment.id}`} method="put" />
    </ImportShell>
  );
}
