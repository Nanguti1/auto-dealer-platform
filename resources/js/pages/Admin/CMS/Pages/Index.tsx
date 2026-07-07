import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { CmsPage, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ pages, filters = {} }: { pages: Paginated<CmsPage>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<CmsPage>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (page) => (
        <div>
          <Link className="font-medium hover:underline" href={adminRoutes.cmsPages.show(page.id).url}>
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

  if (isLoading) {
    return (
      <CmsShell
        title="Static Pages"
        description="Manage static content pages, SEO, and visibility settings."
        actions={<Button asChild><Link href={adminRoutes.cmsPages.create().url}>Create Page</Link></Button>}
      >
        <LoadingState message="Loading pages..." variant="full-page" />
      </CmsShell>
    );
  }

  if (error) {
    return (
      <CmsShell
        title="Static Pages"
        description="Manage static content pages, SEO, and visibility settings."
        actions={<Button asChild><Link href={adminRoutes.cmsPages.create().url}>Create Page</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.cmsPages.index().url);
          }}
        />
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="Static Pages"
      description="Manage static content pages, SEO, and visibility settings."
      actions={<Button asChild><Link href={adminRoutes.cmsPages.create().url}>Create Page</Link></Button>}
    >
      {pages.data.length === 0 ? (
        <EmptyGeneric
          title="No static pages"
          description="Get started by creating your first static page for your website."
          action={{ label: 'Create Page', onClick: () => router.visit(adminRoutes.cmsPages.create().url) }}
        />
      ) : (
        <AdminDataTable
        rows={pages}
        filters={filters}
        columns={columns}
        baseUrl={adminRoutes.cmsPages.index().url}
        createUrl={adminRoutes.cmsPages.create().url}
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
                  <Link href={adminRoutes.cmsPages.show(page.id).url}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.cmsPages.edit(page.id).url}>
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
              onConfirm={() => router.delete(adminRoutes.cmsPages.destroy(page.id).url, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
      )}
    </CmsShell>
  );
}
