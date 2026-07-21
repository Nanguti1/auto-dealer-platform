import { Form, Link } from '@inertiajs/react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { MediaFile } from '@/components/admin/cms/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ mediaFile }: { mediaFile: MediaFile }) {
  return (
    <CmsShell
      title="Edit Media"
      description="Update media file details."
      actions={<CmsBackButton />}
    >
      <Form action={`/admin/media/${mediaFile.id}`} method="post" className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
        <input type="hidden" name="_method" value="put" />
        {({ errors, processing }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="file_name">File Name</Label>
              <Input id="file_name" name="file_name" defaultValue={mediaFile.file_name} />
              <InputError message={errors.file_name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt_text">Alt Text</Label>
              <Input id="alt_text" name="alt_text" defaultValue={mediaFile.alt_text} placeholder="Description for accessibility" />
              <InputError message={errors.alt_text} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea id="caption" name="caption" rows={2} defaultValue={mediaFile.caption} placeholder="Optional caption" />
              <InputError message={errors.caption} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={mediaFile.category || 'images'}>
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
            <Button className="w-fit" disabled={processing}>Update Media</Button>
          </>
        )}
      </Form>
    </CmsShell>
  );
}
