import { Link } from '@inertiajs/react';
import { Eye, DollarSign } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { Button } from '@/components/ui/button';
import ImportShell from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import { formatCurrency, formatDateTime, importVehicleName, requesterName } from '@/components/admin/imports/helpers';
import type { ImportFilters, ImportPagination, ImportRequest } from '@/components/admin/imports/types';

export default function Index({ imports, filters = {} }: { imports: ImportPagination; filters?: ImportFilters }) {
  const columns: Column<ImportRequest>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <ImportStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/imports/${row.id}/payments`} className="font-medium hover:underline">{requesterName(row)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? row.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => importVehicleName(row) },
    { key: 'payment_status', label: 'Payment status', sortable: true, render: (row) => <ImportStatusBadge status={row.payment_status} /> },
    { key: 'estimated_cost', label: 'Est. cost', sortable: true, render: (row) => formatCurrency(row.estimated_cost) },
    { key: 'total_paid', label: 'Total paid', sortable: true, render: (row) => formatCurrency(row.payments?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) ?? 0) },
    { key: 'outstanding_balance', label: 'Outstanding', sortable: true, render: (row) => formatCurrency((row.estimated_cost ?? 0) - (row.payments?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) ?? 0)) },
    { key: 'supplier', label: 'Supplier', sortable: true, render: (row) => row.supplier?.company_name ?? row.supplier?.name ?? '—' },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  return (
    <ImportShell title="Import Payments" description="Track deposit, supplier, shipping, customs, taxes, and outstanding balances for import requests.">
      <AdminDataTable
        rows={imports}
        filters={filters}
        columns={columns}
        baseUrl="/admin/imports/payments"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/imports/${row.id}/payments`}><DollarSign className="size-4" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href={`/admin/imports/${row.id}`}><Eye className="size-4" /></Link></Button>
          </div>
        )}
      />
    </ImportShell>
  );
}
