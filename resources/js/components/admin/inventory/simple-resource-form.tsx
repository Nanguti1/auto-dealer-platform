import { useForm } from '@inertiajs/react';
import { FormShell, FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { AdminFeature, AdminGallery } from './types';

export function FeatureForm({ feature, action }: { feature?: AdminFeature; action: string }) {
  const { data, setData, processing, errors } = useForm({
    name: feature?.name ?? feature?.title ?? '',
    slug: feature?.slug ?? '',
    category: feature?.category ?? '',
    is_active: feature?.is_active ?? true,
  });

  return (
    <FormShell
      action={action}
      method={feature ? 'put' : 'post'}
      submitLabel="Save feature"
      className="max-w-2xl"
      processing={processing}
      errors={errors}
    >
      <FormSection gridCols={1}>
        <FormField
          name="name"
          label="Name"
          value={data.name}
          onChange={(value) => setData('name', value)}
          error={errors.name}
        />
        <FormField
          name="slug"
          label="Slug"
          value={data.slug}
          onChange={(value) => setData('slug', value)}
          error={errors.slug}
        />
        <FormField
          name="category"
          label="Category"
          value={data.category}
          onChange={(value) => setData('category', value)}
          error={errors.category}
        />
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={data.is_active}
          onChange={(value) => setData('is_active', value)}
          error={errors.is_active}
        />
      </FormSection>
    </FormShell>
  );
}

interface GalleryFormProps {
  gallery?: AdminGallery;
  action: string;
  vehicles?: Array<{ id: number; label: string }>;
}

export function GalleryForm({ gallery, action, vehicles = [] }: GalleryFormProps) {
  const { data, setData, processing, errors } = useForm({
    vehicle_id: String(gallery?.vehicle_id ?? ''),
    alt_text: gallery?.alt_text ?? '',
    sort_order: String(gallery?.sort_order ?? 0),
    is_primary: Boolean(gallery?.is_primary),
  });

  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.label,
  }));

  return (
    <FormShell
      action={action}
      method={gallery ? 'put' : 'post'}
      submitLabel="Save image"
      encType="multipart/form-data"
      className="max-w-2xl"
      processing={processing}
      errors={errors}
    >
      <FormSection gridCols={1}>
        <ForeignSelector
          name="vehicle_id"
          label="Vehicle"
          value={data.vehicle_id}
          onChange={(value) => setData('vehicle_id', value)}
          options={vehicleOptions}
          placeholder="Select a vehicle"
          searchable
          required
          error={errors.vehicle_id}
        />
        <div className="space-y-2">
          <label htmlFor="path" className="text-sm font-medium">Image</label>
          <ImageDropzone
            onFilesSelected={(files) => {
              const input = document.querySelector('input[name="path"]') as HTMLInputElement | null;
              if (input && files[0]) {
                const transfer = new DataTransfer();
                transfer.items.add(files[0]);
                input.files = transfer.files;
              }
            }}
            accept="image/*"
            multiple={false}
            previewUrl={gallery?.path}
          />
          <input id="path" name="path" type="file" accept="image/*" className="hidden" />
        </div>
        <FormField
          name="alt_text"
          label="Alt text"
          value={data.alt_text}
          onChange={(value) => setData('alt_text', value)}
          error={errors.alt_text}
        />
        <FormField
          name="sort_order"
          label="Sort order"
          type="number"
          value={data.sort_order}
          onChange={(value) => setData('sort_order', value)}
          error={errors.sort_order}
        />
        <FormField
          name="is_primary"
          label="Primary image"
          type="switch"
          value={data.is_primary}
          onChange={(value) => setData('is_primary', value)}
          error={errors.is_primary}
        />
      </FormSection>
    </FormShell>
  );
}
