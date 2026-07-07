import { Link, router } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import MarketingShell from '@/components/admin/marketing/marketing-shell';
import MarketingStatusBadge from '@/components/admin/marketing/marketing-status-badge';
import type { MarketingFilters, Promotion, PromotionPagination } from '@/components/admin/marketing/types';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ promotions, filters = {} }: { promotions: PromotionPagination; filters?: MarketingFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<Promotion>[] = [
    { key: 'name', label: 'Campaign', sortable: true, render: (promotion) => <div><Link className="font-medium hover:underline" href={adminRoutes.promotions.show(promotion.id).url}>{promotion.name ?? promotion.title ?? 'Untitled campaign'}</Link><p className="text-xs text-muted-foreground">{promotion.description ?? promotion.slug ?? '—'}</p></div> },
    { key: 'type', label: 'Type', render: (promotion) => promotion.type ?? '—' },
    { key: 'value', label: 'Discount', sortable: true, render: (promotion) => promotion.value ?? promotion.discount ?? '—' },
    { key: 'starts_at', label: 'Dates', render: (promotion) => <span className="text-sm">{formatDate(promotion.starts_at)} – {formatDate(promotion.ends_at)}</span> },
    { key: 'is_active', label: 'Status', render: (promotion) => <MarketingStatusBadge status={promotion.status} active={promotion.is_active} /> },
    { key: 'visibility', label: 'Visibility', render: (promotion) => promotion.visibility ?? String(promotion.rules?.visibility ?? 'public') },
  ];

  if (isLoading) {
    return (
      <MarketingShell title="Promotions" description="Manage marketing campaigns, discounts, featured vehicles, visibility, and campaign windows." actions={<Button asChild><Link href={adminRoutes.promotions.create().url}>Create Promotion</Link></Button>}>
        <LoadingState message="Loading promotions..." variant="full-page" />
      </MarketingShell>
    );
  }

  if (error) {
    return (
      <MarketingShell title="Promotions" description="Manage marketing campaigns, discounts, featured vehicles, visibility, and campaign windows." actions={<Button asChild><Link href={adminRoutes.promotions.create().url}>Create Promotion</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.promotions.index().url);
          }}
        />
      </MarketingShell>
    );
  }

  return (
    <MarketingShell title="Promotions" description="Manage marketing campaigns, discounts, featured vehicles, visibility, and campaign windows." actions={<Button asChild><Link href={adminRoutes.promotions.create().url}>Create Promotion</Link></Button>}>
      {promotions.data.length === 0 ? (
        <EmptyGeneric
          title="No promotions"
          description="Create your first marketing campaign to promote your vehicles."
          action={{ label: 'Create Promotion', onClick: () => router.visit(adminRoutes.promotions.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={promotions}
          filters={filters}
          columns={columns}
          baseUrl={adminRoutes.promotions.index().url}
          createUrl={adminRoutes.promotions.create().url}
          createLabel="Create Promotion"
          rowActions={(promotion) => (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={adminRoutes.promotions.show(promotion.id).url}>
                      <Eye className="mr-2 size-4" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={adminRoutes.promotions.edit(promotion.id).url}>
                      <Pencil className="mr-2 size-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeleteId(promotion.id)}>
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ConfirmationDialog
                open={deleteId === promotion.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete promotion?"
                description="This will remove the promotion from marketing campaigns."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(adminRoutes.promotions.destroy(promotion.id).url, { onFinish: () => setDeleteId(null) })}
              />
            </>
          )}
        />
      )}
    </MarketingShell>
  );
}

function formatDate(value?: string): string {
  return value ? new Date(value).toLocaleDateString() : '—';
}
