import ActivityForm from '@/components/admin/crm/activity-form';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import type { CrmActivity } from '@/components/admin/crm/types';

export default function Edit({ activity }: { activity: CrmActivity }) {
  return <CrmShell title="Edit CRM Activity" description="Update activity details, status, due date, completion, and timeline notes." actions={<CrmBackButton href="/admin/crm/activities" />}><ActivityForm activity={activity} action={`/admin/crm/activities/${activity.id}`} leadId={activity.lead_id} /></CrmShell>;
}
