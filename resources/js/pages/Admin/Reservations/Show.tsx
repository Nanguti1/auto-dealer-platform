import { Link, router } from '@inertiajs/react';
import { Calendar, Car, DollarSign, Pencil, Trash2, User } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import { customerName, formatCurrency, formatDateTime, statusBadge, vehicleName } from '@/components/admin/reservations/helpers';
import ReservationShell, { ReservationBackButton } from '@/components/admin/reservations/reservation-shell';
import type { ReservationRecord } from '@/components/admin/reservations/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

export default function Show({ reservation }: { reservation: ReservationRecord }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  if (!reservation?.id) {
    return (
      <ReservationShell 
        title="Error" 
        description="Invalid reservation data."
      >
        <div className="text-destructive">Reservation ID is missing.</div>
      </ReservationShell>
    );
  }

  const status = statusBadge(reservation.status);

  return (
    <ReservationShell 
      title={`Reservation #${reservation.id}`} 
      description={`${status.label} · ${vehicleName(reservation)} · ${customerName(reservation)}`} 
      actions={
        <>
          <ReservationBackButton />
          <Button 
            variant="outline" 
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
          <Button asChild>
            <Link href={admin.reservations.edit(reservation.id).url}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
          <ConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            title="Delete reservation?"
            description="Are you sure you want to delete this reservation? This action cannot be undone."
            trigger={<span />}
            confirmLabel="Delete"
            onConfirm={() => router.delete(admin.reservations.destroy(reservation.id).url)}
          />
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Reservation Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Reservation ID</p>
                <p className="font-mono">#{reservation.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p>{formatDateTime(reservation.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p>{formatDateTime(reservation.updated_at)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expires At</p>
                <p>{formatDateTime(reservation.expires_at)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deposit Amount</p>
                <p className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  {formatCurrency(reservation.deposit_amount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/vehicles/${reservation.vehicle_id}`}>
                <Car className="mr-2 size-4" />
                View Vehicle
              </Link>
            </Button>
            {reservation.user_id && (
              <Button variant="outline" asChild>
                <Link href={`/admin/customers/${reservation.user_id}`}>
                  <User className="mr-2 size-4" />
                  View Customer
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            {reservation.vehicle ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <Link href={`/admin/vehicles/${reservation.vehicle.id}`} className="font-medium hover:underline">
                    {vehicleName(reservation)}
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  {reservation.vehicle.year} {reservation.vehicle.make?.name} {reservation.vehicle.model?.name}
                </p>
                <p className="text-sm font-medium">
                  {formatCurrency(reservation.vehicle.price)}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No vehicle associated</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            {reservation.user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{reservation.user.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{reservation.user.email}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No customer associated</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reservation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Vehicle ID</p>
              <p className="font-mono">{reservation.vehicle_id ?? '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">User ID</p>
              <p className="font-mono">{reservation.user_id ?? '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ReservationShell>
  );
}