import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Eye, Pencil, XCircle } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { desiredVehicle, formatCurrency, formatDateTime, formatNumber, requesterName, tradeInVehicleName, userName, vehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInFilters, TradeInPagination, TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';

export default function Index({ tradeIns, filters = {} }: { tradeIns: TradeInPagination; filters?: TradeInFilters }) {
  const columns: Column<TradeInRequest>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <TradeInStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/trade-ins/${row.id}`} className="font-medium hover:underline">{requesterName(row)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? row.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Trade-in vehicle', sortable: true, render: (row) => <div>{tradeInVehicleName(row)}<p className="text-xs text-muted-foreground">{formatNumber(row.mileage)} mi · VIN {row.vin ?? '—'}</p></div> },
    { key: 'desired_vehicle', label: 'Desired vehicle', render: (row) => vehicleName(desiredVehicle(row)) },
    { key: 'estimated_value', label: 'Estimated value', sortable: true, render: (row) => formatCurrency(row.estimated_value) },
    { key: 'assigned_user_id', label: 'Sales rep', sortable: true, render: (row) => userName(row.assigned_user ?? row.assignedUser) },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  return <TradeInShell title="Trade-In Requests" description="Manage trade-in intake, valuation, inspection, assignment, approvals, and follow-up."><AdminDataTable rows={tradeIns} filters={filters} columns={columns} baseUrl="/admin/trade-ins" rowActions={(row) => <div className="flex justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/trade-ins/${row.id}`}><Eye className="size-4" /></Link></Button><Button variant="ghost" size="icon" asChild><Link href={`/admin/trade-ins/${row.id}/edit`}><Pencil className="size-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/trade-ins/${row.id}`, { status: 'approved' })}><CheckCircle2 className="size-4" /></Button><Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/trade-ins/${row.id}`, { status: 'rejected' })}><XCircle className="size-4" /></Button><Button variant="ghost" size="icon" onClick={() => router.delete(`/admin/trade-ins/${row.id}`)}><Archive className="size-4" /></Button></div>} /></TradeInShell>;
}
