import adminRoutes from '@/routes/admin';
import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import ReceiptForm from '@/components/admin/sales/receipt-form';
import type { Receipt } from '@/components/admin/payments/types';

interface Payment {
  id: number;
  amount: number;
  currency: string;
  payment_method: string;
  customer?: {
    id: number;
    name: string;
    email: string;
  };
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

export default function Create({ payments = [], customers = [] }: { payments?: Payment[]; customers?: Customer[] }) {
  return (
    <SalesShell title="Create Receipt" description="Generate a new receipt for a payment transaction." actions={<SalesBackButton />}>
      <ReceiptForm receipt={{} as Receipt} action={adminRoutes.receipts.store().url} method="post" payments={payments} customers={customers} />
    </SalesShell>
  );
}
