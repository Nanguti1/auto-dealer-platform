import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CrmShell from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { formatDateTime, leadName } from '@/components/admin/crm/helpers';
import type { CrmFilters, CrmTask } from '@/components/admin/crm/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import type { Paginated } from '@/components/admin/inventory/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index({ tasks, filters = {} }: { tasks: Paginated<CrmTask>; filters?: CrmFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<CrmTask>[] = [
    { key: 'title', label: 'Task', sortable: true, render: (task) => <div><p className="font-medium">{task.title ?? 'Untitled task'}</p><p className="text-xs text-muted-foreground">{task.description ?? 'No description'}</p></div> },
    { key: 'lead', label: 'Lead', render: (task) => task.lead ? <Link className="hover:underline" href={adminRoutes.leads.show(task.lead.id).url}>{leadName(task.lead)}</Link> : '—' },
    { key: 'status', label: 'Status', sortable: true, render: (task) => <CrmStatusBadge status={task.status} /> },
    { key: 'priority', label: 'Priority', sortable: true, render: (task) => <Badge variant="outline">{task.priority ?? 'normal'}</Badge> },
    { key: 'due_at', label: 'Due date', sortable: true, render: (task) => formatDateTime(task.due_at) },
    { key: 'assigned_user', label: 'Assigned user', render: (task) => task.assigned_user?.name ?? 'Unassigned' },
  ];

  if (isLoading) {
    return (
      <CrmShell
        title="CRM Tasks"
        description="Track assigned CRM work, due dates, priorities, and completion state."
        actions={<Button asChild><Link href={adminRoutes.tasks.create().url}>Create Task</Link></Button>}
      >
        <LoadingState message="Loading tasks..." variant="full-page" />
      </CrmShell>
    );
  }

  if (error) {
    return (
      <CrmShell
        title="CRM Tasks"
        description="Track assigned CRM work, due dates, priorities, and completion state."
        actions={<Button asChild><Link href={adminRoutes.tasks.create().url}>Create Task</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.tasks.index().url);
          }}
        />
      </CrmShell>
    );
  }

  return (
    <CrmShell
      title="CRM Tasks"
      description="Track assigned CRM work, due dates, priorities, and completion state."
      actions={<Button asChild><Link href={adminRoutes.tasks.create().url}>Create Task</Link></Button>}
    >
      {tasks.data.length === 0 ? (
        <EmptyGeneric
          title="No tasks"
          description="Track your CRM work by creating your first task."
          action={{ label: 'Create Task', onClick: () => router.visit(adminRoutes.tasks.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={tasks}
          filters={filters}
          columns={columns}
          baseUrl={adminRoutes.tasks.index().url}
          createUrl={adminRoutes.tasks.create().url}
          createLabel="Create Task"
          rowActions={(task) => (
            <>
              <RowActionsDropdown
                ariaLabel={`Actions for task ${task.id}`}
                actions={[
                  {
                    label: 'Complete',
                    icon: <CheckCircle2 />,
                    onClick: () => router.patch(`/admin/crm/tasks/${task.id}/complete`),
                  },
                  {
                    label: 'Edit',
                    icon: <Pencil />,
                    href: adminRoutes.tasks.edit(task.id).url,
                  },
                  {
                    label: 'Delete',
                    icon: <Trash2 />,
                    destructive: true,
                    onClick: () => setDeleteId(task.id),
                  },
                ]}
              />
              <ConfirmationDialog
                open={deleteId === task.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete task?"
                description="This removes the task from the CRM work queue."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(adminRoutes.tasks.destroy(task.id).url, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </CrmShell>
  );
}
