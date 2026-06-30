import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import TaskForm from '@/components/admin/crm/task-form';
import type { CrmTask } from '@/components/admin/crm/types';

export default function Edit({ task }: { task: CrmTask }) {
  return <CrmShell title="Edit CRM Task" description="Update CRM task ownership, priority, due date, status, and completion." actions={<CrmBackButton href="/admin/crm/tasks" />}><TaskForm task={task} action={`/admin/crm/tasks/${task.id}`} leadId={task.lead_id} /></CrmShell>;
}
