import { Link, router } from '@inertiajs/react';
import { Archive, Pencil, Repeat } from 'lucide-react';
import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { assignedTo, formatDateTime, leadName, leadStageName } from '@/components/admin/crm/helpers';
import type { LeadRecord } from '@/components/admin/crm/types';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

export default function Show({ lead }: { lead: LeadRecord }) {
  return (
    <CrmShell title={leadName(lead)} description={`${lead.source ?? 'Unknown source'} · Stage ${leadStageName(lead)} · Last activity ${formatDateTime(lead.last_activity_at ?? lead.last_contacted_at)}`} actions={<><CrmBackButton /><Button variant="outline" onClick={() => router.post(`/admin/leads/${lead.id}/convert`)}><Repeat className="mr-2 size-4" />Convert</Button><Button variant="outline" onClick={() => router.patch(`/admin/leads/${lead.id}/archive`)}><Archive className="mr-2 size-4" />Archive</Button><Button asChild><Link href={admin.leads.edit(lead.id).url}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Lead overview</CardTitle></CardHeader><CardContent className="flex flex-col gap-6 md:flex-row"><CustomerAvatar customer={lead.customer ?? { id: lead.id, first_name: lead.first_name, last_name: lead.last_name, email: lead.email }} /><div className="grid flex-1 gap-4 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Email</p><p>{lead.email ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Phone</p><p>{lead.phone ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Assigned sales representative</p><p>{assignedTo(lead)}</p></div><div><p className="text-sm text-muted-foreground">Lead source</p><p>{lead.source ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Status</p><CrmStatusBadge status={lead.status} /></div><div><p className="text-sm text-muted-foreground">Score</p><Badge variant="secondary">{lead.score ?? 0}</Badge></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Quick actions</CardTitle></CardHeader><CardContent className="grid gap-2"><Button variant="outline" asChild><Link href={`/admin/crm/activities/create?lead_id=${lead.id}`}>Log activity</Link></Button><Button variant="outline" asChild><Link href={`/admin/crm/tasks/create?lead_id=${lead.id}`}>Create task</Link></Button><Button variant="outline" asChild><Link href={`/admin/crm/pipeline`}>Open pipeline</Link></Button></CardContent></Card>
        {['Status history','Activities','Tasks','Notes','Related customer','Related vehicle(s)','Finance interest','Trade-In interest','Import interest'].map((title) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{title === 'Related customer' && lead.customer ? <Link href={`/admin/customers/${lead.customer.id}`} className="hover:underline">{lead.customer.first_name} {lead.customer.last_name}</Link> : title === 'Related vehicle(s)' && lead.vehicle ? lead.vehicle.title ?? lead.vehicle.stock_number : 'Backend CRM props will populate this section when available.'}</CardContent></Card>)}
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><TimelineList events={lead.timeline ?? []} /></CardContent></Card>
      </div>
    </CrmShell>
  );
}
