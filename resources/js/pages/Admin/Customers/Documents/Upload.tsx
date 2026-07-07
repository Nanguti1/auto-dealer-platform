import { Form } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react';
import * as React from 'react';
import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import type { CustomerRecord } from '@/components/admin/customers/types';
import InputError from '@/components/input-error';
import type { MediaUploadItem } from '@/components/shared/media-upload';
import { ImageDropzone } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Upload({ customer }: { customer?: CustomerRecord }) {
  const [items, setItems] = React.useState<MediaUploadItem[]>([]);
  const base = customer ? `/admin/customers/${customer.id}/documents` : '/admin/customer-documents';

  return (
    <CustomerShell title="Upload Customer Document" actions={<CustomerBackButton href={base} />}>
      <Form action={base} method="post" encType="multipart/form-data" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
        {({ errors, processing }) => (
          <>
            {customer ? <input type="hidden" name="customer_id" value={customer.id} /> : null}
            <div className="space-y-2"><Label htmlFor="title">Document title</Label><Input id="title" name="title" /><InputError message={errors.title} /></div>
            <div className="space-y-2"><Label htmlFor="document_type">Document type</Label><Input id="document_type" name="document_type" placeholder="Driver license, proof of insurance, purchase order…" /><InputError message={errors.document_type} /></div>
            <div className="space-y-2"><Label htmlFor="description">Metadata / notes</Label><Textarea id="description" name="description" rows={4} /><InputError message={errors.description} /></div>
            <ImageDropzone onFilesSelected={(files) => setItems(files.map((file) => ({ id: `${file.name}-${file.lastModified}`, file, url: URL.createObjectURL(file), alt: file.name })))} multiple={false} accept="image/*,application/pdf" error={errors.document} disabled={processing} />
            {items.map((item, index) => <input key={item.id} type="file" name={index === 0 ? 'document' : `documents[${index}]`} className="sr-only" />)}
            <Button disabled={processing}><UploadCloud className="mr-2 size-4" />{processing ? 'Uploading…' : 'Upload document'}</Button>
          </>
        )}
      </Form>
    </CustomerShell>
  );
}
