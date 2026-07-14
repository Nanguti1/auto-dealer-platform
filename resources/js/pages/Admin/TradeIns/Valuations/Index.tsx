import { Link, router } from '@inertiajs/react';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInValuation, ValuationPagination, TradeInFilters } from '@/components/admin/trade-ins/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Button } from '@/components/ui/button';

export default function Index({ valuations, filters = {} }: { valuations: ValuationPagination; filters?: TradeInFilters }) {
  const formatCurrency = useFormatCurrency();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  
  const columns: Column<TradeInValuation>[] = [
    { key: 'trade_in_request_id', label: 'Trade-In Request', sortable: true, render: (row) => <Link href={`/admin/trade-ins/${row.trade_in_request_id}`} className="font-medium hover:underline">#{row.trade_in_request_id}</Link> },
    { key: 'trade_in_value', label: 'Trade-In Value', sortable: true, render: (row) => formatCurrency(row.trade_in_value) },
    { key: 'wholesale_value', label: 'Wholesale Value', sortable: true, render: (row) => row.wholesale_value ? formatCurrency(row.wholesale_value) : '—' },
    { key: 'retail_value', label: 'Retail Value', sortable: true, render: (row) => row.retail_value ? formatCurrency(row.retail_value) : '—' },
    { key: 'valuation_method', label: 'Method', sortable: true, render: (row) => <span className="capitalize">{row.valuation_method}</span> },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  if (isLoading) {
    return (
      <TradeInShell title="Valuations" description="Manage vehicle valuations for trade-in requests.">
        <LoadingState message="Loading valuations..." variant="full-page" />
      </TradeInShell>
    );
  }

  if (error) {
    return (
      <TradeInShell title="Valuations" description="Manage vehicle valuations for trade-in requests.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/valuations');
          }}
        />
      </TradeInShell>
    );
  }

  return (
    <TradeInShell title="Valuations" description="Manage vehicle valuations for trade-in requests.">
      {valuations.data.length === 0 ? (
        <EmptyGeneric
          title="No valuations"
          description="Create your first vehicle valuation to start assessing trade-in values."
          action={{ label: 'Create Valuation', onClick: () => router.visit('/admin/valuations/create') }}
        />
      ) : (
        <AdminDataTable
          rows={valuations}
          filters={filters}
          columns={columns}
          baseUrl="/admin/valuations"
          createUrl="/admin/valuations/create"
          createLabel="Create Valuation"
          rowActions={(row) => (
            <>
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
                    onClick: () => setDeleteId(row.id),
                  },
                ]}
              />
              <ConfirmationDialog
                open={deleteId === row.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete valuation?"
                description="This will permanently delete the vehicle valuation."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(`/admin/valuations/${row.id}`, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </TradeInShell>
  );
}
