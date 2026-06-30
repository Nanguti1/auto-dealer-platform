import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { Paginated } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  roles?: Array<{ id: number; name: string; display_name: string }>;
  branch?: { id: number; name: string };
  email_verified_at?: string;
  created_at: string;
}

export default function Index({ users, filters = {} }: { users: Paginated<User>; filters?: Record<string, any> }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (user) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/users/${user.id}`}>
            {user.name ?? '—'}
          </Link>
          <p className="text-xs text-muted-foreground">{user.email ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (user) => user.phone ?? '—',
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (user) => (
        <div className="flex flex-wrap gap-1">
          {user.roles && user.roles.length > 0 ? (
            user.roles.map((role) => (
              <Badge key={role.id} variant="secondary">
                {role.display_name || role.name}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
    {
      key: 'branch',
      label: 'Branch',
      render: (user) => user.branch?.name ?? '—',
    },
    {
      key: 'email_verified_at',
      label: 'Verified',
      render: (user) => (
        <Badge variant={user.email_verified_at ? 'default' : 'secondary'}>
          {user.email_verified_at ? 'Yes' : 'No'}
        </Badge>
      ),
    },
  ];

  return (
    <CmsShell
      title="Users"
      description="Manage user accounts and their roles."
      actions={<Button asChild><Link href="/admin/users/create">Create User</Link></Button>}
    >
      <AdminDataTable
        rows={users}
        filters={filters}
        columns={columns}
        baseUrl="/admin/users"
        createUrl="/admin/users/create"
        createLabel="Create User"
        rowActions={(user) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/users/${user.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/users/${user.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(user.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === user.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete user?"
              description="This will permanently delete the user account."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/users/${user.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
