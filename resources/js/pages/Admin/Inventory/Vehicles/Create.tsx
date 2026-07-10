import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import VehicleForm from '@/components/admin/inventory/vehicle-form';
import admin from '@/routes/admin';

interface CreateProps {
  branches: Array<{ value: number; label: string }>;
  makes: Array<{ value: number; label: string }>;
  models: Array<{ value: number; label: string; make_id: number }>;
}

export default function Create({ branches, makes, models }: CreateProps) {
  return (
    <InventoryShell title="Create Vehicle" description="Add a new unit to inventory." actions={<BackButton />}>
      <VehicleForm action={admin.vehicles.store.form().action} branches={branches} makes={makes} models={models} />
    </InventoryShell>
  );
}
