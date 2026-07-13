import adminRoutes from '@/routes/admin';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import TaskForm from '@/components/admin/crm/task-form';
import type { CrmTask } from '@/components/admin/crm/types';

export default function Edit({ task }: { task: CrmTask }) {
  return <CrmShell title="Edit CRM Task" description="Update CRM task ownership, priority, due date, status, and completion." actions={<CrmBackButton href={adminRoutes.tasks.index().url} />}><TaskForm task={task} action={adminRoutes.tasks.update(task.id).url} /></CrmShell>;
}
