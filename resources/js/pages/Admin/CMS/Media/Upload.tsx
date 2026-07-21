import { Form } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import InputError from '@/components/input-error';
import { ImageDropzone } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as React from 'react';

export default function MediaUpload() {
  const [category, setCategory] = React.useState('images');

  return (
    <CmsShell
      title="Upload Media"
      description="Upload new media files to the library."
      actions={<CmsBackButton />}
    >
      <Form action={adminRoutes.media.store().url} method="post" encType="multipart/form-data" className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
        {({ errors, processing }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="file">Media File</Label>
              <ImageDropzone
                multiple={false}
                onFilesSelected={(files) => {
                  const input = document.querySelector('input[name="file"]') as HTMLInputElement;

                  if (input && files.length > 0) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(files[0]);
                    input.files = dataTransfer.files;
                  }
                }}
                className="mb-2"
              />
              <Input id="file" name="file" type="file" className="hidden" />
              <InputError message={errors.file} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt_text">Alt Text</Label>
              <Input id="alt_text" name="alt_text" placeholder="Description for accessibility" />
              <InputError message={errors.alt_text} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea id="caption" name="caption" rows={2} placeholder="Optional caption" />
              <InputError message={errors.caption} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="images">Images</option>
                <option value="documents">Documents</option>
                <option value="videos">Videos</option>
                <option value="other">Other</option>
              </select>
              <InputError message={errors.category} />
            </div>
            <Button className="w-fit" disabled={processing}>{processing ? 'Uploading…' : 'Upload Media'}</Button>
          </>
        )}
      </Form>
    </CmsShell>
  );
}
