import adminRoutes from '@/routes/admin';
import ActivityForm from '@/components/admin/crm/activity-form';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';

interface CreateProps {
  leads: Array<{ id: number; name: string }>;
  users: Array<{ id: number; name: string }>;
  lead_id?: number;
}

export default function Create({ leads, users, lead_id }: CreateProps) {
  return <CrmShell title="Create CRM Activity" description="Log a call, meeting, email, follow-up, or note." actions={<CrmBackButton href={adminRoutes.activities.index().url} />}><ActivityForm action={adminRoutes.activities.store().url} leadId={lead_id} leads={leads} users={users} /></CrmShell>;
}
