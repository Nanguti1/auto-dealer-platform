import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { HomePageSection } from './types';

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
          value={homeSection?.section_type ?? 'featured_vehicles'}
          options={sectionTypeOptions}
          onChange={() => {}}
        />
        <FormField
          name="title"
          label="Title"
          value={homeSection?.title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="display_order"
          label="Display Order"
          type="number"
          value={String(homeSection?.display_order ?? 0)}
          onChange={() => {}}
        />
        <FormField
          name="content"
          label="Content (JSON)"
          type="textarea"
          value={homeSection?.content ? JSON.stringify(homeSection.content, null, 2) : ''}
          placeholder='{"items": [1, 2, 3]}'
          hint="Enter section-specific configuration as JSON."
          onChange={() => {}}
          className="font-mono text-xs"
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={homeSection?.is_visible ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
