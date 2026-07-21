import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ShipmentForm from '@/components/admin/imports/shipment-form';
import type { Shipment } from '@/components/admin/imports/types';

interface Props {
  shipment: Shipment;
  vehicleImports?: Array<{ id: number; reference_number: string }>;
}

export default function Edit({ shipment, vehicleImports = [] }: Props) {
  return (
    <ImportShell title="Edit Shipment" description="Update shipment details for this import request." actions={<ImportBackButton href={`/admin/shipments/${shipment.id}`} />}>
      <ShipmentForm shipment={shipment} action={`/admin/shipments/${shipment.id}`} method="put" vehicleImports={vehicleImports} />
    </ImportShell>
  );
}
