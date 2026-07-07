import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { HeroSlider } from './types';

export default function HeroSliderForm({ heroSlider, action, method = 'post' }: { heroSlider?: HeroSlider; action: string; method?: 'post' | 'put' }) {
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
          value={heroSlider?.title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="subtitle"
          label="Subtitle"
          type="textarea"
          value={heroSlider?.subtitle ?? ''}
          onChange={() => {}}
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
          value={heroSlider?.cta_button_text ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="cta_button_url"
          label="CTA Button URL"
          value={heroSlider?.cta_button_url ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="display_order"
          label="Display Order"
          type="number"
          value={String(heroSlider?.display_order ?? 0)}
          onChange={() => {}}
        />
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={heroSlider?.is_active ?? true}
          onChange={() => {}}
        />
        <FormField
          name="is_published"
          label="Published"
          type="switch"
          value={heroSlider?.is_published ?? false}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
