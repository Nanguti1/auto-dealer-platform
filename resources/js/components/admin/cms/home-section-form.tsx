import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { HomePageSection } from './types';

export default function HomeSectionForm({ homeSection, action, method = 'post' }: { homeSection?: HomePageSection; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="space-y-2">
            <Label htmlFor="section_type">Section Type</Label>
            <Select name="section_type" defaultValue={homeSection?.section_type ?? 'featured_vehicles'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured_vehicles">Featured Vehicles</SelectItem>
                <SelectItem value="featured_brands">Featured Brands</SelectItem>
                <SelectItem value="featured_categories">Featured Categories</SelectItem>
                <SelectItem value="featured_testimonials">Featured Testimonials</SelectItem>
                <SelectItem value="featured_blog_posts">Featured Blog Posts</SelectItem>
                <SelectItem value="statistics">Statistics</SelectItem>
                <SelectItem value="cta_section">CTA Section</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={errors.section_type} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={homeSection?.title ?? ''} />
            <InputError message={errors.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input id="display_order" name="display_order" type="number" defaultValue={String(homeSection?.display_order ?? 0)} />
            <InputError message={errors.display_order} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content (JSON)</Label>
            <Textarea
              id="content"
              name="content"
              rows={8}
              defaultValue={homeSection?.content ? JSON.stringify(homeSection.content, null, 2) : ''}
              placeholder='{"items": [1, 2, 3]}'
              className="font-mono text-xs"
            />
            <InputError message={errors.content} />
            <p className="text-xs text-muted-foreground">Enter section-specific configuration as JSON.</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_visible">Visible</Label>
            <Switch id="is_visible" name="is_visible" defaultChecked={homeSection?.is_visible ?? true} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save section'}</Button>
        </>
      )}
    </Form>
  );
}
