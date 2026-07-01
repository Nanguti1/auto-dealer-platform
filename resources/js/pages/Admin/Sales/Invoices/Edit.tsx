import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import InvoiceForm from '@/components/admin/sales/invoice-form';
import type { Invoice } from '@/components/admin/payments/types';

export default function Edit({ invoice }: { invoice: Invoice }) {
  return (
    <SalesShell title="Edit Invoice" description="Update invoice details and line items." actions={<SalesBackButton href={`/admin/invoices/${invoice.id}`} />}>
      <InvoiceForm invoice={invoice} action={`/admin/invoices/${invoice.id}`} method="put" />
    </SalesShell>
  );
}
