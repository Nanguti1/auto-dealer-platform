import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { HeroSlider, CmsFilters, Paginated } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ heroSliders, filters = {} }: { heroSliders: Paginated<HeroSlider>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<HeroSlider>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (slider) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/hero-sliders/${slider.id}`}>
            {slider.title ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{slider.subtitle ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'image_path',
      label: 'Image',
      render: (slider) => (
        slider.image_path ? (
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground truncate max-w-32">{slider.image_path}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'display_order',
      label: 'Order',
      sortable: true,
      render: (slider) => slider.display_order ?? 0,
    },
    {
      key: 'is_active',
      label: 'Active',
      render: (slider) => (
        <Badge variant={slider.is_active ? 'default' : 'secondary'}>
          {slider.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'is_published',
      label: 'Status',
      render: (slider) => (
        <Badge variant={slider.is_published ? 'default' : 'secondary'}>
          {slider.is_published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
  ];

  return (
    <CmsShell
      title="Hero Sliders"
      description="Manage homepage hero sliders and banners."
      actions={<Button asChild><Link href="/admin/hero-sliders/create">Create Slider</Link></Button>}
    >
      <AdminDataTable
        rows={heroSliders}
        filters={filters}
        columns={columns}
        baseUrl="/admin/hero-sliders"
        createUrl="/admin/hero-sliders/create"
        createLabel="Create Slider"
        rowActions={(slider) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/hero-sliders/${slider.id}`}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/hero-sliders/${slider.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(slider.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === slider.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete slider?"
              description="This will permanently delete the hero slider."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(`/admin/hero-sliders/${slider.id}`, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
