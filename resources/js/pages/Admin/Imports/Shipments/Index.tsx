import { Link } from '@inertiajs/react';
import { Eye, Ship } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { formatDateTime, importVehicleName, requesterName } from '@/components/admin/imports/helpers';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportFilters, ImportPagination, ImportRequest } from '@/components/admin/imports/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Button } from '@/components/ui/button';

export default function Index({ imports, filters = {} }: { imports: ImportPagination; filters?: ImportFilters }) {
  const columns: Column<ImportRequest>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <ImportStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/imports/${row.id}/shipments`} className="font-medium hover:underline">{requesterName(row)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? row.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => importVehicleName(row) },
    { key: 'shipment_reference', label: 'Shipment ref', sortable: true, render: (row) => row.shipment?.shipment_reference ?? row.reference_number ?? '—' },
    { key: 'container_number', label: 'Container', sortable: true, render: (row) => row.shipment?.container_number ?? '—' },
    { key: 'shipping_line', label: 'Shipping line', sortable: true, render: (row) => row.shipment?.shipping_line ?? '—' },
    { key: 'vessel', label: 'Vessel', sortable: true, render: (row) => row.shipment?.vessel ?? '—' },
    { key: 'current_location', label: 'Current location', sortable: true, render: (row) => row.shipment?.current_location ?? '—' },
    { key: 'shipment_status', label: 'Shipment status', sortable: true, render: (row) => <ImportStatusBadge status={row.shipment?.status} /> },
    { key: 'estimated_arrival', label: 'Est. arrival', sortable: true, render: (row) => formatDateTime(row.estimated_arrival ?? row.shipment?.estimated_arrival) },
    { key: 'customs_status', label: 'Customs', sortable: true, render: (row) => <ImportStatusBadge status={row.shipment?.customs_status} /> },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  return (
    <ImportShell title="Shipment Tracking" description="Track import shipments, containers, vessels, ports, customs status, and delivery progress.">
      <AdminDataTable
        rows={imports}
        filters={filters}
        columns={columns}
        baseUrl="/admin/imports/shipments"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/imports/${row.id}/shipments`}><Ship className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/imports/${row.id}`}><Eye className="size-4" /></Link></Button>
          </div>
        )}
      />
    </ImportShell>
  );
}
