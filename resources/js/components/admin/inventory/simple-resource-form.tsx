import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { ImageDropzone } from '@/components/shared/media-upload';
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
