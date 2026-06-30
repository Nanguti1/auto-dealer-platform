import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CrmShell from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { formatDateTime, leadName } from '@/components/admin/crm/helpers';
import type { CrmActivity, CrmFilters } from '@/components/admin/crm/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import type { Paginated } from '@/components/admin/inventory/types';
import { Button } from '@/components/ui/button';

export default function Index({ activities, filters = {} }: { activities: Paginated<CrmActivity>; filters?: CrmFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const columns: Column<CrmActivity>[] = [
    { key: 'type', label: 'Type', sortable: true, render: (activity) => activity.type ?? 'follow-up' },
    { key: 'lead', label: 'Lead', render: (activity) => activity.lead ? <Link className="hover:underline" href={`/admin/leads/${activity.lead.id}`}>{leadName(activity.lead)}</Link> : '—' },
    { key: 'status', label: 'Status', sortable: true, render: (activity) => <CrmStatusBadge status={activity.status} /> },
    { key: 'due_at', label: 'Due', sortable: true, render: (activity) => formatDateTime(activity.due_at) },
    { key: 'completed_at', label: 'Completed', sortable: true, render: (activity) => formatDateTime(activity.completed_at) },
    { key: 'assigned_user', label: 'Assigned user', render: (activity) => activity.assigned_user?.name ?? 'Unassigned' },
  ];

  return <CrmShell title="CRM Activities" description="Manage calls, meetings, emails, follow-ups, and notes." actions={<Button asChild><Link href="/admin/crm/activities/create">Create Activity</Link></Button>}><AdminDataTable rows={activities} filters={filters} columns={columns} baseUrl="/admin/crm/activities" createUrl="/admin/crm/activities/create" createLabel="Create Activity" rowActions={(activity) => <div className="flex justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/crm/activities/${activity.id}/edit`}><Pencil className="size-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => setDeleteId(activity.id)}><Trash2 className="size-4" /></Button><ConfirmationDialog open={deleteId === activity.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete activity?" description="This removes the activity from the CRM timeline." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(`/admin/crm/activities/${activity.id}`, { onFinish: () => setDeleteId(null) })} /></div>} /></CrmShell>;
}
