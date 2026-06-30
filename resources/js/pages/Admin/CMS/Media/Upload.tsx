import { Form } from '@inertiajs/react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import InputError from '@/components/input-error';
import { ImageDropzone } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
  return (
    <CmsShell
      title="Upload Media"
      description="Upload new media files to the library."
      actions={<CmsBackButton />}
    >
      <Form action="/admin/media" method="post" encType="multipart/form-data" className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
        {({ errors, processing }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="file">Media File</Label>
              <ImageDropzone
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
              <Select name="category" defaultValue="images">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="videos">Videos</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.category} />
            </div>
            <Button className="w-fit" disabled={processing}>{processing ? 'Uploading…' : 'Upload Media'}</Button>
          </>
        )}
      </Form>
    </CmsShell>
  );
}
