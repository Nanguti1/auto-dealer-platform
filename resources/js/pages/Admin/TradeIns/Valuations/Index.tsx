import { Link, router } from '@inertiajs/react';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatCurrency, formatDateTime } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInValuation, ValuationPagination, TradeInFilters } from '@/components/admin/trade-ins/types';
import { RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ valuations, filters = {} }: { valuations: ValuationPagination; filters?: TradeInFilters }) {
  const columns: Column<TradeInValuation>[] = [
    { key: 'trade_in_request_id', label: 'Trade-In Request', sortable: true, render: (row) => <Link href={`/admin/trade-ins/${row.trade_in_request_id}`} className="font-medium hover:underline">#{row.trade_in_request_id}</Link> },
    { key: 'trade_in_value', label: 'Trade-In Value', sortable: true, render: (row) => formatCurrency(row.trade_in_value) },
    { key: 'wholesale_value', label: 'Wholesale Value', sortable: true, render: (row) => row.wholesale_value ? formatCurrency(row.wholesale_value) : '—' },
    { key: 'retail_value', label: 'Retail Value', sortable: true, render: (row) => row.retail_value ? formatCurrency(row.retail_value) : '—' },
    { key: 'valuation_method', label: 'Method', sortable: true, render: (row) => <span className="capitalize">{row.valuation_method}</span> },
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
          <RowActionsDropdown
            ariaLabel={`Actions for valuation ${row.id}`}
            actions={[
              {
                label: 'View',
                icon: <Eye />,
                href: `/admin/valuations/${row.id}`,
              },
              {
                label: 'Edit',
                icon: <Pencil />,
                href: `/admin/valuations/${row.id}/edit`,
              },
              {
                label: 'Delete',
                icon: <Trash2 />,
                destructive: true,
                onClick: () => router.delete(`/admin/valuations/${row.id}`),
              },
            ]}
          />
        )}
      />
    </TradeInShell>
  );
}
