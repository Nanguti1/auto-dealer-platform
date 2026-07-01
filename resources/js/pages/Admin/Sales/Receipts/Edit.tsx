import SalesShell, { SalesBackButton } from '@/components/admin/sales/sales-shell';
import ReceiptForm from '@/components/admin/sales/receipt-form';
import type { Receipt } from '@/components/admin/payments/types';

export default function Edit({ receipt }: { receipt: Receipt }) {
  return (
    <SalesShell title="Edit Receipt" description="Update receipt details and information." actions={<SalesBackButton href={`/admin/receipts/${receipt.id}`} />}>
      <ReceiptForm receipt={receipt} action={`/admin/receipts/${receipt.id}`} method="put" />
    </SalesShell>
  );
}
