import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { AdminFeature, AdminGallery } from './types';

export function FeatureForm({ feature, action }: { feature?: AdminFeature; action: string }) {
  return (
    <FormShell
      action={action}
      method={feature ? 'put' : 'post'}
      submitLabel="Save feature"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="name"
          label="Name"
          value={feature?.name ?? feature?.title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="slug"
          label="Slug"
          value={feature?.slug ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="category"
          label="Category"
          value={feature?.category ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="is_active"
          label="Active"
          type="switch"
          value={feature?.is_active ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}

export function GalleryForm({ gallery, action }: { gallery?: AdminGallery; action: string }) {
  return (
    <FormShell
      action={action}
      method={gallery ? 'put' : 'post'}
      submitLabel="Save image"
      encType="multipart/form-data"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="vehicle_id"
          label="Vehicle ID"
          type="number"
          value={String(gallery?.vehicle_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="path"
          label="Image path"
          value={gallery?.path ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="alt_text"
          label="Alt text"
          value={gallery?.alt_text ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="sort_order"
          label="Sort order"
          type="number"
          value={String(gallery?.sort_order ?? 0)}
          onChange={() => {}}
        />
        <FormField
          name="is_primary"
          label="Primary image"
          type="switch"
          value={Boolean(gallery?.is_primary)}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
