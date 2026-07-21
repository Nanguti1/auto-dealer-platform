import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { HomePageSection } from './types';
import * as React from 'react';

const sectionTypeOptions = [
  { value: 'featured_vehicles', label: 'Featured Vehicles' },
  { value: 'featured_brands', label: 'Featured Brands' },
  { value: 'featured_categories', label: 'Featured Categories' },
  { value: 'featured_testimonials', label: 'Featured Testimonials' },
  { value: 'featured_blog_posts', label: 'Featured Blog Posts' },
  { value: 'statistics', label: 'Statistics' },
  { value: 'cta_section', label: 'CTA Section' },
  { value: 'hero_section', label: 'Hero Section' },
  { value: 'promotional_banners', label: 'Promotional Banners' },
];

export default function HomeSectionForm({ homeSection, action, method = 'post' }: { homeSection?: HomePageSection; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: homeSection?.name ?? '',
    slug: homeSection?.slug ?? '',
    type: homeSection?.type ?? sectionTypeOptions[0].value,
    sort_order: homeSection?.sort_order ?? 0,
    content: homeSection?.content ? JSON.stringify(homeSection.content, null, 2) : '',
    is_active: homeSection?.is_active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (homeSection) {
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
          name="type"
          label="Section Type"
          type="select"
          value={data.type}
          error={errors.type}
          options={sectionTypeOptions}
          onChange={(value) => setData('type', value)}
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
          name="content"
          label="Content (JSON)"
          type="textarea"
          value={data.content}
          error={errors.content}
          placeholder='{"brand_ids": [1, 2, 3]}'
          hint="Enter section-specific configuration as JSON."
          onChange={(value) => setData('content', value)}
          className="font-mono text-xs"
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
          {processing ? 'Saving...' : 'Save section'}
        </Button>
      </div>
    </form>
  );
}
