import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportForm from '@/components/admin/imports/import-form';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportRequest } from '@/components/admin/imports/types';
import admin from '@/routes/admin';

interface Props {
  vehicleImport: ImportRequest;
  vehicles?: Array<{ id: number; title: string; stock_number: string }>;
  customers?: Array<{ id: number; first_name: string; last_name: string; email: string; user_id?: number | null }>;
  suppliers?: Array<{ id: number; company_name: string }>;
}

export default function Edit({ vehicleImport, vehicles = [], customers = [], suppliers = [] }: Props) {
  return (
    <ImportShell title="Edit Import Request" description={importVehicleName(vehicleImport)} actions={<ImportBackButton href={admin.imports.show(vehicleImport.id).url} />}>
      <ImportForm vehicleImport={vehicleImport} action={admin.imports.update.form(vehicleImport.id).action} method="put" vehicles={vehicles} customers={customers} suppliers={suppliers} />
    </ImportShell>
  );
}
