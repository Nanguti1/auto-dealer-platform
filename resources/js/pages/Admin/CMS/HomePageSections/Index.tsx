import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, MoreHorizontal, Layout as LayoutIcon } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { HomePageSection, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ homePageSections, filters = {} }: { homePageSections: Paginated<HomePageSection>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const columns: Column<HomePageSection>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (section) => (
        <div>
          <Link className="font-medium hover:underline" href={adminRoutes.homePageSections.show(section.id).url}>
            {section.title ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{section.section_type ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'section_type',
      label: 'Type',
      sortable: true,
      render: (section) => (
        <Badge variant="outline" className="capitalize">
          {section.section_type?.replace('_', ' ') ?? '—'}
        </Badge>
      ),
    },
    {
      key: 'display_order',
      label: 'Order',
      sortable: true,
      render: (section) => section.display_order ?? 0,
    },
    {
      key: 'is_visible',
      label: 'Visibility',
      render: (section) => (
        <Badge variant={section.is_visible ? 'default' : 'outline'}>
          {section.is_visible ? 'Visible' : 'Hidden'}
        </Badge>
      ),
    },
  ];

  return (
    <CmsShell
      title="Home Page Sections"
      description="Manage homepage sections including featured vehicles, brands, and CTAs."
      actions={<Button asChild><Link href={adminRoutes.homePageSections.create().url}>Create Section</Link></Button>}
    >
      <AdminDataTable
        rows={homePageSections}
        filters={filters}
        columns={columns}
        baseUrl={adminRoutes.homePageSections.index().url}
        createUrl={adminRoutes.homePageSections.create().url}
        createLabel="Create Section"
        rowActions={(section) => (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.homePageSections.show(section.id).url}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={adminRoutes.homePageSections.edit(section.id).url}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteId(section.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
              open={deleteId === section.id}
              onOpenChange={(open) => !open && setDeleteId(null)}
              title="Delete section?"
              description="This will permanently delete the home page section."
              trigger={<span />}
              confirmLabel="Delete"
              onConfirm={() => router.delete(adminRoutes.homePageSections.destroy(section.id).url, { onFinish: () => setDeleteId(null) })}
            />
          </>
        )}
      />
    </CmsShell>
  );
}
