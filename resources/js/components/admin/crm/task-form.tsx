import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { CrmTask } from './types';

export default function TaskForm({ task, action, leadId }: { task?: CrmTask; action: string; leadId?: number }) {
  return (
    <FormShell
      action={action}
      method={task ? 'put' : 'post'}
      submitLabel="Save task"
      className="max-w-3xl"
    >
      {leadId && <input type="hidden" name="lead_id" value={leadId} />}
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="title"
          label="Title"
          value={task?.title ?? ''}
          onChange={() => {}}
        />
      </FormSection>
      <FormSection gridCols={2}>
        <FormField
          name="status"
          label="Status"
          value={task?.status ?? 'open'}
          onChange={() => {}}
        />
        <FormField
          name="priority"
          label="Priority"
          value={task?.priority ?? 'normal'}
          onChange={() => {}}
        />
        <FormField
          name="due_at"
          label="Due date"
          type="datetime-local"
          value={task?.due_at ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="assigned_user_id"
          label="Assigned user ID"
          type="number"
          value={String(task?.assigned_user_id ?? '')}
          onChange={() => {}}
        />
      </FormSection>
      <FormSection gridCols={1} fullWidth>
        <FormField
          name="description"
          label="Description"
          type="textarea"
          value={task?.description ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
