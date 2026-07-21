import { tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInForm from '@/components/admin/trade-ins/trade-in-form';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';

export default function Edit({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
  if (!tradeInRequest || !tradeInRequest.id) {
    return (
      <TradeInShell title="Edit Trade-In Request" description="Trade-in request not found">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Trade-in request not found.</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Go Back
          </button>
        </div>
      </TradeInShell>
    );
  }

  const showUrl = `/admin/trade-ins/${tradeInRequest.id}`;
  const updateUrl = `/admin/trade-ins/${tradeInRequest.id}`;

  return (
    <TradeInShell title="Edit Trade-In Request" description={tradeInVehicleName(tradeInRequest)} actions={<TradeInBackButton href={showUrl} />}>
      <TradeInForm tradeInRequest={tradeInRequest} action={updateUrl} method="put" />
    </TradeInShell>
  );
}