import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import MarketingShell from '@/components/admin/marketing/marketing-shell';
import MarketingStatusBadge from '@/components/admin/marketing/marketing-status-badge';
import type { MarketingFilters, Review, ReviewPagination } from '@/components/admin/marketing/types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Index({ reviews, filters = {} }: { reviews: ReviewPagination; filters?: MarketingFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const columns: Column<Review>[] = [
    { key: 'customer', label: 'Customer', render: (review) => <div><Link className="font-medium hover:underline" href={`/admin/reviews/${review.id}`}>{review.customer?.name ?? review.user?.name ?? `Review #${review.id}`}</Link><p className="text-xs text-muted-foreground">{review.customer?.email ?? review.user?.email ?? '—'}</p></div> },
    { key: 'vehicle', label: 'Vehicle', render: (review) => review.vehicle?.title ?? review.vehicle?.stock_number ?? review.vehicle_id ?? '—' },
    { key: 'rating', label: 'Rating', sortable: true, render: (review) => '★'.repeat(review.rating ?? 0).padEnd(5, '☆') },
    { key: 'body', label: 'Review', render: (review) => <span className="line-clamp-2 text-sm text-muted-foreground">{review.body ?? review.review ?? review.title ?? '—'}</span> },
    { key: 'status', label: 'Approval', render: (review) => <MarketingStatusBadge status={review.status ?? (review.approved_at ? 'approved' : 'pending')} /> },
    { key: 'published', label: 'Published', render: (review) => <MarketingStatusBadge status={review.is_published ? 'published' : 'draft'} /> },
  ];
  return <MarketingShell title="Customer Reviews" description="Moderate customer reviews, approval, featured state, publishing, replies, and deletion." actions={null}><AdminDataTable rows={reviews} filters={filters} columns={columns} baseUrl="/admin/reviews" rowActions={(review) => <><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem asChild><Link href={`/admin/reviews/${review.id}`}><Eye className="mr-2 size-4" />View</Link></DropdownMenuItem><DropdownMenuItem asChild><Link href={`/admin/reviews/${review.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></DropdownMenuItem><DropdownMenuItem onClick={() => setDeleteId(review.id)}><Trash2 className="mr-2 size-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu><ConfirmationDialog open={deleteId === review.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete review?" description="This will remove the customer review." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(`/admin/reviews/${review.id}`, { onFinish: () => setDeleteId(null) })} /></>} /></MarketingShell>;
}
