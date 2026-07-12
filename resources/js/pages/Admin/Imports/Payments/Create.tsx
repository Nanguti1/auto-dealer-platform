import adminRoutes from '@/routes/admin';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import PaymentForm from '@/components/admin/imports/payment-form';
import type { ImportPayment } from '@/components/admin/imports/types';
import type { PageProps } from '@inertiajs/core';

interface Props extends PageProps {
  importRequests: Array<{ id: number; reference_number: string; origin_country: string }>;
}

export default function Create({ importRequests }: Props) {
  return (
    <ImportShell title="Create Import Payment" description="Add a new payment for an import request." actions={<ImportBackButton />}>
      <PaymentForm payment={{} as ImportPayment} action={adminRoutes.importPayments.store().url} method="post" importRequests={importRequests} />
    </ImportShell>
  );
}
