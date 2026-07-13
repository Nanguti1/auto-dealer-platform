import ReservationForm from '@/components/admin/reservations/reservation-form';
import ReservationShell, { ReservationBackButton } from '@/components/admin/reservations/reservation-shell';
import admin from '@/routes/admin';

export default function Create({ vehicles, users }: { vehicles: Array<{ id: number; name: string; make?: string; model?: string; year?: number }>; users: Array<{ id: number; name: string; email?: string }> }) {
  return (
    <ReservationShell 
      title="Create Reservation" 
      description="Create a new vehicle reservation with customer details, vehicle selection, and deposit information." 
      actions={<ReservationBackButton />}
    >
      <ReservationForm action={admin.reservations.store().url} method="post" vehicles={vehicles} users={users} cancelUrl={admin.reservations.index().url} />
    </ReservationShell>
  );
}