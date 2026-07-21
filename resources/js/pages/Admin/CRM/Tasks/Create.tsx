import adminRoutes from '@/routes/admin';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import TaskForm from '@/components/admin/crm/task-form';

interface CreateProps {
  lead_id?: number;
  users: Array<{ id: number; name: string }>;
  leads: Array<{ id: number; name: string }>;
}

export default function Create({ lead_id, users, leads }: CreateProps) {
  return <CrmShell title="Create CRM Task" description="Create assigned CRM work with priority, due date, and completion tracking." actions={<CrmBackButton href={adminRoutes.tasks.index().url} />}><TaskForm action={adminRoutes.tasks.store().url} leadId={lead_id} users={users} leads={leads} /></CrmShell>;
}
