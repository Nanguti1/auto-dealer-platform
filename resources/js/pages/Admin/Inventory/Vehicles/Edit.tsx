import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import type { AdminVehicle } from '@/components/admin/inventory/types';
import VehicleForm from '@/components/admin/inventory/vehicle-form';

interface EditProps {
  vehicle: AdminVehicle;
  branches: Array<{ value: number; label: string }>;
  makes: Array<{ value: number; label: string }>;
  models: Array<{ value: number; label: string; make_id: number }>;
}

export default function Edit({ vehicle, branches, makes, models }: EditProps) {
  return (
    <InventoryShell title="Edit Vehicle" description="Update inventory details and publication settings." actions={<BackButton href={`/admin/vehicles/${vehicle.id}`} />}>
      <VehicleForm vehicle={vehicle} action={`/admin/vehicles/${vehicle.id}`} method="put" branches={branches} makes={makes} models={models} />
    </InventoryShell>
  );
}
