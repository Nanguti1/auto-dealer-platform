import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { SeoSettings } from './types';
import * as React from 'react';

const seoableTypeOptions = [
  { value: 'App\\Models\\CmsPage', label: 'CMS Page' },
  { value: 'App\\Models\\DynamicCmsPage', label: 'Dynamic CMS Page' },
  { value: 'App\\Models\\BlogPost', label: 'Blog Post' },
  { value: 'App\\Models\\BlogCategory', label: 'Blog Category' },
  { value: 'App\\Models\\BlogTag', label: 'Blog Tag' },
  { value: 'App\\Models\\Vehicle', label: 'Vehicle' },
  { value: 'App\\Models\\Make', label: 'Vehicle Make' },
  { value: 'App\\Models\\TrimLevel', label: 'Vehicle Trim Level' },
  { value: 'App\\Models\\Brand', label: 'Brand' },
  { value: 'App\\Models\\Branch', label: 'Branch' },
  { value: 'App\\Models\\Customer', label: 'Customer' },
  { value: 'App\\Models\\HeroSlider', label: 'Hero Slider' },
  { value: 'App\\Models\\HomePageSection', label: 'Home Page Section' },
  { value: 'App\\Models\\Faq', label: 'FAQ' },
  { value: 'App\\Models\\Promotion', label: 'Promotion' },
  { value: 'App\\Models\\Review', label: 'Review' },
  { value: 'App\\Models\\Testimonial', label: 'Testimonial' },
  { value: 'App\\Models\\TradeInRequest', label: 'Trade-In Request' },
  { value: 'App\\Models\\FinanceApplication', label: 'Finance Application' },
  { value: 'App\\Models\\TestDriveBooking', label: 'Test Drive Booking' },
  { value: 'App\\Models\\VehicleReservation', label: 'Vehicle Reservation' },
  { value: 'App\\Models\\VehicleCategory', label: 'Vehicle Category' },
  { value: 'App\\Models\\VehicleCondition', label: 'Vehicle Condition' },
  { value: 'App\\Models\\VehicleStatus', label: 'Vehicle Status' },
];

export default function SeoMetadataForm({ seoSettings, action, method = 'post' }: { seoSettings?: SeoSettings; action: string; method?: 'post' | 'put' }) {
  const [seoableType, setSeoableType] = React.useState(seoSettings?.seoable_type ?? '');
  const [seoableId, setSeoableId] = React.useState(seoSettings?.seoable_id ?? '');
  const [metaTitle, setMetaTitle] = React.useState(seoSettings?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = React.useState(seoSettings?.meta_description ?? '');
  const [canonicalUrl, setCanonicalUrl] = React.useState(seoSettings?.canonical_url ?? '');
  const [openGraph, setOpenGraph] = React.useState(seoSettings?.open_graph ? JSON.stringify(seoSettings.open_graph, null, 2) : '{}');
  const [schemaMarkup, setSchemaMarkup] = React.useState(seoSettings?.schema_markup ? JSON.stringify(seoSettings.schema_markup, null, 2) : '{}');
  const [openGraphParsed, setOpenGraphParsed] = React.useState<Record<string, unknown>>(seoSettings?.open_graph ?? {});
  const [schemaMarkupParsed, setSchemaMarkupParsed] = React.useState<Record<string, unknown>>(seoSettings?.schema_markup ?? {});

  const handleOpenGraphChange = (value: string) => {
    setOpenGraph(value);
    try {
      const parsed = value ? JSON.parse(value) : {};
      setOpenGraphParsed(parsed);
      // Update hidden input
      const hiddenInput = document.querySelector('input[name="open_graph"]') as HTMLInputElement;
      if (hiddenInput) {
        hiddenInput.value = JSON.stringify(parsed);
      }
    } catch (e) {
      // Invalid JSON, don't update parsed state
    }
  };

  const handleSchemaMarkupChange = (value: string) => {
    setSchemaMarkup(value);
    try {
      const parsed = value ? JSON.parse(value) : {};
      setSchemaMarkupParsed(parsed);
      // Update hidden input
      const hiddenInput = document.querySelector('input[name="schema_markup"]') as HTMLInputElement;
      if (hiddenInput) {
        hiddenInput.value = JSON.stringify(parsed);
      }
    } catch (e) {
      // Invalid JSON, don't update parsed state
    }
  };

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save SEO settings"
      encType="multipart/form-data"
      className="max-w-4xl"
    >
      <FormSection title="Polymorphic Relation" gridCols={2}>
        <FormField
          name="seoable_type"
          label="Content Type"
          type="select"
          value={seoableType}
          options={seoableTypeOptions}
          onChange={setSeoableType}
          hint="Select the type of content this SEO metadata belongs to"
        />
        <FormField
          name="seoable_id"
          label="Content ID"
          type="number"
          value={seoableId}
          onChange={setSeoableId}
          placeholder="e.g., 1"
          hint="The ID of the content this SEO metadata belongs to"
        />
      </FormSection>

      <FormSection title="Basic Settings" gridCols={2}>
        <FormField
          name="meta_title"
          label="Meta Title"
          value={metaTitle}
          onChange={setMetaTitle}
          className="md:col-span-2"
          hint="The title displayed in search engine results"
        />
        <FormField
          name="meta_description"
          label="Meta Description"
          type="textarea"
          value={metaDescription}
          onChange={setMetaDescription}
          className="md:col-span-2"
          hint="A brief description for search engine results"
        />
        <FormField
          name="canonical_url"
          label="Canonical URL"
          value={canonicalUrl}
          onChange={setCanonicalUrl}
          className="md:col-span-2"
          hint="The preferred URL for this page to avoid duplicate content"
        />
      </FormSection>

      <FormSection title="Open Graph Data" gridCols={1} fullWidth>
        <FormField
          name="open_graph_display"
          label="Open Graph Data (JSON)"
          type="textarea"
          value={openGraph}
          placeholder='{"title": "Page Title", "description": "Page Description", "image": "https://example.com/image.jpg"}'
          hint="Enter Open Graph metadata as JSON for social media sharing."
          onChange={handleOpenGraphChange}
          className="font-mono text-xs"
        />
        <input
          type="hidden"
          name="open_graph"
          value={JSON.stringify(openGraphParsed)}
          readOnly
        />
      </FormSection>

      <FormSection title="Schema Markup" gridCols={1} fullWidth>
        <FormField
          name="schema_markup_display"
          label="Schema Markup (JSON-LD)"
          type="textarea"
          value={schemaMarkup}
          placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}'
          hint="Enter JSON-LD structured data for search engines."
          onChange={handleSchemaMarkupChange}
          className="font-mono text-xs"
        />
        <input
          type="hidden"
          name="schema_markup"
          value={JSON.stringify(schemaMarkupParsed)}
          readOnly
        />
      </FormSection>
    </FormShell>
  );
}
