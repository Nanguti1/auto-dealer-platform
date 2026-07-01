import { Link, router } from '@inertiajs/react';
import { Archive, Pencil } from 'lucide-react';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { formatDateTime } from '@/components/admin/crm/helpers';
import type { ActivityRecord } from '@/components/admin/crm/types';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

export default function Show({ activity }: { activity: ActivityRecord }) {
  return (
    <CrmShell title={activity.title} description={`${activity.type ?? 'Activity'} · ${formatDateTime(activity.created_at)}`} actions={<><CrmBackButton /><Button variant="outline" onClick={() => router.delete(`/admin/activities/${activity.id}`)}><Archive className="mr-2 size-4" />Delete</Button><Button asChild><Link href={admin.activities.edit(activity.id).url}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Activity overview</CardTitle></CardHeader><CardContent className="flex flex-col gap-6 md:flex-row"><CustomerAvatar customer={activity.customer ?? { id: activity.id, first_name: activity.lead?.first_name ?? '', last_name: activity.lead?.last_name ?? '', email: activity.lead?.email ?? '' }} /><div className="grid flex-1 gap-4 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Type</p><p>{activity.type ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Status</p><CrmStatusBadge status={activity.status} /></div><div><p className="text-sm text-muted-foreground">Due date</p><p>{formatDateTime(activity.due_date)}</p></div><div><p className="text-sm text-muted-foreground">Assigned to</p><p>{activity.assigned_to ?? '—'}</p></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Quick actions</CardTitle></CardHeader><CardContent className="grid gap-2"><Button variant="outline" asChild><Link href={`/admin/crm/activities/create?lead_id=${activity.lead_id}`}>Create follow-up activity</Link></Button><Button variant="outline" asChild><Link href={`/admin/crm/tasks/create?lead_id=${activity.lead_id}`}>Create task</Link></Button></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent className="text-sm">{activity.description ?? 'No description provided.'}</CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Related lead</CardTitle></CardHeader><CardContent className="text-sm">{activity.lead ? <Link href={`/admin/leads/${activity.lead.id}`} className="hover:underline">{activity.lead.first_name} {activity.lead.last_name}</Link> : 'No related lead.'}</CardContent></Card>
      </div>
    </CrmShell>
  );
}
