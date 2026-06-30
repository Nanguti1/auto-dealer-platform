import { Link } from '@inertiajs/react';
import { Eye, RotateCcw } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { Button } from '@/components/ui/button';
import PaymentShell from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import { formatCurrency, formatDateTime, userName } from '@/components/admin/payments/helpers';
import type { RefundFilters, RefundPagination, Refund } from '@/components/admin/payments/types';

export default function Index({ refunds, filters = {} }: { refunds: RefundPagination; filters?: RefundFilters }) {
  const columns: Column<Refund>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <PaymentStatusBadge status={row.status} /> },
    { key: 'payment', label: 'Original payment', sortable: true, render: (row) => <div><Link href={`/admin/payments/${row.payment_id}`} className="font-medium hover:underline">Payment #{row.payment_id}</Link><p className="text-xs text-muted-foreground">{formatCurrency(row.original_payment?.amount)}</p></div> },
    { key: 'amount', label: 'Refund amount', sortable: true, render: (row) => <div>{formatCurrency(row.amount)}<p className="text-xs text-muted-foreground">{row.currency ?? 'USD'}</p></div> },
    { key: 'reason', label: 'Reason', sortable: true, render: (row) => row.reason ?? '—' },
    { key: 'refund_method', label: 'Refund method', sortable: true, render: (row) => row.refund_method ?? '—' },
    { key: 'approved_by', label: 'Approved by', sortable: true, render: (row) => userName(row.approved_by) },
    { key: 'processed_at', label: 'Processed date', sortable: true, render: (row) => formatDateTime(row.processed_at) },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  return (
    <PaymentShell title="Refunds" description="Manage refund requests, approvals, processing, and refund history.">
      <AdminDataTable
        rows={refunds}
        filters={filters}
        columns={columns}
        baseUrl="/admin/refunds"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/refunds/${row.id}`}><Eye className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/payments/${row.payment_id}`}><RotateCcw className="size-4" /></Link></Button>
          </div>
        )}
      />
    </PaymentShell>
  );
}
