import ImportForm from '@/components/admin/imports/import-form';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import admin from '@/routes/admin';

interface Props {
  vehicles?: Array<{ id: number; title: string; stock_number: string }>;
  customers?: Array<{ id: number; first_name: string; last_name: string; email: string; user_id?: number | null }>;
  suppliers?: Array<{ id: number; company_name: string }>;
}

export default function Create({ vehicles = [], customers = [], suppliers = [] }: Props) {
  return (
    <ImportShell title="Create Import Request" description="Create a new import request with vehicle details, origin, destination, and cost information." actions={<ImportBackButton />}>
      <ImportForm action={admin.imports.store().url} vehicles={vehicles} customers={customers} suppliers={suppliers} />
    </ImportShell>
  );
}
