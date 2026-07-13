import adminRoutes from '@/routes/admin';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import TaskForm from '@/components/admin/crm/task-form';
import type { User } from '@/types/models';

export default function Create({ lead_id, users }: { lead_id?: number; users?: User[] }) {
  return <CrmShell title="Create CRM Task" description="Create assigned CRM work with priority, due date, and completion tracking." actions={<CrmBackButton href={adminRoutes.tasks.index().url} />}><TaskForm action={adminRoutes.tasks.store().url} leadId={lead_id} users={users} /></CrmShell>;
}
