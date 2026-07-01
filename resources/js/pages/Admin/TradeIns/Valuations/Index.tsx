import { Link, router } from '@inertiajs/react';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatCurrency, formatDateTime } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInValuation, ValuationPagination, ValuationFilters } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';

export default function Index({ valuations, filters = {} }: { valuations: ValuationPagination; filters?: ValuationFilters }) {
  const columns: Column<TradeInValuation>[] = [
    { key: 'trade_in_request_id', label: 'Trade-In Request', sortable: true, render: (row) => <Link href={`/admin/trade-ins/${row.trade_in_request_id}`} className="font-medium hover:underline">#{row.trade_in_request_id}</Link> },
    { key: 'market_value', label: 'Market Value', sortable: true, render: (row) => formatCurrency(row.market_value) },
    { key: 'estimated_resale_value', label: 'Resale Value', sortable: true, render: (row) => formatCurrency(row.estimated_resale_value) },
    { key: 'repair_estimate', label: 'Repair Estimate', sortable: true, render: (row) => formatCurrency(row.repair_estimate) },
    { key: 'final_trade_in_value', label: 'Final Value', sortable: true, render: (row) => formatCurrency(row.final_trade_in_value) },
    { key: 'approval_status', label: 'Status', sortable: true, render: (row) => <span className="capitalize">{row.approval_status}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  return (
    <TradeInShell title="Valuations" description="Manage vehicle valuations for trade-in requests.">
      <AdminDataTable
        rows={valuations}
        filters={filters}
        columns={columns}
        baseUrl="/admin/valuations"
        createUrl="/admin/valuations/create"
        createLabel="Create Valuation"
        rowActions={(row) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/valuations/${row.id}`}>
                <Eye className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/valuations/${row.id}/edit`}>
                <Pencil className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.delete(`/admin/valuations/${row.id}`)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      />
    </TradeInShell>
  );
}
