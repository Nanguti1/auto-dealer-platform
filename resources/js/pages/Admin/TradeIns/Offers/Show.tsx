import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Pencil, XCircle } from 'lucide-react';
import { formatCurrency, formatDate, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInOffer } from '@/components/admin/trade-ins/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

export default function Show({ offer }: { offer: TradeInOffer }) {
  return (
    <TradeInShell title={`Offer #${offer.id}`} description={`${formatCurrency(offer.amount ?? offer.offer_amount)} · Expires ${formatDate(offer.expires_at ?? offer.expiration_date)}`} actions={<><TradeInBackButton /><Button variant="outline" onClick={() => router.patch(`/admin/trade-in-offers/${offer.id}/accept`)}><CheckCircle2 className="mr-2 size-4" />Accept</Button><Button variant="outline" onClick={() => router.patch(`/admin/trade-in-offers/${offer.id}/reject`)}><XCircle className="mr-2 size-4" />Reject</Button><Button variant="outline" onClick={() => router.delete(`/admin/trade-in-offers/${offer.id}`)}><Archive className="mr-2 size-4" />Delete</Button><Button asChild><Link href={admin.offers.edit(offer.id).url}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Offer details</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Offer amount</p><p className="text-lg font-semibold">{formatCurrency(offer.amount ?? offer.offer_amount)}</p></div><div><p className="text-sm text-muted-foreground">Expiration date</p><p>{formatDate(offer.expires_at ?? offer.expiration_date)}</p></div><div><p className="text-sm text-muted-foreground">Status</p><TradeInStatusBadge status={offer.status} /></div><div><p className="text-sm text-muted-foreground">Approval status</p><TradeInStatusBadge status={offer.approval_status} /></div><div><p className="text-sm text-muted-foreground">Customer acceptance</p><Badge variant={offer.accepted_at ? 'default' : 'secondary'}>{offer.accepted_at ? `Accepted ${formatDate(offer.accepted_at)}` : 'Not accepted'}</Badge></div><div><p className="text-sm text-muted-foreground">Created</p><p>{formatDate(offer.created_at)}</p></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Quick actions</CardTitle></CardHeader><CardContent className="grid gap-2"><Button variant="outline" asChild><Link href={`/admin/trade-ins/${offer.trade_in_request_id ?? offer.trade_in_request?.id}`}>View trade-in request</Link></Button><Button variant="outline" asChild><Link href={`/admin/trade-in-offers/create?trade_in_request_id=${offer.trade_in_request_id}`}>Create counter-offer</Link></Button></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Related trade-in</CardTitle></CardHeader><CardContent className="text-sm">{offer.trade_in_request ? <Link href={`/admin/trade-ins/${offer.trade_in_request.id}`} className="hover:underline">{tradeInVehicleName(offer.trade_in_request)}</Link> : `Request #${offer.trade_in_request_id ?? '—'}`}</CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent className="text-sm">{offer.notes ?? 'No notes provided.'}</CardContent></Card>
      </div>
    </TradeInShell>
  );
}
