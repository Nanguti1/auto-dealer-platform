import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import InvoiceForm from '@/components/admin/sales/invoice-form';
import type { Invoice } from '@/components/admin/payments/types';

interface Vehicle {
  id: number;
  stock_number: string;
  make?: { id: number; name: string };
  vehicleModel?: { id: number; name: string };
}

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  customer_number: string;
}

interface Reservation {
  id: number;
  customer?: {
    first_name: string;
    last_name: string;
  };
}

export default function Edit({ invoice, vehicles = [], customers = [], reservations = [] }: { invoice: Invoice; vehicles?: Vehicle[]; customers?: Customer[]; reservations?: Reservation[] }) {
  return (
    <SalesShell title="Edit Invoice" description="Update invoice details and line items." actions={<SalesBackButton href={`/admin/invoices/${invoice.id}`} />}>
      <InvoiceForm invoice={invoice} action={`/admin/invoices/${invoice.id}`} method="put" vehicles={vehicles} customers={customers} reservations={reservations} />
    </SalesShell>
  );
}
