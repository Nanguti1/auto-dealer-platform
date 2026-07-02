import adminRoutes from '@/routes/admin';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import PaymentForm from '@/components/admin/imports/payment-form';
import type { ImportPayment } from '@/components/admin/imports/types';

export default function Create() {
  return (
    <ImportShell title="Create Import Payment" description="Add a new payment for an import request." actions={<ImportBackButton />}>
      <PaymentForm payment={{} as ImportPayment} action={adminRoutes.importPayments.store().url} method="post" />
    </ImportShell>
  );
}
