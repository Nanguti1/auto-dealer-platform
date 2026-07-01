import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil, XCircle } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime, requesterName, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInFilters, TradeInPagination, TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';

export default function Index({ tradeIns, filters = {} }: { tradeIns: TradeInPagination; filters?: TradeInFilters }) {
  const columns: Column<TradeInRequest>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <TradeInStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/trade-ins/${row.id}`} className="font-medium hover:underline">{requesterName(row)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? row.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Trade-in vehicle', sortable: true, render: (row) => <div>{tradeInVehicleName(row)}<p className="text-xs text-muted-foreground">{row.mileage ? `${row.mileage.toLocaleString()} mi` : '—'} · VIN {row.vin ?? '—'}</p></div> },
    { key: 'inspection_status', label: 'Inspection', sortable: true, render: (row) => row.inspection?.status ?? 'Not inspected' },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  return <TradeInShell title="Vehicle Inspections" description="View and manage trade-in vehicle inspections and condition reports."><AdminDataTable rows={tradeIns} filters={filters} columns={columns} baseUrl="/admin/inspections" rowActions={(row) => <div className="flex justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/trade-ins/${row.id}`}><Eye className="size-4" /></Link></Button><Button variant="ghost" size="icon" asChild><Link href={`/admin/trade-ins/${row.id}/inspection/edit`}><Pencil className="size-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/inspections/${row.inspection?.id ?? row.id}`, { status: 'completed' })}><CheckCircle2 className="size-4" /></Button><Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/inspections/${row.inspection?.id ?? row.id}`, { status: 'failed' })}><XCircle className="size-4" /></Button></div>} /></TradeInShell>;
}
