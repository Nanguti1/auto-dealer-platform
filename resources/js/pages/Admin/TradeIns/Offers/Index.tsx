import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye, Pencil, XCircle } from 'lucide-react';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatCurrency, formatDate, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { OfferPagination, TradeInFilters, TradeInOffer } from '@/components/admin/trade-ins/types';
import { RowActionsDropdown } from '@/components/admin/shared';

export default function Index({ offers, filters = {} }: { offers: OfferPagination; filters?: TradeInFilters }) {
  const columns: Column<TradeInOffer>[] = [
    { key: 'offer_amount', label: 'Offer amount', sortable: true, render: (offer) => formatCurrency(offer.offer_amount) },
    { key: 'valid_until', label: 'Valid until', sortable: true, render: (offer) => offer.valid_until ? formatDate(offer.valid_until) : '—' },
    { key: 'accepted_at', label: 'Customer acceptance', sortable: true, render: (offer) => offer.accepted_at ? formatDate(offer.accepted_at) : 'Not accepted' },
    { key: 'status', label: 'Offer status', sortable: true, render: (offer) => <TradeInStatusBadge status={offer.status} /> },
    { key: 'trade_in_request', label: 'Related request', render: (offer) => offer.tradeInRequest ? <Link className="hover:underline" href={`/admin/trade-ins/${offer.trade_in_request_id}`}>{tradeInVehicleName(offer.tradeInRequest)}</Link> : `#${offer.trade_in_request_id ?? '—'}` },
    { key: 'created_at', label: 'Created', sortable: true, render: (offer) => formatDate(offer.created_at) },
  ];

  return <TradeInShell title="Trade-In Offers" description="Create, review, approve, and track customer trade-in offers."><AdminDataTable rows={offers} filters={filters} columns={columns} baseUrl="/admin/offers" createUrl="/admin/offers/create" createLabel="Create Offer" rowActions={(offer) => <RowActionsDropdown ariaLabel={`Actions for offer ${offer.id}`} actions={[{ label: 'View', icon: <Eye />, href: `/admin/offers/${offer.id}` }, { label: 'Edit', icon: <Pencil />, href: `/admin/offers/${offer.id}/edit` }, { label: 'Accept', icon: <CheckCircle2 />, onClick: () => router.patch(`/admin/offers/${offer.id}/accept`) }, { label: 'Reject', icon: <XCircle />, onClick: () => router.patch(`/admin/offers/${offer.id}/reject`) }]} />} /></TradeInShell>;
}
