import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import TradeInForm from '@/components/admin/trade-ins/trade-in-form';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
export default function Edit({ tradeInRequest }: { tradeInRequest: TradeInRequest }) { return <TradeInShell title="Edit Trade-In Request" description={tradeInVehicleName(tradeInRequest)} actions={<TradeInBackButton href={`/admin/trade-ins/${tradeInRequest.id}`} />}><TradeInForm tradeInRequest={tradeInRequest} action={`/admin/trade-ins/${tradeInRequest.id}`} /></TradeInShell>; }
