import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Shield } from 'lucide-react';
import * as React from 'react';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Role {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  is_system: boolean;
  users_count: number;
  created_at: string;
}

export default function Index({ roles, filters = {} }: { roles: Paginated<Role>; filters?: Record<string, any> }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<Role>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (role) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/roles/${role.id}`}>
            {role.display_name || role.name}
          </Link>
          <p className="text-xs text-muted-foreground">{role.name}</p>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (role) => role.description ?? '—',
    },
    {
      key: 'users_count',
      label: 'Users',
      sortable: true,
      render: (role) => (
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" />
          <span>{role.users_count ?? 0}</span>
        </div>
      ),
    },
    {
      key: 'is_system',
      label: 'Type',
      render: (role) => (
        <Badge variant={role.is_system ? 'default' : 'secondary'}>
          {role.is_system ? 'System' : 'Custom'}
        </Badge>
      ),
    },
  ];

  return (
    <CmsShell
      title="Roles"
      description="Manage user roles and their associated permissions."
      actions={<Button asChild><Link href="/admin/roles/create">Create Role</Link></Button>}
    >
      <AdminDataTable
        rows={roles}
        filters={filters}
        columns={columns}
        baseUrl="/admin/roles"
        createUrl="/admin/roles/create"
        createLabel="Create Role"
        rowActions={(role) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/roles/${role.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/roles/${role.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                {!role.is_system && (
                  <DropdownMenuItem onClick={() => setDeleteId(role.id)}>
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {!role.is_system && (
              <ConfirmationDialog
                open={deleteId === role.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete role?"
                description="This will permanently delete the role and remove it from all users."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(`/admin/roles/${role.id}`, { onFinish: () => setDeleteId(null) })}
              />
            )}
          </>
        )}
      />
    </CmsShell>
  );
}
