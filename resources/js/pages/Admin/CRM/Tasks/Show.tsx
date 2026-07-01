import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Pencil } from 'lucide-react';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { formatDateTime } from '@/components/admin/crm/helpers';
import type { TaskRecord } from '@/components/admin/crm/types';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

export default function Show({ task }: { task: TaskRecord }) {
  return (
    <CrmShell title={task.title} description={`${task.priority ?? 'Normal priority'} · Due ${formatDateTime(task.due_date)}`} actions={<><CrmBackButton /><Button variant="outline" onClick={() => router.patch(`/admin/tasks/${task.id}`, { status: 'completed' })}><CheckCircle2 className="mr-2 size-4" />Mark Complete</Button><Button variant="outline" onClick={() => router.delete(`/admin/tasks/${task.id}`)}><Archive className="mr-2 size-4" />Delete</Button><Button asChild><Link href={admin.tasks.edit(task.id).url}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Task overview</CardTitle></CardHeader><CardContent className="flex flex-col gap-6 md:flex-row"><CustomerAvatar customer={task.customer ?? { id: task.id, first_name: task.lead?.first_name ?? '', last_name: task.lead?.last_name ?? '', email: task.lead?.email ?? '' }} /><div className="grid flex-1 gap-4 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Priority</p><Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>{task.priority ?? 'Normal'}</Badge></div><div><p className="text-sm text-muted-foreground">Status</p><CrmStatusBadge status={task.status} /></div><div><p className="text-sm text-muted-foreground">Due date</p><p>{formatDateTime(task.due_date)}</p></div><div><p className="text-sm text-muted-foreground">Assigned to</p><p>{task.assigned_to ?? '—'}</p></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Quick actions</CardTitle></CardHeader><CardContent className="grid gap-2"><Button variant="outline" asChild><Link href={`/admin/crm/activities/create?lead_id=${task.lead_id}`}>Log activity</Link></Button><Button variant="outline" asChild><Link href={`/admin/crm/tasks/create?lead_id=${task.lead_id}`}>Create follow-up task</Link></Button></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent className="text-sm">{task.description ?? 'No description provided.'}</CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Related lead</CardTitle></CardHeader><CardContent className="text-sm">{task.lead ? <Link href={`/admin/leads/${task.lead.id}`} className="hover:underline">{task.lead.first_name} {task.lead.last_name}</Link> : 'No related lead.'}</CardContent></Card>
      </div>
    </CrmShell>
  );
}
