import { Link, router } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import MarketingShell from '@/components/admin/marketing/marketing-shell';
import MarketingStatusBadge from '@/components/admin/marketing/marketing-status-badge';
import type { MarketingFilters, Promotion, PromotionPagination } from '@/components/admin/marketing/types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ promotions, filters = {} }: { promotions: PromotionPagination; filters?: MarketingFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const columns: Column<Promotion>[] = [
    { key: 'name', label: 'Campaign', sortable: true, render: (promotion) => <div><Link className="font-medium hover:underline" href={`/admin/promotions/${promotion.id}`}>{promotion.name ?? promotion.title ?? 'Untitled campaign'}</Link><p className="text-xs text-muted-foreground">{promotion.description ?? promotion.slug ?? '—'}</p></div> },
    { key: 'type', label: 'Type', render: (promotion) => promotion.type ?? '—' },
    { key: 'value', label: 'Discount', sortable: true, render: (promotion) => promotion.value ?? promotion.discount ?? '—' },
    { key: 'starts_at', label: 'Dates', render: (promotion) => <span className="text-sm">{formatDate(promotion.starts_at)} – {formatDate(promotion.ends_at)}</span> },
    { key: 'is_active', label: 'Status', render: (promotion) => <MarketingStatusBadge status={promotion.status} active={promotion.is_active} /> },
    { key: 'visibility', label: 'Visibility', render: (promotion) => promotion.visibility ?? String(promotion.rules?.visibility ?? 'public') },
  ];

  return <MarketingShell title="Promotions" description="Manage marketing campaigns, discounts, featured vehicles, visibility, and campaign windows." actions={<Button asChild><Link href="/admin/promotions/create">Create Promotion</Link></Button>}><AdminDataTable rows={promotions} filters={filters} columns={columns} baseUrl="/admin/promotions" createUrl="/admin/promotions/create" createLabel="Create Promotion" rowActions={(promotion) => <><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem asChild><Link href={`/admin/promotions/${promotion.id}`}><Eye className="mr-2 size-4" />View</Link></DropdownMenuItem><DropdownMenuItem asChild><Link href={`/admin/promotions/${promotion.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></DropdownMenuItem><DropdownMenuItem onClick={() => setDeleteId(promotion.id)}><Trash2 className="mr-2 size-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu><ConfirmationDialog open={deleteId === promotion.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete promotion?" description="This will remove the promotion from marketing campaigns." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(`/admin/promotions/${promotion.id}`, { onFinish: () => setDeleteId(null) })} /></>} /></MarketingShell>;
}
function formatDate(value?: string): string {
 return value ? new Date(value).toLocaleDateString() : '—'; 
}
