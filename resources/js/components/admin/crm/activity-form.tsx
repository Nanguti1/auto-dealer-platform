import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { CrmActivity } from './types';
import * as React from 'react';

const typeOptions = [
  { value: 'call', label: 'Call' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'email', label: 'Email' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'note', label: 'Note' },
];

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function ActivityForm({ activity, action, leadId }: { activity?: CrmActivity; action: string; leadId?: number }) {
  const [dueAt, setDueAt] = React.useState(activity?.due_at ? new Date(activity.due_at).toISOString().slice(0, 16) : '');
  const [completedAt, setCompletedAt] = React.useState(activity?.completed_at ? new Date(activity.completed_at).toISOString().slice(0, 16) : '');

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
          type="select"
          value={activity?.type ?? 'follow-up'}
          options={typeOptions}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          type="select"
          value={activity?.status ?? 'open'}
          options={statusOptions}
          onChange={() => {}}
        />
        <FormField
          name="due_at"
          label="Due at"
          type="datetime-local"
          value={dueAt}
          onChange={setDueAt}
        />
        <FormField
          name="completed_at"
          label="Completed at"
          type="datetime-local"
          value={completedAt}
          onChange={setCompletedAt}
        />
      </FormSection>
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="richtext"
          value={activity?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
