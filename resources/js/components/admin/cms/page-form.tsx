import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { CmsPage } from './types';

export default function PageForm({ cmsPage, action, method = 'post' }: { cmsPage?: CmsPage; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={cmsPage?.title ?? ''} />
              <InputError message={errors.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={cmsPage?.slug ?? ''} />
              <InputError message={errors.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={cmsPage?.status ?? 'draft'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="published_at">Published at</Label>
              <Input id="published_at" name="published_at" type="datetime-local" defaultValue={cmsPage?.published_at ? new Date(cmsPage.published_at).toISOString().slice(0, 16) : ''} />
              <InputError message={errors.published_at} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <Label htmlFor="is_visible">Visible</Label>
              <Switch id="is_visible" name="is_visible" defaultChecked={cmsPage?.is_visible ?? true} value="1" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" rows={12} defaultValue={cmsPage?.content ?? ''} />
            <InputError message={errors.content} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta title</Label>
              <Input id="meta_title" name="meta_title" defaultValue={cmsPage?.meta_title ?? ''} />
              <InputError message={errors.meta_title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta description</Label>
              <Textarea id="meta_description" name="meta_description" rows={3} defaultValue={cmsPage?.meta_description ?? ''} />
              <InputError message={errors.meta_description} />
            </div>
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save page'}</Button>
        </>
      )}
    </Form>
  );
}
