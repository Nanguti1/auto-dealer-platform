import ImportForm from '@/components/admin/imports/import-form';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import { importVehicleName } from '@/components/admin/imports/helpers';
import type { ImportRequest } from '@/components/admin/imports/types';

export default function Edit({ vehicleImport }: { vehicleImport: ImportRequest }) {
  return (
    <ImportShell title="Edit Import Request" description={importVehicleName(vehicleImport)} actions={<ImportBackButton href={`/admin/imports/${vehicleImport.id}`} />}>
      <ImportForm vehicleImport={vehicleImport} action={`/admin/imports/${vehicleImport.id}`} />
    </ImportShell>
  );
}
