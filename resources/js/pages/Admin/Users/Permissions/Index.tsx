import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Lock } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { Paginated } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Permission {
  id: number;
  name: string;
  display_name: string;
  module: string;
  description?: string;
  roles_count: number;
  created_at: string;
}

export default function Index({ permissions, filters = {} }: { permissions: Paginated<Permission>; filters?: Record<string, any> }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<Permission>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (permission) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/permissions/${permission.id}`}>
            {permission.display_name || permission.name}
          </Link>
          <p className="text-xs text-muted-foreground font-mono">{permission.name}</p>
        </div>
      ),
    },
    {
      key: 'module',
      label: 'Module',
      sortable: true,
      render: (permission) => (
        <Badge variant="outline">{permission.module}</Badge>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (permission) => permission.description ?? '—',
    },
    {
      key: 'roles_count',
      label: 'Roles',
      sortable: true,
      render: (permission) => (
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-muted-foreground" />
          <span>{permission.roles_count ?? 0}</span>
        </div>
      ),
    },
  ];

  return (
    <CmsShell
      title="Permissions"
      description="Manage system permissions and their assignments to roles."
      actions={<Button asChild><Link href="/admin/permissions/create">Create Permission</Link></Button>}
    >
      <AdminDataTable
        rows={permissions}
        filters={filters}
        columns={columns}
        baseUrl="/admin/permissions"
        createUrl="/admin/permissions/create"
        createLabel="Create Permission"
        rowActions={(permission) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/permissions/${permission.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/permissions/${permission.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(permission.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === permission.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete permission?"
              description="This will permanently delete the permission and remove it from all roles."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/permissions/${permission.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
