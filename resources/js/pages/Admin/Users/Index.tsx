import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import adminRoutes from '@/routes/admin';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: { id: number; name: string; display_name: string };
  branch?: { id: number; name: string };
  email_verified_at?: string;
  created_at: string;
}

export default function Index({ users, filters = {} }: { users: Paginated<User>; filters?: Record<string, any> }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (user) => (
        <div>
          <Link className="font-medium hover:underline" href={adminRoutes.users.show(user.id).url}>
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
      key: 'role',
      label: 'Role',
      render: (user) => (
        user.role ? (
          <Badge variant="secondary">
            {user.role.display_name || user.role.name}
          </Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
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

  if (isLoading) {
    return (
      <CmsShell
        title="Users"
        description="Manage user accounts and their roles."
        actions={<Button asChild><Link href={adminRoutes.users.create().url}>Create User</Link></Button>}
      >
        <LoadingState message="Loading users..." variant="full-page" />
      </CmsShell>
    );
  }

  if (error) {
    return (
      <CmsShell
        title="Users"
        description="Manage user accounts and their roles."
        actions={<Button asChild><Link href={adminRoutes.users.create().url}>Create User</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.users.index().url);
          }}
        />
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="Users"
      description="Manage user accounts and their roles."
      actions={<Button asChild><Link href={adminRoutes.users.create().url}>Create User</Link></Button>}
    >
      {users.data.length === 0 ? (
        <EmptyGeneric
          title="No users"
          description="Create your first user account to start managing access."
          action={{ label: 'Create User', onClick: () => router.visit(adminRoutes.users.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={users}
          filters={filters}
          columns={columns}
          baseUrl={adminRoutes.users.index().url}
          createUrl={adminRoutes.users.create().url}
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
                    <Link href={adminRoutes.users.show(user.id).url}>
                      <Eye className="mr-2 size-4" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={adminRoutes.users.edit(user.id).url}>
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
                onConfirm={() => router.delete(adminRoutes.users.destroy(user.id).url, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </CmsShell>
  );
}
