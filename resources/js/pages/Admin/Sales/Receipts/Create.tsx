import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import ReceiptForm from '@/components/admin/sales/receipt-form';
import type { Receipt } from '@/components/admin/payments/types';

export default function Create() {
  return (
    <SalesShell title="Create Receipt" description="Generate a new receipt for a payment transaction." actions={<SalesBackButton />}>
      <ReceiptForm receipt={{} as Receipt} action="/admin/receipts" method="post" />
    </SalesShell>
  );
}
