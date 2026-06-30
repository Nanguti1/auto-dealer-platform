import { Link, router } from '@inertiajs/react';
import { Archive, Eye, Pencil, Repeat } from 'lucide-react';
import * as React from 'react';
import CrmShell from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { assignedTo, formatDateTime, leadName } from '@/components/admin/crm/helpers';
import type { CrmFilters, LeadPagination, LeadRecord } from '@/components/admin/crm/types';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyLeads, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { admin } from '@/routes/admin';

export default function Index({ leads, filters = {} }: { leads: LeadPagination; filters?: CrmFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<LeadRecord>[] = [
    { key: 'lead', label: 'Lead', sortable: true, render: (lead) => <div className="flex items-center gap-3"><CustomerAvatar customer={lead.customer ?? { id: lead.id, first_name: lead.first_name, last_name: lead.last_name, email: lead.email }} /><div><Link href={admin.leads.show(lead.id).url} className="font-medium hover:underline">{leadName(lead)}</Link><p className="text-xs text-muted-foreground">{lead.email ?? lead.phone ?? 'No contact'}</p></div></div> },
    { key: 'status', label: 'Status', sortable: true, render: (lead) => <CrmStatusBadge status={lead.status} /> },
    { key: 'source', label: 'Source', sortable: true, render: (lead) => lead.source ?? '—' },
    { key: 'assigned_user_id', label: 'Sales rep', sortable: true, render: assignedTo },
    { key: 'customer', label: 'Customer', render: (lead) => lead.customer ? <Link className="hover:underline" href={`/admin/customers/${lead.customer.id}`}>{lead.customer.first_name} {lead.customer.last_name}</Link> : 'Not converted' },
    { key: 'priority', label: 'Priority', render: (lead) => <Badge variant="outline">{lead.priority ?? 'normal'}</Badge> },
    { key: 'score', label: 'Score', sortable: true, render: (lead) => lead.score ?? 0 },
    { key: 'created_at', label: 'Created', sortable: true, render: (lead) => formatDateTime(lead.created_at) },
    { key: 'last_activity_at', label: 'Last activity', sortable: true, render: (lead) => formatDateTime(lead.last_activity_at ?? lead.last_contacted_at) },
  ];

  if (isLoading) {
    return (
      <CrmShell title="Leads" description="Manage sales opportunities, ownership, activity, conversion, and pipeline health." actions={<Button asChild><Link href={admin.leads.create().url}>Create Lead</Link></Button>}>
        <LoadingState message="Loading leads..." variant="full-page" />
      </CrmShell>
    );
  }

  if (error) {
    return (
      <CrmShell title="Leads" description="Manage sales opportunities, ownership, activity, conversion, and pipeline health." actions={<Button asChild><Link href={admin.leads.create().url}>Create Lead</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.leads.index().url);
          }}
        />
      </CrmShell>
    );
  }

  return (
    <CrmShell title="Leads" description="Manage sales opportunities, ownership, activity, conversion, and pipeline health." actions={<Button asChild><Link href={admin.leads.create().url}>Create Lead</Link></Button>}>
      {leads.data.length === 0 ? (
        <EmptyLeads onCreate={() => router.visit(admin.leads.create().url)} />
      ) : (
        <AdminDataTable
          rows={leads}
          filters={filters}
          columns={columns}
          baseUrl={admin.leads.index().url}
          createUrl={admin.leads.create().url}
          createLabel="Create Lead"
          rowActions={(lead) => (
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="icon" asChild>
                <Link href={admin.leads.show(lead.id).url} aria-label={`View lead ${lead.id}`}>
                  <Eye className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={admin.leads.edit(lead.id).url} aria-label={`Edit lead ${lead.id}`}>
                  <Pencil className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.post(`/admin/leads/${lead.id}/convert`)} aria-label={`Convert lead ${lead.id}`}>
                <Repeat className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/leads/${lead.id}/archive`)} aria-label={`Archive lead ${lead.id}`}>
                <Archive className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        />
      )}
    </CrmShell>
  );
}
