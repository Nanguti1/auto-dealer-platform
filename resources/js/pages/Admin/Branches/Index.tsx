import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MapPin, Building2, MoreHorizontal, Plus } from 'lucide-react';
import * as React from 'react';
import type { Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyState, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import admin from '@/routes/admin/index';
import BranchShell from '@/components/admin/branches/branch-shell';

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

export default function Index({ branches: branchesData, filters = {} }: { branches: Paginated<Branch>; filters?: Record<string, any> }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleDelete = React.useCallback(() => {
    if (deleteId) {
      setIsDeleting(true);
      router.delete(admin.branches.destroy(deleteId).url, {
        onSuccess: () => {
          setDeleteId(null);
          setIsDeleting(false);
        },
        onError: (errors) => {
          setError(new Error(Object.values(errors).join(', ') || 'Failed to delete branch'));
          setIsDeleting(false);
        },
      });
    }
  }, [deleteId]);

  const columns: Column<Branch>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (branch) => (
        <div>
          <Link className="font-medium hover:underline" href={admin.branches.show(branch.id).url}>
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

  if (isLoading) {
    return (
      <BranchShell title="Branches" description="Manage your dealership branches and locations." actions={<Button asChild><Link href={admin.branches.create().url}><Plus className="mr-2 h-4 w-4" />Add Branch</Link></Button>}>
        <LoadingState message="Loading branches..." variant="full-page" />
      </BranchShell>
    );
  }

  if (error) {
    return (
      <BranchShell title="Branches" description="Manage your dealership branches and locations." actions={<Button asChild><Link href={admin.branches.create().url}><Plus className="mr-2 h-4 w-4" />Add Branch</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.branches.index().url);
          }}
        />
      </BranchShell>
    );
  }

  return (
    <BranchShell title="Branches" description="Manage your dealership branches and locations." actions={<Button asChild><Link href={admin.branches.create().url}><Plus className="mr-2 h-4 w-4" />Add Branch</Link></Button>}>
      {branchesData.data.length === 0 ? (
        <EmptyState
          title="No branches found"
          description="Get started by creating your first branch location."
          icon={<Building2 className="size-12 text-muted-foreground" />}
          action={
            <Button asChild>
              <Link href={admin.branches.create().url}>
                <Building2 className="mr-2 size-4" />
                Create Branch
              </Link>
            </Button>
          }
        />
      ) : (
        <AdminDataTable
          rows={branchesData}
          filters={filters}
          columns={columns}
          baseUrl={admin.branches.index().url}
          createUrl={admin.branches.create().url}
          createLabel="Create Branch"
          rowActions={(branch) => (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label={`More options for branch ${branch.id}`}>
                    <MoreHorizontal className="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={admin.branches.show(branch.id).url} aria-label={`View branch ${branch.id}`}>
                      <Eye className="mr-2 size-4" aria-hidden="true" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={admin.branches.edit(branch.id).url} aria-label={`Edit branch ${branch.id}`}>
                      <Pencil className="mr-2 size-4" aria-hidden="true" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeleteId(branch.id)} aria-label={`Delete branch ${branch.id}`}>
                    <Trash2 className="mr-2 size-4" aria-hidden="true" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ConfirmationDialog
                open={deleteId === branch.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete branch?"
                description="This will permanently delete the branch and all associated data."
                confirmLabel="Delete"
                onConfirm={handleDelete}
                isLoading={isDeleting}
              />
            </>
          )}
        />
      )}
    </BranchShell>
  );
}
