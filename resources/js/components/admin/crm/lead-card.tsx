import { Link } from '@inertiajs/react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CrmStatusBadge from './crm-status-badge';
import { assignedTo, formatDateTime, leadName } from './helpers';
import type { LeadRecord } from './types';

export default function LeadCard({ lead }: { lead: LeadRecord }) {
  const avatarCustomer = lead.customer ?? { id: lead.id, first_name: lead.first_name, last_name: lead.last_name, email: lead.email };

  return (
    <Card className="bg-background/70">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          <CustomerAvatar customer={avatarCustomer} />
          <div className="min-w-0 flex-1">
            <Link href={`/admin/leads/${lead.id}`} className="font-medium hover:underline">{leadName(lead)}</Link>
            <p className="truncate text-xs text-muted-foreground">{lead.email ?? lead.phone ?? 'No contact details'}</p>
          </div>
          <CrmStatusBadge status={lead.status} />
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{lead.priority ?? 'normal'} priority</Badge>
          <Badge variant="outline">Score {lead.score ?? 0}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Vehicle: {lead.vehicle?.title ?? lead.vehicle?.stock_number ?? 'No vehicle selected'}</p>
        <p className="text-xs text-muted-foreground">Assigned to {assignedTo(lead)} · Due {formatDateTime(lead.last_contacted_at ?? lead.last_activity_at)}</p>
        <div className="flex gap-2"><Button size="sm" variant="outline" asChild><Link href={`/admin/leads/${lead.id}`}>View</Link></Button><Button size="sm" variant="ghost" asChild><Link href={`/admin/leads/${lead.id}/edit`}>Edit</Link></Button></div>
      </CardContent>
    </Card>
  );
}
