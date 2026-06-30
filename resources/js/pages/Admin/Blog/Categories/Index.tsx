import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { BlogCategory, CmsFilters, Paginated } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ blogCategories, filters = {} }: { blogCategories: Paginated<BlogCategory>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<BlogCategory>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (category) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/blog-categories/${category.id}`}>
            {category.name ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{category.slug ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'posts_count',
      label: 'Posts',
      sortable: true,
      render: (category) => category.posts_count ?? 0,
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (category) => (
        <Badge variant={category.is_active ? 'default' : 'secondary'}>
          {category.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'is_visible',
      label: 'Visibility',
      render: (category) => (
        <Badge variant={category.is_visible ? 'default' : 'outline'}>
          {category.is_visible ? 'Visible' : 'Hidden'}
        </Badge>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      sortable: true,
      render: (category) => category.order ?? 0,
    },
  ];

  return (
    <CmsShell
      title="Blog Categories"
      description="Manage blog post categories for content organization."
      actions={<Button asChild><Link href="/admin/blog-categories/create">Create Category</Link></Button>}
    >
      <AdminDataTable
        rows={blogCategories}
        filters={filters}
        columns={columns}
        baseUrl="/admin/blog-categories"
        createUrl="/admin/blog-categories/create"
        createLabel="Create Category"
        rowActions={(category) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/blog-categories/${category.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/blog-categories/${category.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(category.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === category.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete category?"
              description="This will permanently delete the blog category."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/blog-categories/${category.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
