import { tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInForm from '@/components/admin/trade-ins/trade-in-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import admin from '@/routes/admin';

export default function Edit({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
  return (
    <TradeInShell title="Edit Trade-In Request" description={tradeInVehicleName(tradeInRequest)} actions={<TradeInBackButton href={admin.tradeIns.show(tradeInRequest.id).url} />}>
      <TradeInForm tradeInRequest={tradeInRequest} action={admin.tradeIns.update.form(tradeInRequest.id).action} method="put" />
    </TradeInShell>
  );
}
