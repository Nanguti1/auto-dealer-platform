import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { ImageDropzone } from '@/components/shared/media-upload';
import type { Promotion } from './types';

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
          value={promotion?.name ?? promotion?.title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="type"
          label="Promotion type"
          type="select"
          value={promotion?.type ?? 'discount'}
          options={promotionTypeOptions}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Description" gridCols={1} fullWidth>
        <FormField
          name="description"
          label="Description"
          type="textarea"
          value={promotion?.description ?? String(rules.description ?? '')}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Banner" gridCols={1} fullWidth>
        <div className="space-y-2">
          <label htmlFor="banner" className="text-sm font-medium">Banner</label>
          <ImageDropzone
            multiple={false}
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
          {promotion?.banner_path && <p className="text-sm text-muted-foreground">Current: {promotion.banner_path}</p>}
        </div>
      </FormSection>

      <FormSection title="Pricing & Schedule" gridCols={3}>
        <FormField
          name="value"
          label="Discount"
          type="number"
          step="0.01"
          value={String(promotion?.value ?? promotion?.discount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="starts_at"
          label="Start date"
          type="datetime-local"
          value={formatDate(promotion?.starts_at)}
          onChange={() => {}}
        />
        <FormField
          name="ends_at"
          label="End date"
          type="datetime-local"
          value={formatDate(promotion?.ends_at)}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Status & Visibility" gridCols={2}>
        <FormField
          name="status"
          label="Status"
          value={promotion?.status ?? (promotion?.is_active ? 'active' : 'draft')}
          onChange={() => {}}
        />
        <FormField
          name="visibility"
          label="Visibility"
          type="select"
          value={promotion?.visibility ?? String(rules.visibility ?? 'public')}
          options={visibilityOptions}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Featured Vehicles" gridCols={1} fullWidth>
        <FormField
          name="featured_vehicles"
          label="Featured vehicles"
          type="textarea"
          value={(promotion?.featured_vehicles ?? promotion?.vehicles ?? []).map((vehicle) => vehicle.title ?? vehicle.stock_number ?? vehicle.id).join(', ')}
          placeholder="Use existing backend format or vehicle identifiers"
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Options" gridCols={1}>
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={promotion?.is_active ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
