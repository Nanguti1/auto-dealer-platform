import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Eye, Pencil, XCircle } from 'lucide-react';
import * as React from 'react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { formatCurrency, formatDateTime, importVehicleName, requesterName, supplierName, userName } from '@/components/admin/imports/helpers';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportFilters, ImportPagination, ImportRequest } from '@/components/admin/imports/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';

export default function Index({ imports, filters = {} }: { imports: ImportPagination; filters?: ImportFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const columns: Column<ImportRequest>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <ImportStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/imports/${row.id}`} className="font-medium hover:underline">{requesterName(row)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? row.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Requested vehicle', sortable: true, render: (row) => <div>{importVehicleName(row)}<p className="text-xs text-muted-foreground">{row.vehicle?.stock_number ?? '—'}</p></div> },
    { key: 'origin_country', label: 'Origin', sortable: true, render: (row) => row.origin_country ?? '—' },
    { key: 'supplier', label: 'Supplier', sortable: true, render: (row) => supplierName(row.supplier) },
    { key: 'shipping_method', label: 'Shipping', sortable: true, render: (row) => row.shipping_method ?? row.request_data?.shipping_method ?? '—' },
    { key: 'estimated_arrival', label: 'Est. arrival', sortable: true, render: (row) => formatDateTime(row.estimated_arrival ?? row.shipment?.estimated_arrival) },
    { key: 'current_stage', label: 'Stage', sortable: true, render: (row) => row.current_stage ?? row.shipment?.status ?? '—' },
    { key: 'assigned_user_id', label: 'Import officer', sortable: true, render: (row) => userName(row.assigned_user ?? row.assignedUser) },
    { key: 'payment_status', label: 'Payment status', sortable: true, render: (row) => <ImportStatusBadge status={row.payment_status} /> },
    { key: 'estimated_cost', label: 'Est. cost', sortable: true, render: (row) => formatCurrency(row.estimated_cost) },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  if (isLoading) {
    return (
      <ImportShell title="Import Requests" description="Manage vehicle import requests, suppliers, shipments, tracking, payments, and customs.">
        <LoadingState message="Loading import requests..." variant="full-page" />
      </ImportShell>
    );
  }

  if (error) {
    return (
      <ImportShell title="Import Requests" description="Manage vehicle import requests, suppliers, shipments, tracking, payments, and customs.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/imports');
          }}
        />
      </ImportShell>
    );
  }

  return (
    <ImportShell title="Import Requests" description="Manage vehicle import requests, suppliers, shipments, tracking, payments, and customs.">
      {imports.data.length === 0 ? (
        <EmptyGeneric
          title="No import requests"
          description="Start importing vehicles by creating your first import request."
          action={{ label: 'Create Import', onClick: () => router.visit('/admin/imports/create') }}
        />
      ) : (
        <AdminDataTable
          rows={imports}
          filters={filters}
          columns={columns}
          baseUrl="/admin/imports"
          createUrl="/admin/imports/create"
          createLabel="Create Import"
          rowActions={(row) => (
            <RowActionsDropdown
              ariaLabel={`Actions for import ${row.id}`}
              actions={[
                {
                  label: 'View',
                  icon: <Eye />,
                  href: `/admin/imports/${row.id}`,
                },
                {
                  label: 'Edit',
                  icon: <Pencil />,
                  href: `/admin/imports/${row.id}/edit`,
                },
                {
                  label: 'Delete',
                  icon: <Archive />,
                  destructive: true,
                  onClick: () => setDeleteId(row.id),
                },
              ]}
            />
          )}
        />
      )}
      <ConfirmationDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete import request?"
        description="This will permanently delete the import request and all related data. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) {
            setIsDeleting(true);
            router.delete(`/admin/imports/${deleteId}`, {
              onFinish: () => {
                setDeleteId(null);
                setIsDeleting(false);
              },
            });
          }
        }}
        isLoading={isDeleting}
      />
    </ImportShell>
  );
}
