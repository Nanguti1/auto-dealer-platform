import OfferForm from '@/components/admin/trade-ins/offer-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
export default function Create({ tradeInRequestId }: { tradeInRequestId?: number }) {
 return <TradeInShell title="Create Trade-In Offer" description="Prepare a customer-facing offer with expiration and approval workflow." actions={<TradeInBackButton href="/admin/trade-in-offers" />}><OfferForm action="/admin/trade-in-offers" tradeInRequestId={tradeInRequestId} /></TradeInShell>; 
}
