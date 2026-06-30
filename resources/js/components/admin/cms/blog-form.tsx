import * as React from 'react';
import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { BlogPost } from './types';

export default function BlogForm({ blogPost, action, method = 'post' }: { blogPost?: BlogPost; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} encType="multipart/form-data" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={blogPost?.title ?? ''} />
              <InputError message={errors.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={blogPost?.slug ?? ''} />
              <InputError message={errors.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog_category_id">Category</Label>
              <Input id="blog_category_id" name="blog_category_id" type="number" defaultValue={String(blogPost?.blog_category_id ?? '')} />
              <InputError message={errors.blog_category_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author_id">Author</Label>
              <Input id="author_id" name="author_id" type="number" defaultValue={String(blogPost?.author_id ?? '')} />
              <InputError message={errors.author_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={blogPost?.status ?? 'draft'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="published_at">Published at</Label>
              <Input id="published_at" name="published_at" type="datetime-local" defaultValue={blogPost?.published_at ? new Date(blogPost.published_at).toISOString().slice(0, 16) : ''} />
              <InputError message={errors.published_at} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={blogPost?.excerpt ?? ''} />
            <InputError message={errors.excerpt} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Content</Label>
            <Textarea id="body" name="body" rows={12} defaultValue={blogPost?.body ?? ''} />
            <InputError message={errors.body} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="featured_image">Cover image</Label>
            <Input id="featured_image" name="featured_image" type="file" accept="image/*" />
            {blogPost?.featured_image_path && <p className="text-sm text-muted-foreground">Current: {blogPost.featured_image_path}</p>}
            <InputError message={errors.featured_image} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_featured">Featured</Label>
            <Switch id="is_featured" name="is_featured" defaultChecked={blogPost?.is_featured ?? false} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save blog post'}</Button>
        </>
      )}
    </Form>
  );
}
