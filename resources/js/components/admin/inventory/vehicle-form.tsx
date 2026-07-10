import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import * as React from 'react';
import InputError from '@/components/input-error';
import { MediaUpload } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { generateSlug } from '@/lib/slug-utils';
import type { AdminVehicle } from './types';

const tabs = ['Basic Information', 'Specifications', 'Features', 'Pricing', 'Media', 'SEO', 'Publication'];

function Field({ name, label, type = 'text', value, error }: { name: string; label: string; type?: string; value?: string | number | boolean; error?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={String(value ?? '')} />
      <InputError message={error} />
    </div>
  );
}

export default function VehicleForm({ vehicle, action, method = 'post' }: { vehicle?: AdminVehicle; action: string; method?: 'post' | 'put' | 'patch' }) {
  const [title, setTitle] = React.useState(vehicle?.title ?? '');
  const [slug, setSlug] = React.useState(vehicle?.slug ?? '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(!!vehicle?.slug);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    // Only auto-generate slug if it hasn't been manually edited
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManuallyEdited(true);
  };

  return (
    <Form action={action} method="post" encType="multipart/form-data" className="space-y-6">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={method === 'post' ? 'post' : 'put'} />
          <input type="hidden" name="slug" value={slug} />

          <Tabs defaultValue={tabs[0]}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start">
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="Basic Information" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" type="text" value={title} onChange={handleTitleChange} />
                <InputError message={errors.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" type="text" value={slug} onChange={handleSlugChange} />
                <InputError message={errors.slug} />
              </div>

              <Field name="stock_number" label="Stock number" value={vehicle?.stock_number} error={errors.stock_number} />
              <Field name="vin" label="VIN" value={vehicle?.vin} error={errors.vin} />
              <Field name="year" label="Year" type="number" value={vehicle?.year} error={errors.year} />
              <Field name="branch_id" label="Branch ID" type="number" value={(vehicle?.branch_id as number) ?? ''} error={errors.branch_id} />
              <Field name="make_id" label="Make ID" type="number" value={(vehicle?.make_id as number) ?? ''} error={errors.make_id} />
              <Field name="model_id" label="Model ID" type="number" value={(vehicle?.model_id as number) ?? ''} error={errors.model_id} />

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor id="description" name="description" value={String(vehicle?.description ?? '')} />
                <InputError message={errors.description} />
              </div>
            </TabsContent>

            <TabsContent value="Specifications" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
              {['mileage', 'vehicle_category_id', 'trim_level_id', 'body_type_id', 'fuel_type_id', 'transmission_type_id', 'drive_type_id', 'engine_type_id', 'color_id', 'interior_color_id', 'vehicle_condition_id', 'vehicle_status_id', 'inventory_status_id'].map((field) => (
                <Field key={field} name={field} label={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} type="number" value={vehicle?.[field as keyof AdminVehicle] as number} error={errors[field as keyof typeof errors] as string} />
              ))}
            </TabsContent>

            <TabsContent value="Features" className="grid gap-4 rounded-xl border bg-card p-4">
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea id="features" name="features" defaultValue={vehicle?.features?.join(', ') || ''} />
                <InputError message={errors.features} />
              </div>
            </TabsContent>

            <TabsContent value="Pricing" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="cost_price" label="Cost Price" type="number" step="0.01" value={vehicle?.cost_price} error={errors.cost_price} />
              <Field name="sale_price" label="Sale Price" type="number" step="0.01" value={vehicle?.sale_price} error={errors.sale_price} />
              <Field name="msrp" label="MSRP" type="number" step="0.01" value={vehicle?.msrp} error={errors.msrp} />
            </TabsContent>

            <TabsContent value="Media" className="grid gap-4 rounded-xl border bg-card p-4">
              <div className="space-y-2">
                <Label htmlFor="media">Media</Label>
                <MediaUpload name="media" existingMedia={vehicle?.media} />
                <InputError message={errors.media} />
              </div>
            </TabsContent>

            <TabsContent value="SEO" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input id="meta_title" name="meta_title" type="text" defaultValue={vehicle?.meta_title} />
                <InputError message={errors.meta_title} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea id="meta_description" name="meta_description" defaultValue={vehicle?.meta_description} />
                <InputError message={errors.meta_description} />
              </div>
            </TabsContent>

            <TabsContent value="Publication" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Switch id="is_featured" name="is_featured" defaultChecked={vehicle?.is_featured} />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="is_certified" name="is_certified" defaultChecked={vehicle?.is_certified} />
                <Label htmlFor="is_certified">Certified</Label>
              </div>
              <Field name="acquired_at" label="Acquired At" type="date" value={vehicle?.acquired_at?.split('T')[0]} error={errors.acquired_at} />
              <Field name="listed_at" label="Listed At" type="date" value={vehicle?.listed_at?.split('T')[0]} error={errors.listed_at} />
              <Field name="sold_at" label="Sold At" type="date" value={vehicle?.sold_at?.split('T')[0]} error={errors.sold_at} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Saving...' : 'Save Vehicle'}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
