import { Link, router } from '@inertiajs/react';
import { Archive, Eye, Pencil, Plus, Receipt, RotateCcw } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime, customerNameFromPayment, vehicleName, userName } from '@/components/admin/payments/helpers';
import PaymentShell from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import type { PaymentFilters, PaymentPagination, Payment } from '@/components/admin/payments/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Button } from '@/components/ui/button';

export default function Index({ payments, filters = {} }: { payments: PaymentPagination; filters?: PaymentFilters }) {
  const formatCurrency = useFormatCurrency();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  
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

  if (isLoading) {
    return (
      <PaymentShell 
        title="Payments" 
        description="Manage customer payments, transactions, refunds, receipts, and payment history."
        actions={
          <Button asChild>
            <Link href="/admin/payments/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Payment
            </Link>
          </Button>
        }
      >
        <LoadingState message="Loading payments..." variant="full-page" />
      </PaymentShell>
    );
  }

  if (error) {
    return (
      <PaymentShell 
        title="Payments" 
        description="Manage customer payments, transactions, refunds, receipts, and payment history."
        actions={
          <Button asChild>
            <Link href="/admin/payments/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Payment
            </Link>
          </Button>
        }
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/payments');
          }}
        />
      </PaymentShell>
    );
  }

  return (
    <PaymentShell 
      title="Payments" 
      description="Manage customer payments, transactions, refunds, receipts, and payment history."
      actions={
        <Button asChild>
          <Link href="/admin/payments/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Payment
          </Link>
        </Button>
      }
    >
      {payments.data.length === 0 ? (
        <EmptyGeneric
          title="No payments"
          description="Create your first payment to start tracking customer transactions."
          action={{ label: 'Create Payment', onClick: () => router.visit('/admin/payments/create') }}
        />
      ) : (
        <AdminDataTable
          rows={payments}
          filters={filters}
          columns={columns}
          baseUrl="/admin/payments"
          rowActions={(row) => (
            <>
              <RowActionsDropdown
                ariaLabel={`Actions for payment ${row.id}`}
                actions={[
                  {
                    label: 'View',
                    icon: <Eye />,
                    href: `/admin/payments/${row.id}`,
                  },
                  {
                    label: 'Edit',
                    icon: <Pencil />,
                    href: `/admin/payments/${row.id}/edit`,
                  },
                  {
                    label: 'Receipt',
                    icon: <Receipt />,
                    href: `/admin/payments/${row.id}/receipt`,
                  },
                  {
                    label: 'Refund',
                    icon: <RotateCcw />,
                    onClick: () => router.post(`/admin/payments/${row.id}/refund`),
                  },
                  {
                    label: 'Delete',
                    icon: <Archive />,
                    destructive: true,
                    onClick: () => setDeleteId(row.id),
                  },
                ]}
              />
              <ConfirmationDialog
                open={deleteId === row.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete payment?"
                description="This will permanently delete the payment record."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(`/admin/payments/${row.id}`, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </PaymentShell>
  );
}
