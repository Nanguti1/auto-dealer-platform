import adminRoutes from '@/routes/admin';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ShipmentForm from '@/components/admin/imports/shipment-form';
import type { Shipment } from '@/components/admin/imports/types';

export default function Create() {
  return (
    <ImportShell title="Create Shipment" description="Add a new shipment for an import request." actions={<ImportBackButton />}>
      <ShipmentForm shipment={{} as Shipment} action={adminRoutes.shipments.store().url} method="post" />
    </ImportShell>
  );
}
