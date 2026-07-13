import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { CrmTask } from './types';
import type { User } from '@/types/models';

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export default function TaskForm({ task, action, leadId, users }: { task?: CrmTask; action: string; leadId?: number; users?: User[] }) {
  const { data, setData, post, put, errors, processing } = useForm({
    title: task?.title ?? '',
    description: task?.description ?? '',
    status: task?.status ?? 'open',
    priority: task?.priority ?? 'normal',
    due_at: task?.due_at ? new Date(task.due_at).toISOString().slice(0, 16) : '',
    assigned_user_id: task?.assigned_user_id ?? '',
    lead_id: leadId ?? task?.lead_id ?? '',
  });

  const userOptions = users?.map(user => ({
    value: String(user.id),
    label: user.name || user.email,
  })) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {task && <input type="hidden" name="_method" value="put" />}
      {data.lead_id && <input type="hidden" name="lead_id" value={data.lead_id} />}
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="title"
          label="Title"
          value={data.title}
          error={errors.title}
          onChange={(value) => setData('title', value)}
        />
      </FormSection>
      <FormSection gridCols={2}>
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
          name="priority"
          label="Priority"
          type="select"
          value={data.priority}
          error={errors.priority}
          options={priorityOptions}
          onChange={(value) => setData('priority', value)}
        />
        <FormField
          name="due_at"
          label="Due date"
          type="datetime-local"
          value={data.due_at}
          error={errors.due_at}
          onChange={(value) => setData('due_at', value)}
        />
        <FormField
          name="assigned_user_id"
          label="Assigned user"
          type="select"
          value={String(data.assigned_user_id)}
          error={errors.assigned_user_id}
          options={userOptions}
          placeholder="Select a user"
          onChange={(value) => setData('assigned_user_id', value)}
        />
      </FormSection>
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="description"
          label="Description"
          type="richtext"
          value={data.description}
          error={errors.description}
          onChange={(value) => setData('description', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          disabled={processing}
        >
          <Save className="mr-2 h-4 w-4" />
          {processing ? 'Saving...' : 'Save task'}
        </Button>
      </div>
    </form>
  );
}
