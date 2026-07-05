import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { BlogCategory } from './types';

export default function CategoryForm({ category, action, method = 'post' }: { category?: BlogCategory; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save category"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="name"
          label="Name"
          value={category?.name ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="slug"
          label="Slug"
          value={category?.slug ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="description"
          label="Description"
          type="textarea"
          value={category?.description ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="sort_order"
          label="Display Order"
          type="number"
          value={String(category?.sort_order ?? 0)}
          onChange={() => {}}
        />
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={category?.is_active ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
