import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { generateSlug } from '@/lib/slug-utils';
import * as React from 'react';
import type { BlogPost } from './types';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'archived', label: 'Archived' },
];

export default function BlogForm({ blogPost, action, method = 'post' }: { blogPost?: BlogPost; action: string; method?: 'post' | 'put' }) {
  const [title, setTitle] = React.useState(blogPost?.title ?? '');
  const [slug, setSlug] = React.useState(blogPost?.slug ?? '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(!!blogPost?.slug);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    // Only auto-generate slug if it hasn't been manually edited
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setIsSlugManuallyEdited(true);
  };

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save blog post"
      encType="multipart/form-data"
      className="max-w-4xl"
    >
      <input type="hidden" name="slug" value={slug} />
      <FormSection title="Basic Information" gridCols={2}>
        <FormField
          name="title"
          label="Title"
          value={title}
          onChange={handleTitleChange}
          className="md:col-span-2"
        />
        <FormField
          name="slug"
          label="Slug"
          value={slug}
          onChange={handleSlugChange}
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
          type="richtext"
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
