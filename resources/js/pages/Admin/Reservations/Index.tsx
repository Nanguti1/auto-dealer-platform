import { Link, router } from '@inertiajs/react';
import { Calendar, Car, DollarSign, Eye, Pencil, Trash2, User } from 'lucide-react';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { customerName, formatCurrency, formatDateTime, statusBadge, vehicleName } from '@/components/admin/reservations/helpers';
import ReservationShell from '@/components/admin/reservations/reservation-shell';
import type { ReservationFilters, ReservationPagination, ReservationRecord } from '@/components/admin/reservations/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { admin } from '@/routes/admin';

export default function Index({ reservations, filters = {} }: { reservations: ReservationPagination; filters?: ReservationFilters }) {
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

  return (
    <ReservationShell 
      title="Reservations" 
      description="Manage vehicle reservations, deposits, expiration dates, and customer hold requests." 
      actions={<Button asChild><Link href={admin.reservations.create().url}>Create Reservation</Link></Button>}
    >
      <AdminDataTable 
        rows={reservations} 
        filters={filters} 
        columns={columns} 
        baseUrl={admin.reservations.index().url} 
        createUrl={admin.reservations.create().url} 
        createLabel="Create Reservation" 
        rowActions={(reservation) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link href={admin.reservations.show(reservation.id).url}>
                <Eye className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={admin.reservations.edit(reservation.id).url}>
                <Pencil className="size-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                if (confirm('Are you sure you want to delete this reservation?')) {
                  router.delete(admin.reservations.destroy(reservation.id).url);
                }
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )} 
      />
    </ReservationShell>
  );
}