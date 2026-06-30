import { Link, router } from '@inertiajs/react';
import { Archive, Eye, Pencil, Receipt, RotateCcw } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { Button } from '@/components/ui/button';
import PaymentShell from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import { formatCurrency, formatDateTime, customerNameFromPayment, vehicleName, userName } from '@/components/admin/payments/helpers';
import type { PaymentFilters, PaymentPagination, Payment } from '@/components/admin/payments/types';

export default function Index({ payments, filters = {} }: { payments: PaymentPagination; filters?: PaymentFilters }) {
  const columns: Column<Payment>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <PaymentStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/payments/${row.id}`} className="font-medium hover:underline">{customerNameFromPayment(row)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? row.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => <div>{vehicleName(row.vehicle)}<p className="text-xs text-muted-foreground">{row.vehicle?.stock_number ?? '—'}</p></div> },
    { key: 'payment_type', label: 'Payment type', sortable: true, render: (row) => row.metadata?.payment_type ?? row.method ?? '—' },
    { key: 'method', label: 'Method', sortable: true, render: (row) => row.method ?? '—' },
    { key: 'amount', label: 'Amount', sortable: true, render: (row) => <div>{formatCurrency(row.amount)}<p className="text-xs text-muted-foreground">{row.currency ?? 'USD'}</p></div> },
    { key: 'outstanding_balance', label: 'Outstanding', sortable: true, render: (row) => formatCurrency(row.metadata?.outstanding_balance ?? 0) },
    { key: 'transaction_reference', label: 'Reference', sortable: true, render: (row) => row.transaction_reference ?? '—' },
    { key: 'processed_by', label: 'Processed by', sortable: true, render: (row) => userName(row.processed_by) },
    { key: 'paid_at', label: 'Payment date', sortable: true, render: (row) => formatDateTime(row.paid_at) },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  return (
    <PaymentShell title="Payments" description="Manage customer payments, transactions, refunds, receipts, and payment history.">
      <AdminDataTable
        rows={payments}
        filters={filters}
        columns={columns}
        baseUrl="/admin/payments"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/payments/${row.id}`}><Eye className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/payments/${row.id}/edit`}><Pencil className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/payments/${row.id}/receipt`}><Receipt className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" onClick={() => router.post(`/admin/payments/${row.id}/refund`)}><RotateCcw className="size-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => router.delete(`/admin/payments/${row.id}`)}><Archive className="size-4" /></Button>
          </div>
        )}
      />
    </PaymentShell>
  );
}
