import adminRoutes from '@/routes/admin';
import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import InvoiceForm from '@/components/admin/sales/invoice-form';
import type { Invoice } from '@/components/admin/payments/types';

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Vehicle {
  id: number;
  stock_number: string;
  make: { id: number; name: string };
  model: { id: number; name: string };
}

interface Reservation {
  id: number;
  reservation_number: string;
  customer: { id: number; name: string };
}

export default function Create({ customers = [], vehicles = [], reservations = [] }: { customers?: Customer[]; vehicles?: Vehicle[]; reservations?: Reservation[] }) {
  return (
    <SalesShell title="Create Invoice" description="Generate a new invoice for a customer purchase." actions={<SalesBackButton />}>
      <InvoiceForm invoice={{} as Invoice} action={adminRoutes.invoices.store().url} method="post" customers={customers} vehicles={vehicles} reservations={reservations} />
    </SalesShell>
  );
}
