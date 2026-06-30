import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { HeroSlider } from './types';

export default function HeroSliderForm({ heroSlider, action, method = 'post' }: { heroSlider?: HeroSlider; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} encType="multipart/form-data" className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={heroSlider?.title ?? ''} />
            <InputError message={errors.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea id="subtitle" name="subtitle" rows={2} defaultValue={heroSlider?.subtitle ?? ''} />
            <InputError message={errors.subtitle} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Hero Image</Label>
            <ImageDropzone
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
            <Input id="image" name="image" type="file" accept="image/*" className="hidden" />
            {heroSlider?.image_path && (
              <p className="text-sm text-muted-foreground">Current: {heroSlider.image_path}</p>
            )}
            <InputError message={errors.image} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_button_text">CTA Button Text</Label>
            <Input id="cta_button_text" name="cta_button_text" defaultValue={heroSlider?.cta_button_text ?? ''} />
            <InputError message={errors.cta_button_text} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_button_url">CTA Button URL</Label>
            <Input id="cta_button_url" name="cta_button_url" defaultValue={heroSlider?.cta_button_url ?? ''} />
            <InputError message={errors.cta_button_url} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input id="display_order" name="display_order" type="number" defaultValue={String(heroSlider?.display_order ?? 0)} />
            <InputError message={errors.display_order} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_active">Active</Label>
            <Switch id="is_active" name="is_active" defaultChecked={heroSlider?.is_active ?? true} value="1" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_published">Published</Label>
            <Switch id="is_published" name="is_published" defaultChecked={heroSlider?.is_published ?? false} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save slider'}</Button>
        </>
      )}
    </Form>
  );
}
