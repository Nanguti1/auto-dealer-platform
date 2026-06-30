import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { SeoSettings } from './types';

export default function SeoMetadataForm({ seoSettings, action, method = 'post' }: { seoSettings?: SeoSettings; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} encType="multipart/form-data" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input id="site_name" name="site_name" defaultValue={seoSettings?.site_name ?? ''} />
              <InputError message={errors.site_name} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea id="site_description" name="site_description" rows={2} defaultValue={seoSettings?.site_description ?? ''} />
              <InputError message={errors.site_description} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default_meta_title">Default Meta Title</Label>
              <Input id="default_meta_title" name="default_meta_title" defaultValue={seoSettings?.default_meta_title ?? ''} />
              <InputError message={errors.default_meta_title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default_meta_description">Default Meta Description</Label>
              <Textarea id="default_meta_description" name="default_meta_description" rows={2} defaultValue={seoSettings?.default_meta_description ?? ''} />
              <InputError message={errors.default_meta_description} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input id="canonical_url" name="canonical_url" defaultValue={seoSettings?.canonical_url ?? ''} />
              <InputError message={errors.canonical_url} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter_handle">Twitter Handle</Label>
              <Input id="twitter_handle" name="twitter_handle" defaultValue={seoSettings?.twitter_handle ?? ''} placeholder="@username" />
              <InputError message={errors.twitter_handle} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="robots_directive">Robots Directive</Label>
              <Select name="robots_directive" defaultValue={seoSettings?.robots_directive ?? 'index,follow'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="index,follow">Index, Follow</SelectItem>
                  <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                  <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                  <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.robots_directive} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="og_image">Default Open Graph Image</Label>
            <ImageDropzone
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
            <Input id="og_image" name="og_image" type="file" accept="image/*" className="hidden" />
            {seoSettings?.og_image && (
              <p className="text-sm text-muted-foreground">Current: {seoSettings.og_image}</p>
            )}
            <InputError message={errors.og_image} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="structured_data">Structured Data (JSON-LD)</Label>
            <Textarea
              id="structured_data"
              name="structured_data"
              rows={6}
              defaultValue={seoSettings?.structured_data ? JSON.stringify(seoSettings.structured_data, null, 2) : ''}
              placeholder='{"@context": "https://schema.org", ...}'
              className="font-mono text-xs"
            />
            <InputError message={errors.structured_data} />
            <p className="text-xs text-muted-foreground">Enter JSON-LD structured data for search engines.</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="sitemap_enabled">Enable Sitemap</Label>
            <Switch id="sitemap_enabled" name="sitemap_enabled" defaultChecked={seoSettings?.sitemap_enabled ?? true} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save SEO settings'}</Button>
        </>
      )}
    </Form>
  );
}
