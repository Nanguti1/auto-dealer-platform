import TradeInForm from '@/components/admin/trade-ins/trade-in-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import admin from '@/routes/admin';

export default function Create() {
  return (
    <TradeInShell title="Create Trade-In Request" description="Create a new trade-in request with vehicle details, condition, and valuation information." actions={<TradeInBackButton />}>
      <TradeInForm action={admin.tradeIns.store().url} />
    </TradeInShell>
  );
}
