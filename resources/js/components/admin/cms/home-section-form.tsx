import { FormShell, FormField, FormSection } from '@/components/admin/shared';
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
  const [sectionType, setSectionType] = React.useState(homeSection?.section_type ?? 'featured_vehicles');
  const [title, setTitle] = React.useState(homeSection?.title ?? '');
  const [displayOrder, setDisplayOrder] = React.useState(String(homeSection?.display_order ?? 0));
  const [content, setContent] = React.useState(homeSection?.content ? JSON.stringify(homeSection.content, null, 2) : '');
  const [isVisible, setIsVisible] = React.useState(homeSection?.is_visible ?? true);

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save section"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="section_type"
          label="Section Type"
          type="select"
          value={sectionType}
          options={sectionTypeOptions}
          onChange={setSectionType}
        />
        <FormField
          name="title"
          label="Title"
          value={title}
          onChange={setTitle}
        />
        <FormField
          name="display_order"
          label="Display Order"
          type="number"
          value={displayOrder}
          onChange={setDisplayOrder}
        />
        <FormField
          name="content"
          label="Content (JSON)"
          type="textarea"
          value={content}
          placeholder='{"items": [1, 2, 3]}'
          hint="Enter section-specific configuration as JSON."
          onChange={setContent}
          className="font-mono text-xs"
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={isVisible}
          onChange={setIsVisible}
        />
      </FormSection>
    </FormShell>
  );
}
