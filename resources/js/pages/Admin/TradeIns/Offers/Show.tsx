import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Pencil, XCircle } from 'lucide-react';
import { formatCurrency, formatDateTime, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInOffer } from '@/components/admin/trade-ins/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

export default function Show({ offer }: { offer: TradeInOffer }) {
  return (
    <TradeInShell
      title={`Offer #${offer.id}`}
      description={`${formatCurrency(offer.offer_amount)} · Expires ${offer.valid_until ? formatDateTime(offer.valid_until) : 'Not set'}`}
      actions={
        <>
          <TradeInBackButton />
          <Button variant="outline" onClick={() => router.patch(admin.offers.accept(offer.id).url)}>
            <CheckCircle2 className="mr-2 size-4" />Accept
          </Button>
          <Button variant="outline" onClick={() => router.patch(admin.offers.reject(offer.id).url)}>
            <XCircle className="mr-2 size-4" />Reject
          </Button>
          <Button variant="outline" onClick={() => router.delete(admin.offers.destroy(offer.id).url)}>
            <Archive className="mr-2 size-4" />Delete
          </Button>
          <Button asChild>
            <Link href={admin.offers.edit(offer.id).url}>
              <Pencil className="mr-2 size-4" />Edit
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Offer details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Offer amount</p>
              <p className="text-lg font-semibold">{formatCurrency(offer.offer_amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiration date</p>
              <p>{offer.valid_until ? formatDateTime(offer.valid_until) : 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <TradeInStatusBadge status={offer.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p>{formatDateTime(offer.created_at)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/trade-ins/${offer.trade_in_request_id ?? offer.tradeInRequest?.id}`}>
                View trade-in request
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/admin/offers/create?tradeInRequestId=${offer.trade_in_request_id}`}>
                Create counter-offer
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Related trade-in</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {offer.tradeInRequest ? (
              <Link href={`/admin/trade-ins/${offer.tradeInRequest.id}`} className="hover:underline">
                {tradeInVehicleName(offer.tradeInRequest)}
              </Link>
            ) : (
              `Request #${offer.trade_in_request_id ?? '—'}`
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{offer.notes ?? 'No notes provided.'}</CardContent>
        </Card>
      </div>
    </TradeInShell>
  );
}
