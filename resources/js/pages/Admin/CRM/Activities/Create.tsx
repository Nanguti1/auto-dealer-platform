import adminRoutes from '@/routes/admin';
import ActivityForm from '@/components/admin/crm/activity-form';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';

export default function Create({ lead_id }: { lead_id?: number }) {
  return <CrmShell title="Create CRM Activity" description="Log a call, meeting, email, follow-up, or note." actions={<CrmBackButton href={adminRoutes.activities.index().url} />}><ActivityForm action={adminRoutes.activities.store().url} leadId={lead_id} /></CrmShell>;
}
