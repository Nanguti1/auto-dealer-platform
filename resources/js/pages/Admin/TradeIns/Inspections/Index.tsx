import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil, Plus } from 'lucide-react';
import * as React from 'react';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime, requesterName, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { InspectionPagination, TradeInFilters, TradeInInspection } from '@/components/admin/trade-ins/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ inspections, filters = {} }: { inspections: InspectionPagination; filters?: TradeInFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<TradeInInspection>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <TradeInStatusBadge status={row.status} /> },
    { key: 'customer', label: 'Customer', sortable: true, render: (row) => {
      const tradeInRequest = row.tradeInRequest;
      if (!tradeInRequest) {
        return <div className="text-muted-foreground">No trade-in request</div>;
      }
      return (
        <div>
          <Link href={`/admin/trade-ins/${row.trade_in_request_id}`} className="font-medium hover:underline">
            {tradeInRequest.user ? requesterName(tradeInRequest) : 'Walk-in customer'}
          </Link>
          <p className="text-xs text-muted-foreground">
            {tradeInRequest.user?.email || 'No email provided'}
          </p>
        </div>
      );
    }},
    { key: 'vehicle', label: 'Trade-in vehicle', sortable: true, render: (row) => {
      const tradeInRequest = row.tradeInRequest;
      if (!tradeInRequest) {
        return <div className="text-muted-foreground">No vehicle info</div>;
      }
      return (
        <div>
          <Link href={`/admin/trade-ins/${row.trade_in_request_id}`} className="font-medium hover:underline">
            {tradeInVehicleName(tradeInRequest)}
          </Link>
          <p className="text-xs text-muted-foreground">
            {tradeInRequest.mileage ? `${Number(tradeInRequest.mileage).toLocaleString()} mi` : '—'} · VIN {tradeInRequest.vin ?? '—'}
          </p>
        </div>
      );
    }},
    { key: 'inspection_date', label: 'Inspection Date', sortable: true, render: (row) => row.inspection_date ? formatDateTime(row.inspection_date) : 'Not scheduled' },
    { key: 'estimated_repair_cost', label: 'Repair Cost', sortable: true, render: (row) => row.estimated_repair_cost ? `$${Number(row.estimated_repair_cost).toLocaleString()}` : '—' },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (row) => formatDateTime(row.updated_at) },
  ];

  if (isLoading) {
    return (
      <TradeInShell title="Vehicle Inspections" description="View and manage trade-in vehicle inspections and condition reports.">
        <LoadingState message="Loading inspections..." variant="full-page" />
      </TradeInShell>
    );
  }

  if (error) {
    return (
      <TradeInShell title="Vehicle Inspections" description="View and manage trade-in vehicle inspections and condition reports.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/inspections');
          }}
        />
      </TradeInShell>
    );
  }

  return (
    <TradeInShell title="Vehicle Inspections" description="View and manage trade-in vehicle inspections and condition reports." actions={<Button asChild><Link href="/admin/inspections/create"><Plus className="mr-2 h-4 w-4" />Create Inspection</Link></Button>}>
      {inspections.data.length === 0 ? (
        <EmptyGeneric
          title="No inspections"
          description="Create your first vehicle inspection to start documenting trade-in conditions."
          action={{ label: 'Create Inspection', onClick: () => router.visit('/admin/inspections/create') }}
        />
      ) : (
        <AdminDataTable
          rows={inspections}
          filters={filters}
          columns={columns}
          baseUrl="/admin/inspections"
          createUrl="/admin/inspections/create"
          createLabel="Create Inspection"
          rowActions={(row) => (
            <RowActionsDropdown
              ariaLabel={`Actions for inspection ${row.id}`}
              actions={[
                { label: 'View', icon: <Eye />, href: `/admin/inspections/${row.id}` },
                { label: 'Edit', icon: <Pencil />, href: `/admin/inspections/${row.id}/edit` },
                { label: 'Complete', icon: <CheckCircle2 />, onClick: () => router.patch(`/admin/inspections/${row.id}/complete`) }
              ]}
            />
          )}
        />
      )}
    </TradeInShell>
  );
}
