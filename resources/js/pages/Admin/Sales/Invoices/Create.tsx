import adminRoutes from '@/routes/admin';
import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import InvoiceForm from '@/components/admin/sales/invoice-form';
import type { Invoice } from '@/components/admin/payments/types';

export default function Create() {
  return (
    <SalesShell title="Create Invoice" description="Generate a new invoice for a customer purchase." actions={<SalesBackButton />}>
      <InvoiceForm invoice={{} as Invoice} action={adminRoutes.invoices.store().url} method="post" />
    </SalesShell>
  );
}
