import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil, Truck } from 'lucide-react';
import { formatDateTime } from '@/components/admin/imports/helpers';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportFilters, ShipmentPagination, Shipment } from '@/components/admin/imports/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Button } from '@/components/ui/button';

export default function Index({ shipments, filters = {} }: { shipments: ShipmentPagination; filters?: ImportFilters }) {
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

  return (
    <ImportShell title="Shipment Tracking" description="Track import shipments, containers, vessels, ports, customs status, and delivery progress.">
      <AdminDataTable
        rows={shipments}
        filters={filters}
        columns={columns}
        baseUrl="/admin/shipments"
        createUrl="/admin/shipments/create"
        createLabel="Create Shipment"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/shipments/${row.id}`}><Eye className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/shipments/${row.id}/edit`}><Pencil className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/shipments/${row.id}/update-tracking`)}><Truck className="size-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/shipments/${row.id}/mark-as-delivered`)}><CheckCircle2 className="size-4" /></Button>
          </div>
        )}
      />
    </ImportShell>
  );
}
