import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
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
  const { data, setData, post, put, processing, errors } = useForm({
    type: activity?.type ?? 'follow-up',
    status: activity?.status ?? 'open',
    due_at: activity?.due_at ? new Date(activity.due_at).toISOString().slice(0, 16) : '',
    completed_at: activity?.completed_at ? new Date(activity.completed_at).toISOString().slice(0, 16) : '',
    notes: activity?.notes ?? '',
    lead_id: leadId ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activity) {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {leadId && <input type="hidden" name="lead_id" value={leadId} />}
      <FormSection gridCols={2}>
        <FormField
          name="type"
          label="Type"
          type="select"
          value={data.type}
          error={errors.type}
          options={typeOptions}
          onChange={(value) => setData('type', value)}
        />
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
          name="due_at"
          label="Due at"
          type="datetime-local"
          value={data.due_at}
          error={errors.due_at}
          onChange={(value) => setData('due_at', value)}
        />
        <FormField
          name="completed_at"
          label="Completed at"
          type="datetime-local"
          value={data.completed_at}
          error={errors.completed_at}
          onChange={(value) => setData('completed_at', value)}
        />
      </FormSection>
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="richtext"
          value={data.notes}
          error={errors.notes}
          onChange={(value) => setData('notes', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save activity'}
        </Button>
      </div>
    </form>
  );
}
