import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import type { AdminVehicle } from '@/components/admin/inventory/types';
import VehicleForm from '@/components/admin/inventory/vehicle-form';
export default function Edit({ vehicle }: { vehicle: AdminVehicle }) {
 return <InventoryShell title="Edit Vehicle" description="Update inventory details and publication settings." actions={<BackButton href={`/admin/vehicles/${vehicle.id}`} />}><VehicleForm vehicle={vehicle} action={`/admin/vehicles/${vehicle.id}`} method="put" /></InventoryShell>; 
}
