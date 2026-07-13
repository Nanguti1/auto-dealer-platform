import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { HeroSlider } from './types';
import * as React from 'react';

export default function HeroSliderForm({ heroSlider, action, method = 'post' }: { heroSlider?: HeroSlider; action: string; method?: 'post' | 'put' }) {
  const [title, setTitle] = React.useState(heroSlider?.title ?? '');
  const [subtitle, setSubtitle] = React.useState(heroSlider?.subtitle ?? '');
  const [ctaButtonText, setCtaButtonText] = React.useState(heroSlider?.cta_button_text ?? '');
  const [ctaButtonUrl, setCtaButtonUrl] = React.useState(heroSlider?.cta_button_url ?? '');
  const [displayOrder, setDisplayOrder] = React.useState(String(heroSlider?.display_order ?? 0));
  const [isActive, setIsActive] = React.useState(heroSlider?.is_active ?? true);
  const [isPublished, setIsPublished] = React.useState(heroSlider?.is_published ?? false);

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save slider"
      encType="multipart/form-data"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="title"
          label="Title"
          value={title}
          onChange={setTitle}
        />
        <FormField
          name="subtitle"
          label="Subtitle"
          type="textarea"
          value={subtitle}
          onChange={setSubtitle}
        />
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Hero Image</label>
          <ImageDropzone
            multiple={false}
            previewUrl={heroSlider?.image_path}
            onFilesSelected={(files) => {
              const input = document.querySelector('input[name="image"]') as HTMLInputElement;

              if (input && files.length > 0) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(files[0]);
                input.files = dataTransfer.files;
              }
            }}
            className="mb-2"
          />
          <input id="image" name="image" type="file" accept="image/*" className="hidden" />
        </div>
        <FormField
          name="cta_button_text"
          label="CTA Button Text"
          value={ctaButtonText}
          onChange={setCtaButtonText}
        />
        <FormField
          name="cta_button_url"
          label="CTA Button URL"
          value={ctaButtonUrl}
          onChange={setCtaButtonUrl}
        />
        <FormField
          name="display_order"
          label="Display Order"
          type="number"
          value={displayOrder}
          onChange={setDisplayOrder}
        />
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={isActive}
          onChange={setIsActive}
        />
        <FormField
          name="is_published"
          label="Published"
          type="switch"
          value={isPublished}
          onChange={setIsPublished}
        />
      </FormSection>
    </FormShell>
  );
}
