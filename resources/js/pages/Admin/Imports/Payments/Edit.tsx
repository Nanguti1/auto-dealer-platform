import adminRoutes from '@/routes/admin';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import PaymentForm from '@/components/admin/imports/payment-form';
import type { ImportPayment } from '@/components/admin/imports/types';
import type { PageProps } from '@inertiajs/core';

interface Props extends PageProps {
  importPayment: ImportPayment;
  importRequests: Array<{ id: number; reference_number: string; origin_country: string }>;
}

export default function Edit({ importPayment: payment, importRequests }: Props) {
  return (
    <ImportShell title="Edit Import Payment" description="Update payment details for this import request." actions={<ImportBackButton href={adminRoutes.importPayments.show(payment.id).url} />}>
      <PaymentForm payment={payment} action={adminRoutes.importPayments.update(payment.id).action} method="put" importRequests={importRequests} />
    </ImportShell>
  );
}
