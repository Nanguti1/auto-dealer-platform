import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import type { BlogCategory } from './types';

export default function CategoryForm({ category, action, method = 'post' }: { category?: BlogCategory; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={category?.name ?? ''} />
            <InputError message={errors.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={category?.slug ?? ''} />
            <InputError message={errors.slug} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={category?.description ?? ''} />
            <InputError message={errors.description} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" name="order" type="number" defaultValue={String(category?.order ?? 0)} />
            <InputError message={errors.order} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_active">Active</Label>
            <Switch id="is_active" name="is_active" defaultChecked={category?.is_active ?? true} value="1" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_visible">Visible</Label>
            <Switch id="is_visible" name="is_visible" defaultChecked={category?.is_visible ?? true} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save category'}</Button>
        </>
      )}
    </Form>
  );
}
