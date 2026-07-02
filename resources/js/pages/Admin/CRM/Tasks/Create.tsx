import adminRoutes from '@/routes/admin';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import TaskForm from '@/components/admin/crm/task-form';

export default function Create({ lead_id }: { lead_id?: number }) {
  return <CrmShell title="Create CRM Task" description="Create assigned CRM work with priority, due date, and completion tracking." actions={<CrmBackButton href={adminRoutes.tasks.index().url} />}><TaskForm action={adminRoutes.tasks.store().url} leadId={lead_id} /></CrmShell>;
}
