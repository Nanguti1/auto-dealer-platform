import * as React from 'react';
import { Form } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react';
import InputError from '@/components/input-error';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import { importVehicleName } from '@/components/admin/imports/helpers';
import type { ImportRequest } from '@/components/admin/imports/types';
import { ImageDropzone, MediaUploadItem } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Upload({ vehicleImport }: { vehicleImport?: ImportRequest }) {
  const [items, setItems] = React.useState<MediaUploadItem[]>([]);
  const base = vehicleImport ? `/admin/imports/${vehicleImport.id}/documents` : '/admin/import-documents';

  return (
    <ImportShell title="Upload Import Document" description={vehicleImport ? importVehicleName(vehicleImport) : 'Attach import documents for customs, shipping, and compliance.'} actions={<ImportBackButton href={base} />}>
      <Form action={base} method="post" encType="multipart/form-data" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
        {({ errors, processing }) => (
          <>
            {vehicleImport ? <input type="hidden" name="import_request_id" value={vehicleImport.id} /> : null}
            <div className="space-y-2"><Label htmlFor="title">Document title</Label><Input id="title" name="title" /><InputError message={errors.title} /></div>
            <div className="space-y-2"><Label htmlFor="document_type">Document type</Label><Input id="document_type" name="document_type" placeholder="Invoice, bill of lading, inspection certificate, insurance, customs documents, import permit…" /><InputError message={errors.document_type} /></div>
            <div className="space-y-2"><Label htmlFor="approval_status">Approval status</Label><Input id="approval_status" name="approval_status" defaultValue="pending" /><InputError message={errors.approval_status} /></div>
            <div className="space-y-2"><Label htmlFor="description">Metadata / notes</Label><Textarea id="description" name="description" rows={4} /><InputError message={errors.description} /></div>
            <ImageDropzone onFilesSelected={(files) => setItems(files.map((file) => ({ id: `${file.name}-${file.lastModified}`, file, url: URL.createObjectURL(file), alt: file.name })))} multiple={false} accept="image/*,application/pdf" />
            {items.map((item, index) => <input key={item.id} type="file" name={index === 0 ? 'document' : `documents[${index}]`} className="sr-only" />)}
            <p className="text-sm text-muted-foreground">Selected: {items[0]?.alt ?? 'No file selected'}</p>
            <Button className="w-fit" disabled={processing}><UploadCloud className="mr-2 size-4" />{processing ? 'Uploading…' : 'Upload document'}</Button>
          </>
        )}
      </Form>
    </ImportShell>
  );
}
