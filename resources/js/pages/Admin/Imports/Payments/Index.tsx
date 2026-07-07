import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil, DollarSign } from 'lucide-react';
import * as React from 'react';
import { formatCurrency, formatDateTime } from '@/components/admin/imports/helpers';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportFilters, PaymentPagination, ImportPayment } from '@/components/admin/imports/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ importPayments, filters = {} }: { importPayments: PaymentPagination; filters?: ImportFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<ImportPayment>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <ImportStatusBadge status={row.status} /> },
    { key: 'payment_reference', label: 'Reference', sortable: true, render: (row) => row.payment_reference ?? '—' },
    { key: 'amount', label: 'Amount', sortable: true, render: (row) => formatCurrency(row.amount) },
    { key: 'payment_type', label: 'Type', sortable: true, render: (row) => <span className="capitalize">{row.payment_type}</span> },
    { key: 'due_date', label: 'Due Date', sortable: true, render: (row) => row.due_date ? formatDateTime(row.due_date) : '—' },
    { key: 'paid_at', label: 'Paid Date', sortable: true, render: (row) => row.paid_at ? formatDateTime(row.paid_at) : '—' },
    { key: 'vehicle_import_id', label: 'Import', sortable: true, render: (row) => <Link href={`/admin/imports/${row.vehicle_import_id}`} className="font-medium hover:underline">#{row.vehicle_import_id}</Link> },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  if (isLoading) {
    return (
      <ImportShell title="Import Payments" description="Track deposit, supplier, shipping, customs, taxes, and outstanding balances for import requests.">
        <LoadingState message="Loading import payments..." variant="full-page" />
      </ImportShell>
    );
  }

  if (error) {
    return (
      <ImportShell title="Import Payments" description="Track deposit, supplier, shipping, customs, taxes, and outstanding balances for import requests.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/import-payments');
          }}
        />
      </ImportShell>
    );
  }

  return (
    <ImportShell title="Import Payments" description="Track deposit, supplier, shipping, customs, taxes, and outstanding balances for import requests.">
      {importPayments.data.length === 0 ? (
        <EmptyGeneric
          title="No import payments"
          description="Track your import payments by creating your first payment record."
          action={{ label: 'Create Payment', onClick: () => router.visit('/admin/import-payments/create') }}
        />
      ) : (
        <AdminDataTable
          rows={importPayments}
          filters={filters}
          columns={columns}
          baseUrl="/admin/import-payments"
          createUrl="/admin/import-payments/create"
          createLabel="Create Payment"
          rowActions={(row) => (
            <RowActionsDropdown
              ariaLabel={`Actions for payment ${row.id}`}
              actions={[
                {
                  label: 'View',
                  icon: <Eye />,
                  href: `/admin/import-payments/${row.id}`,
                },
                {
                  label: 'Edit',
                  icon: <Pencil />,
                  href: `/admin/import-payments/${row.id}/edit`,
                },
                {
                  label: 'Mark as Paid',
                  icon: <CheckCircle2 />,
                  onClick: () => router.patch(`/admin/import-payments/${row.id}/mark-as-paid`),
                },
              ]}
            />
          )}
        />
      )}
    </ImportShell>
  );
}
