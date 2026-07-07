import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import InventoryShell from '@/components/admin/inventory/inventory-shell';
import type { AdminFeature, Filters, Paginated } from '@/components/admin/inventory/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';

export default function Index({ vehicleFeatures, filters = {} }: { vehicleFeatures: Paginated<AdminFeature>; filters?: Filters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<AdminFeature>[] = [
    { key: 'name', label: 'Feature', sortable: true, render: (f) => <div className="font-medium">{f.name ?? f.title ?? 'Untitled'}</div> },
    { key: 'category', label: 'Category', sortable: true, render: (f) => f.category ?? 'General' },
    { key: 'slug', label: 'Slug', render: (f) => f.slug ?? '—' },
    { key: 'status', label: 'Status', render: (f) => <Badge variant={f.is_active === false ? 'secondary' : 'default'}>{f.is_active === false ? 'Inactive' : 'Active'}</Badge> },
    { key: 'assignments', label: 'Assignments', render: (f) => String(f.assignments_count ?? f.vehicles_count ?? 0) }
  ];

  if (isLoading) {
    return (
      <InventoryShell title="Vehicle Features" description="Maintain feature taxonomy, statuses, and inventory assignments." actions={<Button asChild><Link href={admin.vehicleFeatures.create().url}>Create Feature</Link></Button>}>
        <LoadingState message="Loading vehicle features..." variant="full-page" />
      </InventoryShell>
    );
  }

  if (error) {
    return (
      <InventoryShell title="Vehicle Features" description="Maintain feature taxonomy, statuses, and inventory assignments." actions={<Button asChild><Link href={admin.vehicleFeatures.create().url}>Create Feature</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.vehicleFeatures.index().url);
          }}
        />
      </InventoryShell>
    );
  }

  return (
    <InventoryShell title="Vehicle Features" description="Maintain feature taxonomy, statuses, and inventory assignments." actions={<Button asChild><Link href={admin.vehicleFeatures.create().url}>Create Feature</Link></Button>}>
      {vehicleFeatures.data.length === 0 ? (
        <EmptyGeneric
          title="No vehicle features"
          description="Define your vehicle features by creating your first feature."
          action={{ label: 'Create Feature', onClick: () => router.visit(admin.vehicleFeatures.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={vehicleFeatures}
          filters={filters}
          columns={columns}
          baseUrl={admin.vehicleFeatures.index().url}
          createUrl={admin.vehicleFeatures.create().url}
          createLabel="Create Feature"
          rowActions={(f) => (
            <>
              <RowActionsDropdown
                ariaLabel={`Actions for feature ${f.id}`}
                actions={[
                  {
                    label: 'View',
                    icon: <Eye />,
                    href: admin.vehicleFeatures.show(f.id).url,
                  },
                  {
                    label: 'Edit',
                    icon: <Pencil />,
                    href: admin.vehicleFeatures.edit(f.id).url,
                  },
                  {
                    label: 'Delete',
                    icon: <Trash2 />,
                    destructive: true,
                    onClick: () => setDeleteId(f.id),
                  },
                ]}
              />
              <ConfirmationDialog
                open={deleteId === f.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete feature?"
                description="This removes the feature from the catalog."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(admin.vehicleFeatures.destroy(f.id).url, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </InventoryShell>
  );
}
