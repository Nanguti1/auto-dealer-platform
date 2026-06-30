import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ImportForm from '@/components/admin/imports/import-form';
import { admin } from '@/routes/admin';

export default function Create() {
  return (
    <ImportShell title="Create Import Request" description="Create a new import request with vehicle details, origin, destination, and cost information." actions={<ImportBackButton />}>
      <ImportForm action={admin.imports.store.form().action} />
    </ImportShell>
  );
}
