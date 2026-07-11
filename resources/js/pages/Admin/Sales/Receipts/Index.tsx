import { Link } from '@inertiajs/react';
import { Eye, Printer } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { customerName } from '@/components/admin/customers/helpers';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime } from '@/components/admin/payments/helpers';
import PaymentShell from '@/components/admin/payments/payment-shell';
import type { ReceiptFilters, ReceiptPagination, Receipt } from '@/components/admin/payments/types';
import { RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Button } from '@/components/ui/button';

export default function Index({ receipts, filters = {} }: { receipts: ReceiptPagination; filters?: ReceiptFilters }) {
  const formatCurrency = useFormatCurrency();
  
  const columns: Column<Receipt>[] = [
    { key: 'receipt_number', label: 'Receipt #', sortable: true, render: (row) => row.receipt_number ?? `RCP-${row.id}` },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/receipts/${row.id}`} className="font-medium hover:underline">{customerName(row.customer)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? 'No contact'}</p></div></div> },
    { key: 'amount', label: 'Amount', sortable: true, render: (row) => <div>{formatCurrency(row.amount)}<p className="text-xs text-muted-foreground">{row.currency ?? 'USD'}</p></div> },
    { key: 'payment_method', label: 'Payment method', sortable: true, render: (row) => row.payment_method ?? '—' },
    { key: 'issued_at', label: 'Issued date', sortable: true, render: (row) => formatDateTime(row.issued_at) },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  return (
    <PaymentShell title="Receipts" description="View and manage payment receipts for customer transactions.">
      <AdminDataTable
        rows={receipts}
        filters={filters}
        columns={columns}
        baseUrl="/admin/receipts"
        rowActions={(row) => (
          <RowActionsDropdown
            ariaLabel={`Actions for receipt ${row.id}`}
            actions={[
              {
                label: 'View',
                icon: <Eye />,
                href: `/admin/receipts/${row.id}`,
              },
              {
                label: 'Print',
                icon: <Printer />,
                href: `/admin/receipts/${row.id}/print`,
              },
            ]}
          />
        )}
      />
    </PaymentShell>
  );
}
