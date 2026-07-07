import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil, Truck } from 'lucide-react';
import * as React from 'react';
import { formatDateTime } from '@/components/admin/imports/helpers';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportFilters, ShipmentPagination, Shipment } from '@/components/admin/imports/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ shipments, filters = {} }: { shipments: ShipmentPagination; filters?: ImportFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<Shipment>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <ImportStatusBadge status={row.status} /> },
    { key: 'tracking_number', label: 'Tracking Number', sortable: true, render: (row) => row.tracking_number ?? '—' },
    { key: 'carrier', label: 'Carrier', sortable: true, render: (row) => row.carrier ?? '—' },
    { key: 'origin', label: 'Origin', sortable: true, render: (row) => row.origin ?? '—' },
    { key: 'destination', label: 'Destination', sortable: true, render: (row) => row.destination ?? '—' },
    { key: 'current_location', label: 'Current Location', sortable: true, render: (row) => row.current_location ?? '—' },
    { key: 'estimated_arrival', label: 'Est. Arrival', sortable: true, render: (row) => row.estimated_arrival ? formatDateTime(row.estimated_arrival) : '—' },
    { key: 'actual_arrival', label: 'Actual Arrival', sortable: true, render: (row) => row.actual_arrival ? formatDateTime(row.actual_arrival) : '—' },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  if (isLoading) {
    return (
      <ImportShell title="Shipment Tracking" description="Track import shipments, containers, vessels, ports, customs status, and delivery progress.">
        <LoadingState message="Loading shipments..." variant="full-page" />
      </ImportShell>
    );
  }

  if (error) {
    return (
      <ImportShell title="Shipment Tracking" description="Track import shipments, containers, vessels, ports, customs status, and delivery progress.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/shipments');
          }}
        />
      </ImportShell>
    );
  }

  return (
    <ImportShell title="Shipment Tracking" description="Track import shipments, containers, vessels, ports, customs status, and delivery progress.">
      {shipments.data.length === 0 ? (
        <EmptyGeneric
          title="No shipments"
          description="Track your import shipments by creating your first shipment record."
          action={{ label: 'Create Shipment', onClick: () => router.visit('/admin/shipments/create') }}
        />
      ) : (
        <AdminDataTable
          rows={shipments}
          filters={filters}
          columns={columns}
          baseUrl="/admin/shipments"
          createUrl="/admin/shipments/create"
          createLabel="Create Shipment"
          rowActions={(row) => (
            <RowActionsDropdown
              ariaLabel={`Actions for shipment ${row.id}`}
              actions={[
                {
                  label: 'View',
                  icon: <Eye />,
                  href: `/admin/shipments/${row.id}`,
                },
                {
                  label: 'Edit',
                  icon: <Pencil />,
                  href: `/admin/shipments/${row.id}/edit`,
                },
                {
                  label: 'Update Tracking',
                  icon: <Truck />,
                  onClick: () => router.patch(`/admin/shipments/${row.id}/update-tracking`),
                },
                {
                  label: 'Mark as Delivered',
                  icon: <CheckCircle2 />,
                  onClick: () => router.patch(`/admin/shipments/${row.id}/mark-as-delivered`),
                },
              ]}
            />
          )}
        />
      )}
    </ImportShell>
  );
}
