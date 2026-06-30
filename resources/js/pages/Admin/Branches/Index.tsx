import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MapPin, Building2, MoreHorizontal } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyState } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Paginated } from '@/components/admin/cms/types';
import branches from '@/routes/admin/branches';

interface Branch {
  id: number;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  city: string;
  state: string;
  country: string;
  is_active: boolean;
  created_at: string;
}

export default function Index({ branches, filters = {} }: { branches: Paginated<Branch>; filters?: Record<string, any> }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<Branch>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (branch) => (
        <div>
          <Link className="font-medium hover:underline" href={branches.show.url(branch.id)}>
            {branch.name}
          </Link>
          <p className="text-xs text-muted-foreground">{branch.code}</p>
        </div>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (branch) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-4 text-muted-foreground" />
          <span>
            {branch.city}, {branch.state}
          </span>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (branch) => (
        <div className="text-sm">
          <div>{branch.email ?? '—'}</div>
          <div className="text-muted-foreground">{branch.phone ?? '—'}</div>
        </div>
      ),
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (branch) => (
        <Badge variant={branch.is_active ? 'default' : 'secondary'}>
          {branch.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (branch) => new Date(branch.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branches</h1>
          <p className="text-muted-foreground">Manage your dealership branches and locations.</p>
        </div>
        <Button asChild>
          <Link href={branches.create.url()}>
            <Building2 className="mr-2 size-4" />
            Create Branch
          </Link>
        </Button>
      </div>

      {branches.data.length === 0 ? (
        <EmptyState
          title="No branches found"
          description="Get started by creating your first branch location."
          icon={<Building2 className="size-12 text-muted-foreground" />}
          action={
            <Button asChild>
              <Link href={branches.create.url()}>
                <Building2 className="mr-2 size-4" />
                Create Branch
              </Link>
            </Button>
          }
        />
      ) : (
        <AdminDataTable
          rows={branches}
          filters={filters}
          columns={columns}
          baseUrl={branches.index.url()}
          createUrl={branches.create.url()}
          createLabel="Create Branch"
          rowActions={(branch) => (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={branches.show.url(branch.id)}>
                      <Eye className="mr-2 size-4" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={branches.edit.url(branch.id)}>
                      <Pencil className="mr-2 size-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeleteId(branch.id)}>
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ConfirmationDialog
                open={deleteId === branch.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete branch?"
                description="This will permanently delete the branch and all associated data."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(branches.destroy.url(branch.id), { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </div>
  );
}
