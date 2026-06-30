import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BlogTag } from './types';

export default function TagForm({ tag, action, method = 'post' }: { tag?: BlogTag; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save tag"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="name"
          label="Name"
          value={tag?.name ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="slug"
          label="Slug"
          value={tag?.slug ?? ''}
          onChange={() => {}}
        />
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex items-center gap-3">
            <Input
              id="color"
              name="color"
              type="color"
              defaultValue={tag?.color ?? '#3b82f6'}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              name="color"
              type="text"
              defaultValue={tag?.color ?? '#3b82f6'}
              placeholder="#3b82f6"
              className="flex-1"
            />
          </div>
        </div>
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={tag?.is_visible ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
