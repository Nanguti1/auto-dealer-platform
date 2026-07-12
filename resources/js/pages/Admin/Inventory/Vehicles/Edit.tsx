import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import type { AdminVehicle, AdminFeature } from '@/components/admin/inventory/types';
import VehicleForm from '@/components/admin/inventory/vehicle-form';
import admin from '@/routes/admin';

interface EditProps {
  vehicle: AdminVehicle;
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

export default function Edit({
  vehicle,
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
}: EditProps) {
  return (
    <InventoryShell title="Edit Vehicle" description="Update inventory details and publication settings." actions={<BackButton href={admin.vehicles.show(vehicle.id).url} />}>
      <VehicleForm
        vehicle={vehicle}
        action={admin.vehicles.update(vehicle.id).form().action}
        method="put"
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
