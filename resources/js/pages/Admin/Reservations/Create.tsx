import ReservationShell, { ReservationBackButton } from '@/components/admin/reservations/reservation-shell';
import ReservationForm from '@/components/admin/reservations/reservation-form';
import { admin } from '@/routes/admin';

export default function Create() {
  return (
    <ReservationShell 
      title="Create Reservation" 
      description="Create a new vehicle reservation with customer details, vehicle selection, and deposit information." 
      actions={<ReservationBackButton />}
    >
      <ReservationForm action={admin.reservations.store.form().action} />
    </ReservationShell>
  );
}