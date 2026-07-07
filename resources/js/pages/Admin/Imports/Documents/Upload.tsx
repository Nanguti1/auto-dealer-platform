import { Form } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react';
import * as React from 'react';
import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportRequest } from '@/components/admin/imports/types';
import InputError from '@/components/input-error';
import type { MediaUploadItem } from '@/components/shared/media-upload';
import { ImageDropzone } from '@/components/shared/media-upload';
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
            <div className="space-y-2"><Label htmlFor="name">Document name</Label><Input id="name" name="name" /><InputError message={errors.name} /></div>
            <div className="space-y-2"><Label htmlFor="type">Document type</Label><Input id="type" name="type" placeholder="Invoice, bill of lading, inspection certificate, insurance, customs documents, import permit…" /><InputError message={errors.type} /></div>
            <ImageDropzone onFilesSelected={(files) => setItems(files.map((file) => ({ id: `${file.name}-${file.lastModified}`, file, url: URL.createObjectURL(file), alt: file.name })))} multiple={false} accept="image/*,application/pdf" error={errors.file} disabled={processing} />
            {items.map((item, index) => <input key={item.id} type="file" name="file" className="sr-only" />)}
            <Button className="w-fit" disabled={processing}><UploadCloud className="mr-2 size-4" />{processing ? 'Uploading…' : 'Upload document'}</Button>
          </>
        )}
      </Form>
    </ImportShell>
  );
}
