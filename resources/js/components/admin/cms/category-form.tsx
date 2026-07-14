import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { BlogCategory } from './types';

export default function CategoryForm({ category, action, method = 'post' }: { category?: BlogCategory; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
    sort_order: category?.sort_order ?? 0,
    is_active: category?.is_active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
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
        <FormField
          name="description"
          label="Description"
          type="textarea"
          value={data.description}
          error={errors.description}
          onChange={(value) => setData('description', value)}
        />
        <FormField
          name="sort_order"
          label="Display Order"
          type="number"
          value={String(data.sort_order)}
          error={errors.sort_order}
          onChange={(value) => setData('sort_order', Number(value))}
        />
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={data.is_active}
          error={errors.is_active}
          onChange={(value) => setData('is_active', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save category'}
        </Button>
      </div>
    </form>
  );
}
