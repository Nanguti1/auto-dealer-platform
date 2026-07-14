import { Link, router } from '@inertiajs/react';
import { Calendar, Car, DollarSign, Eye, Pencil, Trash2, User } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { customerName, formatDateTime, statusBadge, vehicleName } from '@/components/admin/reservations/helpers';
import ReservationShell from '@/components/admin/reservations/reservation-shell';
import type { ReservationFilters, ReservationPagination, ReservationRecord } from '@/components/admin/reservations/types';
import { LoadingState, EmptyReservations, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';

export default function Index({ reservations, filters = {} }: { reservations: ReservationPagination; filters?: ReservationFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const formatCurrency = useFormatCurrency();
  
  const columns: Column<ReservationRecord>[] = [
    { 
      key: 'id', 
      label: 'ID', 
      sortable: true, 
      render: (reservation) => <span className="font-mono text-sm">#{reservation.id}</span> 
    },
    { 
      key: 'vehicle', 
      label: 'Vehicle', 
      sortable: true, 
      render: (reservation) => (
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-muted-foreground" />
          <div>
            {reservation.vehicle ? (
              <Link href={`/admin/vehicles/${reservation.vehicle.id}`} className="font-medium hover:underline">
                {vehicleName(reservation)}
              </Link>
            ) : (
              <span className="text-muted-foreground">No vehicle</span>
            )}
          </div>
        </div>
      )
    },
    { 
      key: 'customer', 
      label: 'Customer', 
      sortable: true, 
      render: (reservation) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{customerName(reservation)}</span>
        </div>
      )
    },
    { 
      key: 'deposit_amount', 
      label: 'Deposit', 
      sortable: true, 
      render: (reservation) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span>{formatCurrency(reservation.deposit_amount)}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true, 
      render: (reservation) => {
        const badge = statusBadge(reservation.status);

        return <Badge variant={badge.variant}>{badge.label}</Badge>;
      }
    },
    { 
      key: 'expires_at', 
      label: 'Expires', 
      sortable: true, 
      render: (reservation) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDateTime(reservation.expires_at)}</span>
        </div>
      )
    },
    { 
      key: 'created_at', 
      label: 'Created', 
      sortable: true, 
      render: (reservation) => formatDateTime(reservation.created_at) 
    },
  ];

  if (isLoading) {
    return (
      <ReservationShell 
        title="Reservations" 
        description="Manage vehicle reservations, deposits, expiration dates, and customer hold requests." 
        actions={<Button asChild><Link href={admin.reservations.create().url}>Create Reservation</Link></Button>}
      >
        <LoadingState message="Loading reservations..." variant="full-page" />
      </ReservationShell>
    );
  }

  if (error) {
    return (
      <ReservationShell 
        title="Reservations" 
        description="Manage vehicle reservations, deposits, expiration dates, and customer hold requests." 
        actions={<Button asChild><Link href={admin.reservations.create().url}>Create Reservation</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.reservations.index().url);
          }}
        />
      </ReservationShell>
    );
  }

  return (
    <ReservationShell 
      title="Reservations" 
      description="Manage vehicle reservations, deposits, expiration dates, and customer hold requests." 
      actions={<Button asChild><Link href={admin.reservations.create().url}>Create Reservation</Link></Button>}
    >
      {reservations.data.length === 0 ? (
        <EmptyReservations onCreate={() => router.visit(admin.reservations.create().url)} />
      ) : (
        <AdminDataTable
        rows={reservations}
        filters={filters}
        columns={columns}
        baseUrl={admin.reservations.index().url}
        createUrl={admin.reservations.create().url}
        createLabel="Create Reservation"
        rowActions={(reservation) => (
          <>
            <RowActionsDropdown
              ariaLabel={`Actions for reservation ${reservation.id}`}
              actions={[
                {
                  label: 'View',
                  icon: <Eye />,
                  href: admin.reservations.show(reservation.id).url,
                },
                {
                  label: 'Edit',
                  icon: <Pencil />,
                  href: admin.reservations.edit(reservation.id).url,
                },
                {
                  label: 'Delete',
                  icon: <Trash2 />,
                  destructive: true,
                  onClick: () => setDeleteId(reservation.id),
                },
              ]}
            />
            <ConfirmationDialog
              open={deleteId === reservation.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete reservation?"
              description="Are you sure you want to delete this reservation? This action cannot be undone."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(admin.reservations.destroy(reservation.id).url, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
      )}
    </ReservationShell>
  );
}