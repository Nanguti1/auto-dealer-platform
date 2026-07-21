import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { Promotion } from './types';
import * as React from 'react';

const promotionTypeOptions = [
  { value: 'discount', label: 'Discount' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'featured_vehicle', label: 'Featured vehicle' },
  { value: 'finance', label: 'Finance' },
];

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'featured', label: 'Featured' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'expired', label: 'Expired' },
];

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function PromotionForm({ promotion, action, method = 'post' }: { promotion?: Promotion; action: string; method?: 'post' | 'put' }) {
  const rules = promotion?.rules ?? {};
  const { data, setData, post, put, processing, errors } = useForm({
    name: promotion?.name ?? promotion?.title ?? '',
    slug: promotion?.slug ?? '',
    type: promotion?.type ?? 'discount',
    description: promotion?.description ?? String(rules.description ?? ''),
    value: String(promotion?.value ?? promotion?.discount ?? ''),
    starts_at: formatDate(promotion?.starts_at),
    ends_at: formatDate(promotion?.ends_at),
    status: promotion?.status ?? (promotion?.is_active ? 'active' : 'draft'),
    visibility: promotion?.visibility ?? String(rules.visibility ?? 'public'),
    featured_vehicles: (promotion?.featured_vehicles ?? promotion?.vehicles ?? []).map((vehicle) => vehicle.title ?? vehicle.stock_number ?? vehicle.id).join(', '),
    is_active: promotion?.is_active ?? true,
    banner: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Transform form data to match backend structure
    const formData = {
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      type: data.type,
      value: data.value,
      starts_at: data.starts_at || null,
      ends_at: data.ends_at || null,
      is_active: data.is_active,
      rules: {
        description: data.description,
        visibility: data.visibility,
        featured_vehicles: data.featured_vehicles,
        status: data.status,
      },
      banner: data.banner,
    };

    if (promotion) {
      put(action, {
        data: formData,
        forceFormData: true,
      });
    } else {
      post(action, {
        data: formData,
        forceFormData: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6" encType="multipart/form-data">
      <FormSection title="Basic Information" gridCols={3}>
        <FormField
          name="name"
          label="Campaign name"
          value={data.name}
          error={errors.name}
          onChange={(value) => setData('name', value)}
        />
        <FormField
          name="slug"
          label="Slug"
          value={data.slug}
          error={errors.slug}
          onChange={(value) => setData('slug', value)}
        />
        <FormField
          name="type"
          label="Promotion type"
          type="select"
          value={data.type}
          error={errors.type}
          options={promotionTypeOptions}
          onChange={(value) => setData('type', value)}
        />
      </FormSection>

      <FormSection title="Description" gridCols={1} fullWidth>
        <FormField
          name="description"
          label="Description"
          type="textarea"
          value={data.description}
          error={errors.description}
          onChange={(value) => setData('description', value)}
        />
      </FormSection>

      <FormSection title="Banner" gridCols={1} fullWidth>
        <div className="space-y-2">
          <label htmlFor="banner" className="text-sm font-medium">Banner</label>
          <ImageDropzone
            multiple={false}
            previewUrl={promotion?.banner_path}
            onFilesSelected={(files) => {
              if (files.length > 0) {
                setData('banner', files[0]);
              }
            }}
          />
          <input
            id="banner"
            name="banner"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setData('banner', e.target.files[0]);
              }
            }}
          />
        </div>
      </FormSection>

      <FormSection title="Pricing & Schedule" gridCols={3}>
        <FormField
          name="value"
          label="Discount"
          type="number"
          step="0.01"
          value={data.value}
          error={errors.value}
          onChange={(value) => setData('value', value)}
        />
        <FormField
          name="starts_at"
          label="Start date"
          type="datetime-local"
          value={data.starts_at}
          error={errors.starts_at}
          onChange={(value) => setData('starts_at', value)}
        />
        <FormField
          name="ends_at"
          label="End date"
          type="datetime-local"
          value={data.ends_at}
          error={errors.ends_at}
          onChange={(value) => setData('ends_at', value)}
        />
      </FormSection>

      <FormSection title="Status & Visibility" gridCols={2}>
        <FormField
          name="status"
          label="Status"
          type="select"
          value={data.status}
          error={errors.status}
          options={statusOptions}
          onChange={(value) => setData('status', value)}
        />
        <FormField
          name="visibility"
          label="Visibility"
          type="select"
          value={data.visibility}
          error={errors.visibility}
          options={visibilityOptions}
          onChange={(value) => setData('visibility', value)}
        />
      </FormSection>

      <FormSection title="Featured Vehicles" gridCols={1} fullWidth>
        <FormField
          name="featured_vehicles"
          label="Featured vehicles"
          type="textarea"
          value={data.featured_vehicles}
          error={errors.featured_vehicles}
          placeholder="Use existing backend format or vehicle identifiers"
          onChange={(value) => setData('featured_vehicles', value)}
        />
      </FormSection>

      <FormSection title="Options" gridCols={1}>
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={data.is_active}
          error={errors.is_active}
          onChange={(value) => setData('is_active', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save promotion'}
        </Button>
      </div>
    </form>
  );
}
