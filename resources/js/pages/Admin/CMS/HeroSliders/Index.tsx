import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { HeroSlider, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
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
          <Link className="font-medium hover:underline" href={adminRoutes.heroSliders.show(slider.id).url}>
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
      actions={<Button asChild><Link href={adminRoutes.heroSliders.create().url}>Create Slider</Link></Button>}
    >
      <AdminDataTable
        rows={heroSliders}
        filters={filters}
        columns={columns}
        baseUrl={adminRoutes.heroSliders.index().url}
        createUrl={adminRoutes.heroSliders.create().url}
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
                  <Link href={adminRoutes.heroSliders.show(slider.id).url}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.heroSliders.edit(slider.id).url}>
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
              onConfirm={() => router.delete(adminRoutes.heroSliders.destroy(slider.id).url, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
