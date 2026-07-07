import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { imageUrl, vehicleName } from '@/components/admin/inventory/helpers';
import InventoryShell from '@/components/admin/inventory/inventory-shell';
import type { AdminGallery, Filters, Paginated } from '@/components/admin/inventory/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';

export default function Index({ vehicleGalleries, filters = {} }: { vehicleGalleries: Paginated<AdminGallery>; filters?: Filters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<AdminGallery>[] = [
    { key: 'image', label: 'Image', render: (g) => <img src={imageUrl(g.path)} alt={g.alt_text ?? ''} className="h-16 w-24 rounded-md object-cover" /> },
    { key: 'vehicle', label: 'Vehicle', render: (g) => vehicleName(g.vehicle) },
    { key: 'alt_text', label: 'Alt text', render: (g) => g.alt_text ?? '—' },
    { key: 'sort_order', label: 'Sort', sortable: true, render: (g) => g.sort_order ?? 0 },
    { key: 'is_primary', label: 'Status', render: (g) => g.is_primary ? <Badge>Primary</Badge> : <Badge variant="secondary">Gallery</Badge> }
  ];

  if (isLoading) {
    return (
      <InventoryShell title="Vehicle Gallery" description="Upload, preview, reorder, and manage inventory media." actions={<Button asChild><Link href={admin.vehicleGalleries.create().url}>Upload Image</Link></Button>}>
        <LoadingState message="Loading vehicle gallery..." variant="full-page" />
      </InventoryShell>
    );
  }

  if (error) {
    return (
      <InventoryShell title="Vehicle Gallery" description="Upload, preview, reorder, and manage inventory media." actions={<Button asChild><Link href={admin.vehicleGalleries.create().url}>Upload Image</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.vehicleGalleries.index().url);
          }}
        />
      </InventoryShell>
    );
  }

  return (
    <InventoryShell title="Vehicle Gallery" description="Upload, preview, reorder, and manage inventory media." actions={<Button asChild><Link href={admin.vehicleGalleries.create().url}>Upload Image</Link></Button>}>
      {vehicleGalleries.data.length === 0 ? (
        <EmptyGeneric
          title="No gallery images"
          description="Upload your first vehicle image to showcase your inventory."
          action={{ label: 'Upload Image', onClick: () => router.visit(admin.vehicleGalleries.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={vehicleGalleries}
          filters={filters}
          columns={columns}
          baseUrl={admin.vehicleGalleries.index().url}
          createUrl={admin.vehicleGalleries.create().url}
          createLabel="Upload"
          rowActions={(g) => (
            <>
              <RowActionsDropdown
                ariaLabel={`Actions for gallery image ${g.id}`}
                actions={[
                  {
                    label: 'View',
                    icon: <Eye />,
                    href: admin.vehicleGalleries.show(g.id).url,
                  },
                  {
                    label: 'Edit',
                    icon: <Pencil />,
                    href: admin.vehicleGalleries.edit(g.id).url,
                  },
                  {
                    label: 'Delete',
                    icon: <Trash2 />,
                    destructive: true,
                    onClick: () => setDeleteId(g.id),
                  },
                ]}
              />
              <ConfirmationDialog
                open={deleteId === g.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete image?"
                description="This removes the gallery image."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(admin.vehicleGalleries.destroy(g.id).url, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </InventoryShell>
  );
}
