import OfferForm from '@/components/admin/trade-ins/offer-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import adminRoutes from '@/routes/admin';
export default function Create({ tradeInRequestId }: { tradeInRequestId?: number }) {
 return <TradeInShell title="Create Trade-In Offer" description="Prepare a customer-facing offer with expiration and approval workflow." actions={<TradeInBackButton href={adminRoutes.offers.index().url} />}><OfferForm action={adminRoutes.offers.store().url} tradeInRequestId={tradeInRequestId} /></TradeInShell>; 
}
