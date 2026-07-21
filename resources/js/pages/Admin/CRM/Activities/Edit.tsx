import adminRoutes from '@/routes/admin';
import ActivityForm from '@/components/admin/crm/activity-form';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import type { CrmActivity } from '@/components/admin/crm/types';

interface EditProps {
  activity: CrmActivity;
  leads: Array<{ id: number; name: string }>;
  users: Array<{ id: number; name: string }>;
}

export default function Edit({ activity, leads, users }: EditProps) {
  return <CrmShell title="Edit CRM Activity" description="Update activity details, status, due date, completion, and timeline notes." actions={<CrmBackButton href={adminRoutes.activities.index().url} />}><ActivityForm activity={activity} action={adminRoutes.activities.update(activity.id).url} leadId={activity.lead_id} leads={leads} users={users} /></CrmShell>;
}
