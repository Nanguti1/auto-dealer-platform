import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { CmsPage, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ pages, filters = {} }: { pages: Paginated<CmsPage>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<CmsPage>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (page) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/cms-pages/${page.id}`}>
            {page.title ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{page.slug ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (page) => (
        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
          {page.status ?? 'draft'}
        </Badge>
      ),
    },
    {
      key: 'is_visible',
      label: 'Visibility',
      render: (page) => (
        <Badge variant={page.is_visible ? 'default' : 'outline'}>
          {page.is_visible ? 'Visible' : 'Hidden'}
        </Badge>
      ),
    },
    {
      key: 'published_at',
      label: 'Published',
      sortable: true,
      render: (page) => (page.published_at ? new Date(page.published_at).toLocaleDateString() : '—'),
    },
  ];

  return (
    <CmsShell
      title="Static Pages"
      description="Manage static content pages, SEO, and visibility settings."
      actions={<Button asChild><Link href="/admin/cms-pages/create">Create Page</Link></Button>}
    >
      <AdminDataTable
        rows={pages}
        filters={filters}
        columns={columns}
        baseUrl="/admin/cms-pages"
        createUrl="/admin/cms-pages/create"
        createLabel="Create Page"
        rowActions={(page) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/cms-pages/${page.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/cms-pages/${page.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(page.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === page.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete page?"
              description="This will permanently delete the static page."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/cms-pages/${page.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
