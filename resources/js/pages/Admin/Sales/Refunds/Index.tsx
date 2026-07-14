import { Link, router } from '@inertiajs/react';
import { Eye, RotateCcw, Plus } from 'lucide-react';
import * as React from 'react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime, userName } from '@/components/admin/payments/helpers';
import PaymentShell from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import type { RefundFilters, RefundPagination, Refund } from '@/components/admin/payments/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Button } from '@/components/ui/button';

export default function Index({ refunds, filters = {} }: { refunds: RefundPagination; filters?: RefundFilters }) {
  const formatCurrency = useFormatCurrency();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  
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

  if (isLoading) {
    return (
      <PaymentShell 
        title="Refunds" 
        description="Manage refund requests, approvals, processing, and refund history."
        actions={
          <Button asChild>
            <Link href="/admin/refunds/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Refund
            </Link>
          </Button>
        }
      >
        <LoadingState message="Loading refunds..." variant="full-page" />
      </PaymentShell>
    );
  }

  if (error) {
    return (
      <PaymentShell 
        title="Refunds" 
        description="Manage refund requests, approvals, processing, and refund history."
        actions={
          <Button asChild>
            <Link href="/admin/refunds/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Refund
            </Link>
          </Button>
        }
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/refunds');
          }}
        />
      </PaymentShell>
    );
  }

  return (
    <PaymentShell 
      title="Refunds" 
      description="Manage refund requests, approvals, processing, and refund history."
      actions={
        <Button asChild>
          <Link href="/admin/refunds/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Refund
          </Link>
        </Button>
      }
    >
      {refunds.data.length === 0 ? (
        <EmptyGeneric
          title="No refunds"
          description="Create your first refund to start processing customer returns."
          action={{ label: 'Create Refund', onClick: () => router.visit('/admin/refunds/create') }}
        />
      ) : (
        <AdminDataTable
          rows={refunds}
          filters={filters}
          columns={columns}
          baseUrl="/admin/refunds"
          rowActions={(row) => (
            <RowActionsDropdown
              ariaLabel={`Actions for refund ${row.id}`}
              actions={[
                {
                  label: 'View',
                  icon: <Eye />,
                  href: `/admin/refunds/${row.id}`,
                },
                {
                  label: 'View Payment',
                  icon: <RotateCcw />,
                  href: `/admin/payments/${row.payment_id}`,
                },
              ]}
            />
          )}
        />
      )}
    </PaymentShell>
  );
}
