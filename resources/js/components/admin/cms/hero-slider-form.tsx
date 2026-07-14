import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { HeroSlider } from './types';
import * as React from 'react';

export default function HeroSliderForm({ heroSlider, action, method = 'post' }: { heroSlider?: HeroSlider; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    title: heroSlider?.title ?? '',
    subtitle: heroSlider?.subtitle ?? '',
    cta_button_text: heroSlider?.cta_button_text ?? '',
    cta_button_url: heroSlider?.cta_button_url ?? '',
    display_order: heroSlider?.display_order ?? 0,
    is_active: heroSlider?.is_active ?? true,
    is_published: heroSlider?.is_published ?? false,
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSlider) {
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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6" encType="multipart/form-data">
      <FormSection gridCols={1}>
        <FormField
          name="title"
          label="Title"
          value={data.title}
          error={errors.title}
          onChange={(value) => setData('title', value)}
        />
        <FormField
          name="subtitle"
          label="Subtitle"
          type="textarea"
          value={data.subtitle}
          error={errors.subtitle}
          onChange={(value) => setData('subtitle', value)}
        />
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Hero Image</label>
          <ImageDropzone
            multiple={false}
            previewUrl={heroSlider?.image_path}
            onFilesSelected={(files) => {
              if (files.length > 0) {
                setData('image', files[0]);
              }
            }}
            className="mb-2"
          />
          <input 
            id="image" 
            name="image" 
            type="file" 
            accept="image/*" 
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setData('image', e.target.files[0]);
              }
            }}
          />
        </div>
        <FormField
          name="cta_button_text"
          label="CTA Button Text"
          value={data.cta_button_text}
          error={errors.cta_button_text}
          onChange={(value) => setData('cta_button_text', value)}
        />
        <FormField
          name="cta_button_url"
          label="CTA Button URL"
          value={data.cta_button_url}
          error={errors.cta_button_url}
          onChange={(value) => setData('cta_button_url', value)}
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
          name="is_active"
          label="Active"
          type="switch"
          value={data.is_active}
          error={errors.is_active}
          onChange={(value) => setData('is_active', value)}
        />
        <FormField
          name="is_published"
          label="Published"
          type="switch"
          value={data.is_published}
          error={errors.is_published}
          onChange={(value) => setData('is_published', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save slider'}
        </Button>
      </div>
    </form>
  );
}
