import { vehicleName } from '@/components/admin/reservations/helpers';
import ReservationForm from '@/components/admin/reservations/reservation-form';
import ReservationShell, { ReservationBackButton } from '@/components/admin/reservations/reservation-shell';
import type { ReservationRecord } from '@/components/admin/reservations/types';
import admin from '@/routes/admin';

export default function Edit({ vehicleReservation }: { vehicleReservation: ReservationRecord }) {
  const reservation = vehicleReservation;

  return (
    <ReservationShell 
      title={`Edit Reservation #${reservation.id}`} 
      description="Update reservation details, status, and expiration information." 
      actions={<ReservationBackButton href={admin.reservations.show(reservation.id).url} />}
    >
      <ReservationForm 
        reservation={reservation} 
        action={admin.reservations.update.form(reservation.id).action} 
        method="put" 
      />
    </ReservationShell>
  );
}