import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { CmsPage } from './types';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export default function PageForm({ cmsPage, action, method = 'post' }: { cmsPage?: CmsPage; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save page"
      className="max-w-4xl"
    >
      <FormSection title="Basic Information" gridCols={2}>
        <FormField
          name="title"
          label="Title"
          value={cmsPage?.title ?? ''}
          onChange={() => {}}
          className="md:col-span-2"
        />
        <FormField
          name="slug"
          label="Slug"
          value={cmsPage?.slug ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          type="select"
          value={cmsPage?.status ?? 'draft'}
          options={statusOptions}
          onChange={() => {}}
        />
        <FormField
          name="published_at"
          label="Published at"
          type="datetime-local"
          value={cmsPage?.published_at ? new Date(cmsPage.published_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={cmsPage?.is_visible ?? true}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Content" gridCols={1} fullWidth>
        <FormField
          name="content"
          label="Content"
          type="textarea"
          value={cmsPage?.content ?? ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="SEO" gridCols={2}>
        <FormField
          name="meta_title"
          label="Meta title"
          value={cmsPage?.meta_title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="meta_description"
          label="Meta description"
          type="textarea"
          value={cmsPage?.meta_description ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
