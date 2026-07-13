import ReservationForm from '@/components/admin/reservations/reservation-form';
import ReservationShell, { ReservationBackButton } from '@/components/admin/reservations/reservation-shell';
import type { ReservationRecord } from '@/components/admin/reservations/types';
import admin from '@/routes/admin';

export default function Edit({ reservation, vehicles, customers, users }: { 
  reservation: ReservationRecord; 
  vehicles: Array<{ id: number; name: string; make: string; model: string; year: number; price: number }>; 
  customers: Array<{ id: number; name: string; email: string; customer_number: string }>;
  users: Array<{ id: number; name: string; email?: string }> 
}) {
  return (
    <ReservationShell 
      title={`Edit Reservation #${reservation.id}`} 
      description="Update reservation details, status, and expiration information." 
      actions={<ReservationBackButton href={admin.reservations.show(reservation.id).url} />}
    >
      <ReservationForm 
        reservation={reservation} 
        action={admin.reservations.update(reservation.id).url} 
        method="put" 
        vehicles={vehicles}
        customers={customers}
        users={users}
        cancelUrl={admin.reservations.show(reservation.id).url}
      />
    </ReservationShell>
  );
}