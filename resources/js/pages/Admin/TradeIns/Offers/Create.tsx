import OfferForm from '@/components/admin/trade-ins/offer-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import adminRoutes from '@/routes/admin';

export default function Create({ tradeInRequestId, tradeInRequests }: { tradeInRequestId?: number; tradeInRequests?: Array<{ id: number; make: string; model: string; year: number; vin?: string }> }) {
  const hasPreselectedTradeIn = !!tradeInRequestId;

  return (
    <TradeInShell
      title="Create Trade-In Offer"
      description="Prepare a customer-facing offer with expiration and approval workflow."
      actions={<TradeInBackButton href={hasPreselectedTradeIn ? `/admin/trade-ins/${tradeInRequestId}` : adminRoutes.offers.index().url} />}
    >
      <OfferForm
        action={adminRoutes.offers.store().url}
        tradeInRequestId={tradeInRequestId}
        tradeInRequests={tradeInRequests}
      />
    </TradeInShell>
  );
}
