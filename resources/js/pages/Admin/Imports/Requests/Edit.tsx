import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportForm from '@/components/admin/imports/import-form';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportRequest } from '@/components/admin/imports/types';
import { admin } from '@/routes/admin';

export default function Edit({ vehicleImport }: { vehicleImport: ImportRequest }) {
  return (
    <ImportShell title="Edit Import Request" description={importVehicleName(vehicleImport)} actions={<ImportBackButton href={admin.imports.show(vehicleImport.id).url} />}>
      <ImportForm vehicleImport={vehicleImport} action={admin.imports.update.form(vehicleImport.id).action} method="put" />
    </ImportShell>
  );
}
