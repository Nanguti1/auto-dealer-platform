import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime, requesterName, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { InspectionPagination, TradeInFilters, TradeInInspection } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';

export default function Index({ inspections, filters = {} }: { inspections: InspectionPagination; filters?: TradeInFilters }) {
  const columns: Column<TradeInInspection>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <TradeInStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.tradeInRequest?.customer ? <CustomerAvatar customer={row.tradeInRequest.customer} /> : null}<div><Link href={`/admin/trade-ins/${row.trade_in_request_id}`} className="font-medium hover:underline">{requesterName(row.tradeInRequest)}</Link><p className="text-xs text-muted-foreground">{row.tradeInRequest?.customer?.email ?? row.tradeInRequest?.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Trade-in vehicle', sortable: true, render: (row) => <div>{tradeInVehicleName(row.tradeInRequest)}<p className="text-xs text-muted-foreground">{row.tradeInRequest?.mileage ? `${row.tradeInRequest.mileage.toLocaleString()} mi` : '—'} · VIN {row.tradeInRequest?.vin ?? '—'}</p></div> },
    { key: 'inspection_date', label: 'Inspection Date', sortable: true, render: (row) => row.inspection_date ? formatDateTime(row.inspection_date) : 'Not scheduled' },
    { key: 'estimated_repair_cost', label: 'Repair Cost', sortable: true, render: (row) => row.estimated_repair_cost ? `$${Number(row.estimated_repair_cost).toLocaleString()}` : '—' },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  return <TradeInShell title="Vehicle Inspections" description="View and manage trade-in vehicle inspections and condition reports."><AdminDataTable rows={inspections} filters={filters} columns={columns} baseUrl="/admin/inspections" rowActions={(row) => <div className="flex justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/inspections/${row.id}`}><Eye className="size-4" /></Link></Button><Button variant="ghost" size="icon" asChild><Link href={`/admin/inspections/${row.id}/edit`}><Pencil className="size-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/inspections/${row.id}/complete`)}><CheckCircle2 className="size-4" /></Button></div>} /></TradeInShell>;
}
