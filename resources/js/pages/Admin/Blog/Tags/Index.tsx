import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Tag as TagIcon } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { BlogTag, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ blogTags, filters = {} }: { blogTags: Paginated<BlogTag>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<BlogTag>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (tag) => (
        <div className="flex items-center gap-2">
          {tag.color && (
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tag.color }} />
          )}
          <Link className="font-medium hover:underline" href={adminRoutes.blogTags.show(tag.id).url}>
            {tag.name ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{tag.slug ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'posts_count',
      label: 'Usage',
      sortable: true,
      render: (tag) => (
        <div className="flex items-center gap-1">
          <TagIcon className="size-3 text-muted-foreground" />
          <span>{tag.posts_count ?? 0}</span>
        </div>
      ),
    },
    {
      key: 'color',
      label: 'Color',
      render: (tag) => (
        tag.color ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded border" style={{ backgroundColor: tag.color }} />
            <span className="text-xs text-muted-foreground">{tag.color}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'is_visible',
      label: 'Visibility',
      render: (tag) => (
        <Badge variant={tag.is_visible ? 'default' : 'outline'}>
          {tag.is_visible ? 'Visible' : 'Hidden'}
        </Badge>
      ),
    },
  ];

  if (isLoading) {
    return (
      <CmsShell
        title="Blog Tags"
        description="Manage blog post tags for content tagging and filtering."
        actions={<Button asChild><Link href={adminRoutes.blogTags.create().url}>Create Tag</Link></Button>}
      >
        <LoadingState message="Loading blog tags..." variant="full-page" />
      </CmsShell>
    );
  }

  if (error) {
    return (
      <CmsShell
        title="Blog Tags"
        description="Manage blog post tags for content tagging and filtering."
        actions={<Button asChild><Link href={adminRoutes.blogTags.create().url}>Create Tag</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.blogTags.index().url);
          }}
        />
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="Blog Tags"
      description="Manage blog post tags for content tagging and filtering."
      actions={<Button asChild><Link href={adminRoutes.blogTags.create().url}>Create Tag</Link></Button>}
    >
      {blogTags.data.length === 0 ? (
        <EmptyGeneric
          title="No blog tags"
          description="Get started by creating your first blog tag to categorize your content."
          action={{ label: 'Create Tag', onClick: () => router.visit(adminRoutes.blogTags.create().url) }}
        />
      ) : (
        <AdminDataTable
        rows={blogTags}
        filters={filters}
        columns={columns}
        baseUrl={adminRoutes.blogTags.index().url}
        createUrl={adminRoutes.blogTags.create().url}
        createLabel="Create Tag"
        rowActions={(tag) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.blogTags.show(tag.id).url}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.blogTags.edit(tag.id).url}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(tag.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === tag.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete tag?"
              description="This will permanently delete the blog tag."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(adminRoutes.blogTags.destroy(tag.id).url, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
      )}
    </CmsShell>
  );
}
