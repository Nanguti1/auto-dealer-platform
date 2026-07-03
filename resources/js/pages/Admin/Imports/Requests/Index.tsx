import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Eye, Pencil, XCircle } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { formatCurrency, formatDateTime, importVehicleName, requesterName, supplierName, userName } from '@/components/admin/imports/helpers';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportFilters, ImportPagination, ImportRequest } from '@/components/admin/imports/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Button } from '@/components/ui/button';

export default function Index({ imports, filters = {} }: { imports: ImportPagination; filters?: ImportFilters }) {
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

  return (
    <ImportShell title="Import Requests" description="Manage vehicle import requests, suppliers, shipments, tracking, payments, and customs.">
      <AdminDataTable
        rows={imports}
        filters={filters}
        columns={columns}
        baseUrl="/admin/imports"
        createUrl="/admin/imports/create"
        createLabel="Create Import"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/imports/${row.id}`}><Eye className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/imports/${row.id}/edit`}><Pencil className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" onClick={() => router.delete(`/admin/imports/${row.id}`)}><Archive className="size-4" /></Button>
          </div>
        )}
      />
    </ImportShell>
  );
}
