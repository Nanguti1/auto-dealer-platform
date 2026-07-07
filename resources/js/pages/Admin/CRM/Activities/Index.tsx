import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CrmShell from '@/components/admin/crm/crm-shell';
import CrmStatusBadge from '@/components/admin/crm/crm-status-badge';
import { formatDateTime, leadName } from '@/components/admin/crm/helpers';
import type { CrmActivity, CrmFilters } from '@/components/admin/crm/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import type { Paginated } from '@/components/admin/inventory/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ activities, filters = {} }: { activities: Paginated<CrmActivity>; filters?: CrmFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<CrmActivity>[] = [
    { key: 'type', label: 'Type', sortable: true, render: (activity) => activity.type ?? 'follow-up' },
    { key: 'lead', label: 'Lead', render: (activity) => activity.lead ? <Link className="hover:underline" href={adminRoutes.leads.show(activity.lead.id).url}>{leadName(activity.lead)}</Link> : '—' },
    { key: 'status', label: 'Status', sortable: true, render: (activity) => <CrmStatusBadge status={activity.status} /> },
    { key: 'due_at', label: 'Due', sortable: true, render: (activity) => formatDateTime(activity.due_at) },
    { key: 'completed_at', label: 'Completed', sortable: true, render: (activity) => formatDateTime(activity.completed_at) },
    { key: 'assigned_user', label: 'Assigned user', render: (activity) => activity.assigned_user?.name ?? 'Unassigned' },
  ];

  if (isLoading) {
    return (
      <CrmShell
        title="CRM Activities"
        description="Manage calls, meetings, emails, follow-ups, and notes."
        actions={<Button asChild><Link href={adminRoutes.activities.create().url}>Create Activity</Link></Button>}
      >
        <LoadingState message="Loading activities..." variant="full-page" />
      </CrmShell>
    );
  }

  if (error) {
    return (
      <CrmShell
        title="CRM Activities"
        description="Manage calls, meetings, emails, follow-ups, and notes."
        actions={<Button asChild><Link href={adminRoutes.activities.create().url}>Create Activity</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.activities.index().url);
          }}
        />
      </CrmShell>
    );
  }

  return (
    <CrmShell
      title="CRM Activities"
      description="Manage calls, meetings, emails, follow-ups, and notes."
      actions={<Button asChild><Link href={adminRoutes.activities.create().url}>Create Activity</Link></Button>}
    >
      {activities.data.length === 0 ? (
        <EmptyGeneric
          title="No activities"
          description="Track your CRM interactions by creating your first activity."
          action={{ label: 'Create Activity', onClick: () => router.visit(adminRoutes.activities.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={activities}
          filters={filters}
          columns={columns}
          baseUrl={adminRoutes.activities.index().url}
          createUrl={adminRoutes.activities.create().url}
          createLabel="Create Activity"
          rowActions={(activity) => (
            <>
              <RowActionsDropdown
                ariaLabel={`Actions for activity ${activity.id}`}
                actions={[
                  {
                    label: 'Edit',
                    icon: <Pencil />,
                    href: adminRoutes.activities.edit(activity.id).url,
                  },
                  {
                    label: 'Delete',
                    icon: <Trash2 />,
                    destructive: true,
                    onClick: () => setDeleteId(activity.id),
                  },
                ]}
              />
              <ConfirmationDialog
                open={deleteId === activity.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete activity?"
                description="This removes the activity from the CRM timeline."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(`/admin/crm/activities/${activity.id}`, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </CrmShell>
  );
}
