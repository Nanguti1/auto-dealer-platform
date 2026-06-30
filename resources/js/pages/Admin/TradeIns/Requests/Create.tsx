import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import TradeInForm from '@/components/admin/trade-ins/trade-in-form';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { admin } from '@/routes/admin';

export default function Create() {
  const emptyTradeIn: TradeInRequest = {
    id: 0,
    status: 'pending',
    year: null,
    make: '',
    model: '',
    vin: '',
    mileage: null,
    estimated_value: null,
    offered_value: null,
    condition_report: {},
    created_at: '',
    updated_at: '',
  };

  return (
    <TradeInShell title="Create Trade-In Request" description="Create a new trade-in request with vehicle details, condition, and valuation information." actions={<TradeInBackButton />}>
      <TradeInForm action={admin.tradeIns.store.form().action} />
    </TradeInShell>
  );
}
