import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Star, Trash2, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { BlogPost, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { compact } from '@/components/admin/inventory/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ blogPosts, filters = {} }: { blogPosts: Paginated<BlogPost>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (post) => (
        <div>
          <Link className="font-medium hover:underline" href={adminRoutes.blogPosts.show(post.id).url}>
            {post.title ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{post.slug ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (post) => post.category?.name ?? '—',
    },
    {
      key: 'author',
      label: 'Author',
      sortable: true,
      render: (post) => post.author?.name ?? '—',
    },
    {
      key: 'status',
      label: 'Status',
      render: (post) => (
        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
          {post.status ?? 'draft'}
        </Badge>
      ),
    },
    {
      key: 'published_at',
      label: 'Published',
      sortable: true,
      render: (post) => (post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'),
    },
  ];

  return (
    <CmsShell
      title="Blog Posts"
      description="Manage blog content, publication status, and metadata."
      actions={<Button asChild><Link href={adminRoutes.blogPosts.create().url}>Create Post</Link></Button>}
    >
      <AdminDataTable
        rows={blogPosts}
        filters={filters}
        columns={columns}
        baseUrl={adminRoutes.blogPosts.index().url}
        createUrl={adminRoutes.blogPosts.create().url}
        createLabel="Create Post"
        rowActions={(post) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.blogPosts.show(post.id).url}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.blogPosts.edit(post.id).url}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(post.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === post.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete blog post?"
              description="This will permanently delete the blog post."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(adminRoutes.blogPosts.destroy(post.id).url, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
