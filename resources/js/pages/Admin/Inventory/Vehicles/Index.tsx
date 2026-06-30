import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Copy, Eye, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import InventoryShell from '@/components/admin/inventory/inventory-shell';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import { formatCurrency, formatNumber, vehicleName } from '@/components/admin/inventory/helpers';
import type { AdminVehicle, Filters, Paginated } from '@/components/admin/inventory/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { admin } from '@/routes/admin';
import { LoadingState, EmptyVehicles, InlineError } from '@/components/admin/shared';

export default function Index({ vehicles, filters = {} }: { vehicles: Paginated<AdminVehicle>; filters?: Filters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<AdminVehicle>[] = [
    {
      key: 'title',
      label: 'Vehicle',
      sortable: true,
      render: (v) => (
        <div>
          <Link className="font-medium hover:underline" href={admin.vehicles.show(v.id).url}>
            {vehicleName(v)}
          </Link>
          <p className="text-xs text-muted-foreground">#{v.stock_number} · {v.vin}</p>
        </div>
      ),
    },
    { key: 'year', label: 'Year', sortable: true, render: (v) => v.year },
    { key: 'sale_price', label: 'Price', sortable: true, render: (v) => formatCurrency(v.sale_price) },
    { key: 'mileage', label: 'Mileage', sortable: true, render: (v) => `${formatNumber(v.mileage)} mi` },
    {
      key: 'status',
      label: 'Status',
      render: (v) => (
        <div className="flex gap-1">
          <Badge variant={v.is_featured ? 'default' : 'secondary'}>
            {v.is_featured ? 'Featured' : 'Standard'}
          </Badge>
          {v.is_certified ? <Badge variant="outline">Certified</Badge> : null}
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (deleteId) {
      setIsLoading(true);
      router.delete(admin.vehicles.destroy(deleteId).url, {
        onSuccess: () => {
          setDeleteId(null);
          setIsLoading(false);
        },
        onError: (errors) => {
          setError(new Error(errors.message || 'Failed to delete vehicle'));
          setIsLoading(false);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <InventoryShell title="Vehicles" description="Manage vehicle inventory, publication status, pricing, and merchandising.">
        <LoadingState message="Loading vehicles..." variant="full-page" />
      </InventoryShell>
    );
  }

  if (error) {
    return (
      <InventoryShell title="Vehicles" description="Manage vehicle inventory, publication status, pricing, and merchandising.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.vehicles.index().url);
          }}
        />
      </InventoryShell>
    );
  }

  return (
    <>
      <InventoryShell
        title="Vehicles"
        description="Manage vehicle inventory, publication status, pricing, and merchandising."
        actions={
          <Button asChild>
            <Link href={admin.vehicles.create().url}>Create Vehicle</Link>
          </Button>
        }
      >
        {vehicles.data.length === 0 ? (
          <EmptyVehicles onCreate={() => router.visit(admin.vehicles.create().url)} />
        ) : (
          <AdminDataTable
            rows={vehicles}
            filters={filters}
            columns={columns}
            baseUrl={admin.vehicles.index().url}
            createUrl={admin.vehicles.create().url}
            createLabel="Create Vehicle"
            rowActions={(vehicle) => (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={admin.vehicles.show(vehicle.id).url}>
                        <Eye className="mr-2 size-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={admin.vehicles.edit(vehicle.id).url}>
                        <Pencil className="mr-2 size-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.patch(
                          vehicle.is_featured
                            ? admin.vehicles.unfeature(vehicle.id).url
                            : admin.vehicles.feature(vehicle.id).url
                        )
                      }
                    >
                      <Star className="mr-2 size-4" />
                      {vehicle.is_featured ? 'Unfeature' : 'Feature'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
                      <Copy className="mr-2 size-4" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setDeleteId(vehicle.id)}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          />
        )}
      </InventoryShell>

      <ConfirmationDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}
