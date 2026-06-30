import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import ActivityForm from '@/components/admin/crm/activity-form';

export default function Create({ lead_id }: { lead_id?: number }) {
  return <CrmShell title="Create CRM Activity" description="Log a call, meeting, email, follow-up, or note." actions={<CrmBackButton href="/admin/crm/activities" />}><ActivityForm action="/admin/crm/activities" leadId={lead_id} /></CrmShell>;
}
