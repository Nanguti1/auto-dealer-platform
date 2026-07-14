import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BlogTag } from './types';

export default function TagForm({ tag, action, method = 'post' }: { tag?: BlogTag; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: tag?.name ?? '',
    slug: tag?.slug ?? '',
    color: tag?.color ?? '#3b82f6',
    usage_count: tag?.usage_count ?? 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag) {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <FormSection gridCols={1}>
        <FormField
          name="name"
          label="Name"
          value={data.name}
          error={errors.name}
          onChange={(value) => setData('name', value)}
        />
        <FormField
          name="slug"
          label="Slug"
          value={data.slug}
          error={errors.slug}
          onChange={(value) => setData('slug', value)}
        />
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex items-center gap-3">
            <Input
              id="color"
              name="color"
              type="color"
              value={data.color}
              onChange={(e) => setData('color', e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              name="color"
              type="text"
              value={data.color}
              onChange={(e) => setData('color', e.target.value)}
              placeholder="#3b82f6"
              className="flex-1"
            />
          </div>
        </div>
        <FormField
          name="usage_count"
          label="Usage Count"
          type="number"
          value={String(data.usage_count)}
          error={errors.usage_count}
          onChange={(value) => setData('usage_count', Number(value))}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save tag'}
        </Button>
      </div>
    </form>
  );
}
