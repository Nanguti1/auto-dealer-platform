import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { CrmActivity } from './types';

export default function ActivityForm({ activity, action, leadId }: { activity?: CrmActivity; action: string; leadId?: number }) {
  return (
    <FormShell
      action={action}
      method={activity ? 'put' : 'post'}
      submitLabel="Save activity"
      className="max-w-3xl"
    >
      {leadId && <input type="hidden" name="lead_id" value={leadId} />}
      <FormSection gridCols={2}>
        <FormField
          name="type"
          label="Type"
          value={activity?.type ?? 'follow-up'}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={activity?.status ?? 'open'}
          onChange={() => {}}
        />
        <FormField
          name="due_at"
          label="Due at"
          type="datetime-local"
          value={activity?.due_at ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="completed_at"
          label="Completed at"
          type="datetime-local"
          value={activity?.completed_at ?? ''}
          onChange={() => {}}
        />
      </FormSection>
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={activity?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
