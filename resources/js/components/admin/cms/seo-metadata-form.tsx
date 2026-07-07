import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { SeoSettings } from './types';

const robotsDirectiveOptions = [
  { value: 'index,follow', label: 'Index, Follow' },
  { value: 'noindex,follow', label: 'No Index, Follow' },
  { value: 'index,nofollow', label: 'Index, No Follow' },
  { value: 'noindex,nofollow', label: 'No Index, No Follow' },
];

export default function SeoMetadataForm({ seoSettings, action, method = 'post' }: { seoSettings?: SeoSettings; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save SEO settings"
      encType="multipart/form-data"
      className="max-w-4xl"
    >
      <FormSection title="Basic Settings" gridCols={2}>
        <FormField
          name="site_name"
          label="Site Name"
          value={seoSettings?.site_name ?? ''}
          onChange={() => {}}
          className="md:col-span-2"
        />
        <FormField
          name="site_description"
          label="Site Description"
          type="textarea"
          value={seoSettings?.site_description ?? ''}
          onChange={() => {}}
          className="md:col-span-2"
        />
        <FormField
          name="default_meta_title"
          label="Default Meta Title"
          value={seoSettings?.default_meta_title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="default_meta_description"
          label="Default Meta Description"
          type="textarea"
          value={seoSettings?.default_meta_description ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="canonical_url"
          label="Canonical URL"
          value={seoSettings?.canonical_url ?? ''}
          onChange={() => {}}
          className="md:col-span-2"
        />
        <FormField
          name="twitter_handle"
          label="Twitter Handle"
          value={seoSettings?.twitter_handle ?? ''}
          placeholder="@username"
          onChange={() => {}}
        />
        <FormField
          name="robots_directive"
          label="Robots Directive"
          type="select"
          value={seoSettings?.robots_directive ?? 'index,follow'}
          options={robotsDirectiveOptions}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Open Graph Image" gridCols={1} fullWidth>
        <div className="space-y-2">
          <label htmlFor="og_image" className="text-sm font-medium">Default Open Graph Image</label>
          <ImageDropzone
            multiple={false}
            previewUrl={seoSettings?.og_image}
            onFilesSelected={(files) => {
              const input = document.querySelector('input[name="og_image"]') as HTMLInputElement;

              if (input && files.length > 0) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(files[0]);
                input.files = dataTransfer.files;
              }
            }}
            className="mb-2"
          />
          <input id="og_image" name="og_image" type="file" accept="image/*" className="hidden" />
        </div>
      </FormSection>

      <FormSection title="Structured Data" gridCols={1} fullWidth>
        <FormField
          name="structured_data"
          label="Structured Data (JSON-LD)"
          type="textarea"
          value={seoSettings?.structured_data ? JSON.stringify(seoSettings.structured_data, null, 2) : ''}
          placeholder='{"@context": "https://schema.org", ...}'
          hint="Enter JSON-LD structured data for search engines."
          onChange={() => {}}
          className="font-mono text-xs"
        />
      </FormSection>

      <FormSection title="Sitemap" gridCols={1}>
        <FormField
          name="sitemap_enabled"
          label="Enable Sitemap"
          type="switch"
          value={seoSettings?.sitemap_enabled ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
