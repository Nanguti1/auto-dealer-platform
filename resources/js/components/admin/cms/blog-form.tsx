import { useForm } from '@inertiajs/react';
import { FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { ImageDropzone } from '@/components/shared/media-upload';
import { generateSlug } from '@/lib/slug-utils';
import * as React from 'react';
import type { BlogPost } from './types';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'archived', label: 'Archived' },
];

interface BlogFormProps {
  blogPost?: BlogPost;
  action: string;
  method?: 'post' | 'put';
  categories?: Array<{ id: number; label: string }>;
}

export default function BlogForm({ blogPost, action, method = 'post', categories = [] }: BlogFormProps) {
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(!!blogPost?.slug);

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.label,
  }));

  const { data, setData, post, put, processing, errors } = useForm({
    title: blogPost?.title ?? '',
    slug: blogPost?.slug ?? '',
    blog_category_id: blogPost?.blog_category_id ?? null,
    author_id: blogPost?.author_id ?? null,
    status: blogPost?.status ?? 'draft',
    published_at: blogPost?.published_at ? new Date(blogPost.published_at).toISOString().slice(0, 16) : '',
    excerpt: blogPost?.excerpt ?? '',
    body: blogPost?.body ?? '',
    is_featured: blogPost?.is_featured ?? false,
    featured_image: null as File | null,
  });

  const handleTitleChange = (value: string) => {
    setData('title', value);
    // Only auto-generate slug if it hasn't been manually edited
    if (!isSlugManuallyEdited) {
      setData('slug', generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setData('slug', value);
    setIsSlugManuallyEdited(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blogPost) {
      put(action, {
        forceFormData: true,
      });
    } else {
      post(action, {
        forceFormData: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6" encType="multipart/form-data">
      <input type="hidden" name="slug" value={data.slug} />
      <FormSection title="Basic Information" gridCols={2}>
        <FormField
          name="title"
          label="Title"
          value={data.title}
          error={errors.title}
          onChange={handleTitleChange}
          className="md:col-span-2"
        />
        <FormField
          name="slug"
          label="Slug"
          value={data.slug}
          error={errors.slug}
          onChange={handleSlugChange}
        />
        <ForeignSelector
          name="blog_category_id"
          label="Category"
          value={data.blog_category_id}
          error={errors.blog_category_id}
          options={categoryOptions}
          placeholder="Select a category"
          searchable
          onChange={(value) => setData('blog_category_id', value)}
        />
        {blogPost && (
          <FormField
            name="author_id"
            label="Author"
            type="number"
            value={String(data.author_id)}
            error={errors.author_id}
            onChange={(value) => setData('author_id', Number(value))}
          />
        )}
        <FormField
          name="status"
          label="Status"
          type="select"
          value={data.status}
          error={errors.status}
          options={statusOptions}
          onChange={(value) => setData('status', value)}
        />
        <FormField
          name="published_at"
          label="Published at"
          type="datetime-local"
          value={data.published_at}
          error={errors.published_at}
          onChange={(value) => setData('published_at', value)}
        />
      </FormSection>

      <FormSection title="Content" gridCols={1} fullWidth>
        <FormField
          name="excerpt"
          label="Excerpt"
          type="textarea"
          value={data.excerpt}
          error={errors.excerpt}
          onChange={(value) => setData('excerpt', value)}
        />
        <FormField
          name="body"
          label="Content"
          type="richtext"
          value={data.body}
          error={errors.body}
          onChange={(value) => setData('body', value)}
        />
      </FormSection>

      <FormSection title="Media" gridCols={1} fullWidth>
        <div className="space-y-2">
          <label htmlFor="featured_image" className="text-sm font-medium">Cover image</label>
          <ImageDropzone
            onFilesSelected={(files) => {
              if (files.length > 0) {
                setData('featured_image', files[0]);
              }
            }}
            accept="image/*"
            multiple={false}
            previewUrl={blogPost?.featured_image_path}
          />
          <input 
            id="featured_image" 
            name="featured_image" 
            type="file" 
            accept="image/*" 
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setData('featured_image', e.target.files[0]);
              }
            }}
          />
        </div>
      </FormSection>

      <FormSection title="Options" gridCols={1}>
        <FormField
          name="is_featured"
          label="Featured"
          type="switch"
          value={data.is_featured}
          error={errors.is_featured}
          onChange={(value) => setData('is_featured', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save blog post'}
        </Button>
      </div>
    </form>
  );
}
