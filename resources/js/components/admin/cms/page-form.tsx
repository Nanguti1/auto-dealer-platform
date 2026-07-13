import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { generateSlug } from '@/lib/slug-utils';
import * as React from 'react';
import type { CmsPage } from './types';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export default function PageForm({ cmsPage, action, method = 'post' }: { cmsPage?: CmsPage; action: string; method?: 'post' | 'put' }) {
  const [title, setTitle] = React.useState(cmsPage?.title ?? '');
  const [slug, setSlug] = React.useState(cmsPage?.slug ?? '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(!!cmsPage?.slug);
  const [publishedAt, setPublishedAt] = React.useState(cmsPage?.published_at ? new Date(cmsPage.published_at).toISOString().slice(0, 16) : '');
  const [isVisible, setIsVisible] = React.useState(cmsPage?.is_visible ?? true);
  const [content, setContent] = React.useState(cmsPage?.content ?? '');
  const [metaTitle, setMetaTitle] = React.useState(cmsPage?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = React.useState(cmsPage?.meta_description ?? '');

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
      submitLabel="Save page"
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
          value={publishedAt}
          onChange={setPublishedAt}
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={isVisible}
          onChange={setIsVisible}
        />
      </FormSection>

      <FormSection title="Content" gridCols={1} fullWidth>
        <FormField
          name="content"
          label="Content"
          type="richtext"
          value={content}
          onChange={setContent}
        />
      </FormSection>

      <FormSection title="SEO" gridCols={2}>
        <FormField
          name="meta_title"
          label="Meta title"
          value={metaTitle}
          onChange={setMetaTitle}
        />
        <FormField
          name="meta_description"
          label="Meta description"
          type="textarea"
          value={metaDescription}
          onChange={setMetaDescription}
        />
      </FormSection>
    </FormShell>
  );
}
