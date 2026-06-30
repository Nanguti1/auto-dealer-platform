import OfferForm from '@/components/admin/trade-ins/offer-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInOffer } from '@/components/admin/trade-ins/types';
export default function Edit({ offer }: { offer: TradeInOffer }) { return <TradeInShell title="Edit Trade-In Offer" description="Update amount, expiration, customer acceptance, status, and approval workflow." actions={<TradeInBackButton href="/admin/trade-in-offers" />}><OfferForm offer={offer} action={`/admin/trade-in-offers/${offer.id}`} tradeInRequestId={offer.trade_in_request_id} /></TradeInShell>; }
