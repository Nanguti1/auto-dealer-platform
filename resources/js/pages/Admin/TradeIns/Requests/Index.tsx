import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Eye, Pencil, Plus, XCircle } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { desiredVehicle, requesterName, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import { vehicleName } from '@/lib/name-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import { formatDateTime } from '@/lib/date-utils';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInFilters, TradeInPagination, TradeInRequest } from '@/components/admin/trade-ins/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ tradeIns, filters = {} }: { tradeIns: TradeInPagination; filters?: TradeInFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const renderStatus = React.useCallback((row: TradeInRequest) => {
    return <TradeInStatusBadge status={row.status} />;
  }, []);

  const renderCustomer = React.useCallback((row: TradeInRequest) => {
    return (
      <div className="flex items-center gap-3">
        {row.customer ? <CustomerAvatar customer={row.customer} /> : null}
        <div>
          <Link href={`/admin/trade-ins/${row.id}`} className="font-medium hover:underline">
            {requesterName(row)}
          </Link>
          <p className="text-xs text-muted-foreground">
            {row.customer?.email ?? row.user?.email ?? 'No contact'}
          </p>
        </div>
      </div>
    );
  }, []);

  const renderVehicle = React.useCallback((row: TradeInRequest) => {
    return (
      <div>
        {tradeInVehicleName(row)}
        <p className="text-xs text-muted-foreground">
          {formatNumber(row.mileage)} mi · VIN {row.vin ?? '—'}
        </p>
      </div>
    );
  }, []);

  const renderDesiredVehicle = React.useCallback((row: TradeInRequest) => {
    return vehicleName(desiredVehicle(row));
  }, []);

  const renderEstimatedValue = React.useCallback((row: TradeInRequest) => {
    return formatCurrency(row.estimated_value);
  }, []);

  const renderSalesRep = React.useCallback((row: TradeInRequest) => {
    const user = row.assigned_user ?? row.assignedUser ?? undefined;
    return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned');
  }, []);

  const renderCreatedAt = React.useCallback((row: TradeInRequest) => {
    return formatDateTime(row.created_at);
  }, []);

  const renderUpdatedAt = React.useCallback((row: TradeInRequest) => {
    return formatDateTime(row.updated_at);
  }, []);

  const columns: Column<TradeInRequest>[] = [
    { key: 'status', label: 'Status', sortable: true, render: renderStatus },
    { key: 'customer', label: 'Customer', render: renderCustomer },
    { key: 'vehicle', label: 'Trade-in vehicle', sortable: true, render: renderVehicle },
    { key: 'desired_vehicle', label: 'Desired vehicle', render: renderDesiredVehicle },
    { key: 'estimated_value', label: 'Estimated value', sortable: true, render: renderEstimatedValue },
    { key: 'assigned_user_id', label: 'Sales rep', sortable: true, render: renderSalesRep },
    { key: 'created_at', label: 'Created', sortable: true, render: renderCreatedAt },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: renderUpdatedAt },
  ];

  if (isLoading) {
    return (
      <TradeInShell title="Trade-In Requests" description="Manage trade-in intake, valuation, inspection, assignment, approvals, and follow-up." actions={<Button asChild><Link href="/admin/trade-ins/create"><Plus className="mr-2 h-4 w-4" />Create Trade-In</Link></Button>}>
        <LoadingState message="Loading trade-in requests..." variant="full-page" />
      </TradeInShell>
    );
  }

  if (error) {
    return (
      <TradeInShell title="Trade-In Requests" description="Manage trade-in intake, valuation, inspection, assignment, approvals, and follow-up." actions={<Button asChild><Link href="/admin/trade-ins/create"><Plus className="mr-2 h-4 w-4" />Create Trade-In</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/trade-ins');
          }}
        />
      </TradeInShell>
    );
  }

  return (
    <TradeInShell title="Trade-In Requests" description="Manage trade-in intake, valuation, inspection, assignment, approvals, and follow-up." actions={<Button asChild><Link href="/admin/trade-ins/create"><Plus className="mr-2 h-4 w-4" />Create Trade-In</Link></Button>}>
      {tradeIns.data.length === 0 ? (
        <EmptyGeneric
          title="No trade-in requests"
          description="Start managing trade-ins by creating your first trade-in request."
          action={{ label: 'Create Trade-In', onClick: () => router.visit('/admin/trade-ins/create') }}
        />
      ) : (
        <AdminDataTable rows={tradeIns} filters={filters} columns={columns} baseUrl="/admin/trade-ins" rowActions={(row) => (
          <>
            <RowActionsDropdown ariaLabel={`Actions for trade-in ${row.id}`} actions={[{ label: 'View', icon: <Eye />, href: `/admin/trade-ins/${row.id}` }, { label: 'Edit', icon: <Pencil />, href: `/admin/trade-ins/${row.id}/edit` }, { label: 'Approve', icon: <CheckCircle2 />, onClick: () => router.patch(`/admin/trade-ins/${row.id}/approve`) }, { label: 'Reject', icon: <XCircle />, onClick: () => router.patch(`/admin/trade-ins/${row.id}/reject`) }, { label: 'Delete', icon: <Archive />, destructive: true, onClick: () => setDeleteId(row.id) }]} />
            <ConfirmationDialog
              open={deleteId === row.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete trade-in request?"
              description="This will permanently delete the trade-in request."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/trade-ins/${row.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )} />
      )}
    </TradeInShell>
  );
}
