import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ShipmentForm from '@/components/admin/imports/shipment-form';
import type { Shipment } from '@/components/admin/imports/types';

export default function Edit({ shipment }: { shipment: Shipment }) {
  return (
    <ImportShell title="Edit Shipment" description="Update shipment details for this import request." actions={<ImportBackButton href={`/admin/shipments/${shipment.id}`} />}>
      <ShipmentForm shipment={shipment} action={`/admin/shipments/${shipment.id}`} method="put" />
    </ImportShell>
  );
}
