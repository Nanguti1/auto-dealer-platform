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
];

export default function HomeSectionForm({ homeSection, action, method = 'post' }: { homeSection?: HomePageSection; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    section_type: homeSection?.section_type ?? 'featured_vehicles',
    title: homeSection?.title ?? '',
    display_order: homeSection?.display_order ?? 0,
    content: homeSection?.content ? JSON.stringify(homeSection.content, null, 2) : '',
    is_visible: homeSection?.is_visible ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse content JSON with error handling
    let parsedContent = null;
    if (data.content) {
      try {
        parsedContent = JSON.parse(data.content);
      } catch (error) {
        alert('Invalid JSON in content field. Please check your syntax.');
        return;
      }
    }
    
    const formData = {
      ...data,
      content: parsedContent,
    };
    
    if (homeSection) {
      put(action, formData);
    } else {
      post(action, formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <FormSection gridCols={1}>
        <FormField
          name="section_type"
          label="Section Type"
          type="select"
          value={data.section_type}
          error={errors.section_type}
          options={sectionTypeOptions}
          onChange={(value) => setData('section_type', value)}
        />
        <FormField
          name="title"
          label="Title"
          value={data.title}
          error={errors.title}
          onChange={(value) => setData('title', value)}
        />
        <FormField
          name="display_order"
          label="Display Order"
          type="number"
          value={String(data.display_order)}
          error={errors.display_order}
          onChange={(value) => setData('display_order', Number(value))}
        />
        <FormField
          name="content"
          label="Content (JSON)"
          type="textarea"
          value={data.content}
          error={errors.content}
          placeholder='{"items": [1, 2, 3]}'
          hint="Enter section-specific configuration as JSON."
          onChange={(value) => setData('content', value)}
          className="font-mono text-xs"
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={data.is_visible}
          error={errors.is_visible}
          onChange={(value) => setData('is_visible', value)}
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
