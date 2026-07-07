import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { CustomerNote } from './types';

export default function NoteForm({ note, action, customerId }: { note?: CustomerNote; action: string; customerId?: number }) {
  return (
    <FormShell
      action={action}
      method={note ? 'put' : 'post'}
      submitLabel="Save note"
      className="max-w-3xl"
    >
      {customerId && <input type="hidden" name="customer_id" value={customerId} />}
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="title"
          label="Title"
          value={note?.title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="type"
          label="Type"
          value={note?.type ?? 'general'}
          onChange={() => {}}
        />
        <FormField
          name="body"
          label="Note"
          type="richtext"
          value={note?.body ?? note?.note ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="is_pinned"
          label="Pin note"
          type="switch"
          value={Boolean(note?.is_pinned)}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
