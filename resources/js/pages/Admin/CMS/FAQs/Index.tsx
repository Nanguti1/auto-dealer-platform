import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { Faq, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ faqs, filters = {} }: { faqs: Paginated<Faq>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const columns: Column<Faq>[] = [
    {
      key: 'question',
      label: 'Question',
      sortable: true,
      render: (faq) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/faqs/${faq.id}`}>
            {faq.question ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{faq.category ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (faq) => faq.category ?? '—',
    },
    {
      key: 'order',
      label: 'Order',
      sortable: true,
      render: (faq) => faq.order ?? 0,
    },
    {
      key: 'is_published',
      label: 'Status',
      render: (faq) => (
        <Badge variant={faq.is_published ? 'default' : 'secondary'}>
          {faq.is_published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'is_visible',
      label: 'Visibility',
      render: (faq) => (
        <Badge variant={faq.is_visible ? 'default' : 'outline'}>
          {faq.is_visible ? 'Visible' : 'Hidden'}
        </Badge>
      ),
    },
  ];

  return (
    <CmsShell
      title="FAQ Management"
      description="Manage frequently asked questions and their categories."
      actions={<Button asChild><Link href="/admin/faqs/create">Create FAQ</Link></Button>}
    >
      <AdminDataTable
        rows={faqs}
        filters={filters}
        columns={columns}
        baseUrl="/admin/faqs"
        createUrl="/admin/faqs/create"
        createLabel="Create FAQ"
        rowActions={(faq) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/faqs/${faq.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/faqs/${faq.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(faq.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === faq.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete FAQ?"
              description="This will permanently delete this FAQ."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/faqs/${faq.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
