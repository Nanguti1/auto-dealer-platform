import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { BlogPost } from './types';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'archived', label: 'Archived' },
];

export default function BlogForm({ blogPost, action, method = 'post' }: { blogPost?: BlogPost; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save blog post"
      encType="multipart/form-data"
      className="max-w-4xl"
    >
      <FormSection title="Basic Information" gridCols={2}>
        <FormField
          name="title"
          label="Title"
          value={blogPost?.title ?? ''}
          onChange={() => {}}
          className="md:col-span-2"
        />
        <FormField
          name="slug"
          label="Slug"
          value={blogPost?.slug ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="blog_category_id"
          label="Category"
          type="number"
          value={String(blogPost?.blog_category_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="author_id"
          label="Author"
          type="number"
          value={String(blogPost?.author_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          type="select"
          value={blogPost?.status ?? 'draft'}
          options={statusOptions}
          onChange={() => {}}
        />
        <FormField
          name="published_at"
          label="Published at"
          type="datetime-local"
          value={blogPost?.published_at ? new Date(blogPost.published_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Content" gridCols={1} fullWidth>
        <FormField
          name="excerpt"
          label="Excerpt"
          type="textarea"
          value={blogPost?.excerpt ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="body"
          label="Content"
          type="textarea"
          value={blogPost?.body ?? ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Media" gridCols={1} fullWidth>
        <div className="space-y-2">
          <label htmlFor="featured_image" className="text-sm font-medium">Cover image</label>
          <input id="featured_image" name="featured_image" type="file" accept="image/*" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          {blogPost?.featured_image_path && <p className="text-sm text-muted-foreground">Current: {blogPost.featured_image_path}</p>}
        </div>
      </FormSection>

      <FormSection title="Options" gridCols={1}>
        <FormField
          name="is_featured"
          label="Featured"
          type="switch"
          value={blogPost?.is_featured ?? false}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
