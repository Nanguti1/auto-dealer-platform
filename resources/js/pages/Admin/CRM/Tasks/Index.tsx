import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CrmShell from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { formatDateTime, leadName } from '@/components/admin/crm/helpers';
import type { CrmFilters, CrmTask } from '@/components/admin/crm/types';
import type { Paginated } from '@/components/admin/inventory/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index({ tasks, filters = {} }: { tasks: Paginated<CrmTask>; filters?: CrmFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const columns: Column<CrmTask>[] = [
    { key: 'title', label: 'Task', sortable: true, render: (task) => <div><p className="font-medium">{task.title ?? 'Untitled task'}</p><p className="text-xs text-muted-foreground">{task.description ?? 'No description'}</p></div> },
    { key: 'lead', label: 'Lead', render: (task) => task.lead ? <Link className="hover:underline" href={`/admin/leads/${task.lead.id}`}>{leadName(task.lead)}</Link> : '—' },
    { key: 'status', label: 'Status', sortable: true, render: (task) => <CrmStatusBadge status={task.status} /> },
    { key: 'priority', label: 'Priority', sortable: true, render: (task) => <Badge variant="outline">{task.priority ?? 'normal'}</Badge> },
    { key: 'due_at', label: 'Due date', sortable: true, render: (task) => formatDateTime(task.due_at) },
    { key: 'assigned_user', label: 'Assigned user', render: (task) => task.assigned_user?.name ?? 'Unassigned' },
  ];

  return <CrmShell title="CRM Tasks" description="Track assigned CRM work, due dates, priorities, and completion state." actions={<Button asChild><Link href="/admin/crm/tasks/create">Create Task</Link></Button>}><AdminDataTable rows={tasks} filters={filters} columns={columns} baseUrl="/admin/crm/tasks" createUrl="/admin/crm/tasks/create" createLabel="Create Task" rowActions={(task) => <div className="flex justify-end gap-1"><Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/crm/tasks/${task.id}/complete`)}><CheckCircle2 className="size-4" /></Button><Button variant="ghost" size="icon" asChild><Link href={`/admin/crm/tasks/${task.id}/edit`}><Pencil className="size-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => setDeleteId(task.id)}><Trash2 className="size-4" /></Button><ConfirmationDialog open={deleteId === task.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete task?" description="This removes the task from the CRM work queue." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(`/admin/crm/tasks/${task.id}`, { onFinish: () => setDeleteId(null) })} /></div>} /></CrmShell>;
}
