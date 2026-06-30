import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { BlogTag } from './types';

export default function TagForm({ tag, action, method = 'post' }: { tag?: BlogTag; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={tag?.name ?? ''} />
            <InputError message={errors.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={tag?.slug ?? ''} />
            <InputError message={errors.slug} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-3">
              <Input
                id="color"
                name="color"
                type="color"
                defaultValue={tag?.color ?? '#3b82f6'}
                className="h-10 w-20 cursor-pointer"
              />
              <Input
                name="color"
                type="text"
                defaultValue={tag?.color ?? '#3b82f6'}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
            <InputError message={errors.color} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_visible">Visible</Label>
            <Switch id="is_visible" name="is_visible" defaultChecked={tag?.is_visible ?? true} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save tag'}</Button>
        </>
      )}
    </Form>
  );
}
