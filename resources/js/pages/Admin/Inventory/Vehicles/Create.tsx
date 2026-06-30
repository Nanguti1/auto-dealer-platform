import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import VehicleForm from '@/components/admin/inventory/vehicle-form';
import { admin } from '@/routes/admin';
export default function Create() {
 return <InventoryShell title="Create Vehicle" description="Add a new unit to inventory." actions={<BackButton />}><VehicleForm action={admin.vehicles.store.form().action} /></InventoryShell>; 
}
