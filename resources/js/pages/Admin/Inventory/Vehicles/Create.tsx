import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import VehicleForm from '@/components/admin/inventory/vehicle-form';
import admin from '@/routes/admin';
import type { AdminFeature } from '@/components/admin/inventory/types';

interface CreateProps {
  branches: Array<{ value: number; label: string }>;
  makes: Array<{ value: number; label: string }>;
  models: Array<{ value: number; label: string; make_id: number }>;
  vehicleCategories: Array<{ value: number; label: string }>;
  trimLevels: Array<{ value: number; label: string }>;
  bodyTypes: Array<{ value: number; label: string }>;
  fuelTypes: Array<{ value: number; label: string }>;
  transmissionTypes: Array<{ value: number; label: string }>;
  driveTypes: Array<{ value: number; label: string }>;
  engineTypes: Array<{ value: number; label: string }>;
  colors: Array<{ value: number; label: string }>;
  interiorColors: Array<{ value: number; label: string }>;
  vehicleConditions: Array<{ value: number; label: string }>;
  vehicleStatuses: Array<{ value: number; label: string }>;
  inventoryStatuses: Array<{ value: number; label: string }>;
  features: AdminFeature[];
}

export default function Create({
  branches,
  makes,
  models,
  vehicleCategories,
  trimLevels,
  bodyTypes,
  fuelTypes,
  transmissionTypes,
  driveTypes,
  engineTypes,
  colors,
  interiorColors,
  vehicleConditions,
  vehicleStatuses,
  inventoryStatuses,
  features,
}: CreateProps) {
  return (
    <InventoryShell title="Create Vehicle" description="Add a new unit to inventory." actions={<BackButton />}>
      <VehicleForm
        action={admin.vehicles.store.form().action}
        branches={branches}
        makes={makes}
        models={models}
        vehicleCategories={vehicleCategories}
        trimLevels={trimLevels}
        bodyTypes={bodyTypes}
        fuelTypes={fuelTypes}
        transmissionTypes={transmissionTypes}
        driveTypes={driveTypes}
        engineTypes={engineTypes}
        colors={colors}
        interiorColors={interiorColors}
        vehicleConditions={vehicleConditions}
        vehicleStatuses={vehicleStatuses}
        inventoryStatuses={inventoryStatuses}
        features={features}
      />
    </InventoryShell>
  );
}
