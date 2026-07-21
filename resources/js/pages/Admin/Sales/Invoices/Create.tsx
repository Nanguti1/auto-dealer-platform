import adminRoutes from '@/routes/admin';
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

export default function Create({ vehicles = [], customers = [], reservations = [] }: { vehicles?: Vehicle[]; customers?: Customer[]; reservations?: Reservation[] }) {
  return (
    <SalesShell title="Create Invoice" description="Generate a new invoice for a customer purchase." actions={<SalesBackButton />}>
      <InvoiceForm invoice={{} as Invoice} action={adminRoutes.invoices.store().url} method="post" vehicles={vehicles} customers={customers} reservations={reservations} />
    </SalesShell>
  );
}
