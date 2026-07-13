import { FormShell, FormField, FormSection } from '@/components/admin/shared';
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

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function PromotionForm({ promotion, action, method = 'post' }: { promotion?: Promotion; action: string; method?: 'post' | 'put' }) {
  const rules = promotion?.rules ?? {};
  const [name, setName] = React.useState(promotion?.name ?? promotion?.title ?? '');
  const [type, setType] = React.useState(promotion?.type ?? 'discount');
  const [description, setDescription] = React.useState(promotion?.description ?? String(rules.description ?? ''));
  const [value, setValue] = React.useState(String(promotion?.value ?? promotion?.discount ?? ''));
  const [startsAt, setStartsAt] = React.useState(formatDate(promotion?.starts_at));
  const [endsAt, setEndsAt] = React.useState(formatDate(promotion?.ends_at));
  const [status, setStatus] = React.useState(promotion?.status ?? (promotion?.is_active ? 'active' : 'draft'));
  const [visibility, setVisibility] = React.useState(promotion?.visibility ?? String(rules.visibility ?? 'public'));
  const [featuredVehicles, setFeaturedVehicles] = React.useState((promotion?.featured_vehicles ?? promotion?.vehicles ?? []).map((vehicle) => vehicle.title ?? vehicle.stock_number ?? vehicle.id).join(', '));
  const [isActive, setIsActive] = React.useState(promotion?.is_active ?? true);

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save promotion"
      encType="multipart/form-data"
      className="max-w-3xl"
    >
      <FormSection title="Basic Information" gridCols={2}>
        <FormField
          name="name"
          label="Campaign name"
          value={name}
          onChange={setName}
        />
        <FormField
          name="type"
          label="Promotion type"
          type="select"
          value={type}
          options={promotionTypeOptions}
          onChange={setType}
        />
      </FormSection>

      <FormSection title="Description" gridCols={1} fullWidth>
        <FormField
          name="description"
          label="Description"
          type="textarea"
          value={description}
          onChange={setDescription}
        />
      </FormSection>

      <FormSection title="Banner" gridCols={1} fullWidth>
        <div className="space-y-2">
          <label htmlFor="banner" className="text-sm font-medium">Banner</label>
          <ImageDropzone
            multiple={false}
            previewUrl={promotion?.banner_path}
            onFilesSelected={(files) => {
              const input = document.querySelector('input[name="banner"]') as HTMLInputElement | null;

              if (input && files[0]) {
                const transfer = new DataTransfer();
                transfer.items.add(files[0]);
                input.files = transfer.files;
              }
            }}
          />
          <input id="banner" name="banner" type="file" accept="image/*" className="hidden" />
        </div>
      </FormSection>

      <FormSection title="Pricing & Schedule" gridCols={3}>
        <FormField
          name="value"
          label="Discount"
          type="number"
          step="0.01"
          value={value}
          onChange={setValue}
        />
        <FormField
          name="starts_at"
          label="Start date"
          type="datetime-local"
          value={startsAt}
          onChange={setStartsAt}
        />
        <FormField
          name="ends_at"
          label="End date"
          type="datetime-local"
          value={endsAt}
          onChange={setEndsAt}
        />
      </FormSection>

      <FormSection title="Status & Visibility" gridCols={2}>
        <FormField
          name="status"
          label="Status"
          value={status}
          onChange={setStatus}
        />
        <FormField
          name="visibility"
          label="Visibility"
          type="select"
          value={visibility}
          options={visibilityOptions}
          onChange={setVisibility}
        />
      </FormSection>

      <FormSection title="Featured Vehicles" gridCols={1} fullWidth>
        <FormField
          name="featured_vehicles"
          label="Featured vehicles"
          type="textarea"
          value={featuredVehicles}
          placeholder="Use existing backend format or vehicle identifiers"
          onChange={setFeaturedVehicles}
        />
      </FormSection>

      <FormSection title="Options" gridCols={1}>
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={isActive}
          onChange={setIsActive}
        />
      </FormSection>
    </FormShell>
  );
}
