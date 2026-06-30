import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Tag as TagIcon } from 'lucide-react';
import * as React from 'react';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { BlogTag, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ blogTags, filters = {} }: { blogTags: Paginated<BlogTag>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

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
          <Link className="font-medium hover:underline" href={`/admin/blog-tags/${tag.id}`}>
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

  return (
    <CmsShell
      title="Blog Tags"
      description="Manage blog post tags for content tagging and filtering."
      actions={<Button asChild><Link href="/admin/blog-tags/create">Create Tag</Link></Button>}
    >
      <AdminDataTable
        rows={blogTags}
        filters={filters}
        columns={columns}
        baseUrl="/admin/blog-tags"
        createUrl="/admin/blog-tags/create"
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
                  <Link href={`/admin/blog-tags/${tag.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/blog-tags/${tag.id}/edit`}>
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
              onConfirm={() => router.delete(`/admin/blog-tags/${tag.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
