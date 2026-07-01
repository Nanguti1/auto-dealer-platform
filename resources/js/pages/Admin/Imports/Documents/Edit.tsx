import { Form, Link } from '@inertiajs/react';
import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportDocument, ImportRequest } from '@/components/admin/imports/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ vehicleImport, document }: { vehicleImport?: ImportRequest; document: ImportDocument }) {
  const base = vehicleImport ? `/admin/imports/${vehicleImport.id}/documents` : '/admin/import-documents';

  return (
    <ImportShell title="Edit Import Document" description={vehicleImport ? importVehicleName(vehicleImport) : 'Update import document details.'} actions={<ImportBackButton href={base} />}>
      <Form action={`${base}/${document.id}`} method="post" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
        <input type="hidden" name="_method" value="put" />
        {({ errors, processing }) => (
          <>
            {vehicleImport ? <input type="hidden" name="import_request_id" value={vehicleImport.id} /> : null}
            <div className="space-y-2">
              <Label htmlFor="title">Document title</Label>
              <Input id="title" name="title" defaultValue={document.title} />
              <InputError message={errors.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document_type">Document type</Label>
              <Input id="document_type" name="document_type" defaultValue={document.document_type} placeholder="Bill of lading, customs declaration, inspection report…" />
              <InputError message={errors.document_type} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approval_status">Approval status</Label>
              <Input id="approval_status" name="approval_status" defaultValue={document.approval_status || 'pending'} />
              <InputError message={errors.approval_status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Metadata / notes</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={document.description} />
              <InputError message={errors.description} />
            </div>
            <Button className="w-fit" disabled={processing}>Update document</Button>
          </>
        )}
      </Form>
    </ImportShell>
  );
}
