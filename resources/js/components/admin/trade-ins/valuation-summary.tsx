import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from './helpers';
import TradeInStatusBadge from './trade-in-status-badge';
import type { TradeInValuation } from './types';
export default function ValuationSummary({ valuation }: { valuation?: TradeInValuation }) {
  const metrics = [['Market value', valuation?.market_value], ['Estimated resale', valuation?.estimated_resale_value], ['Repair estimate', valuation?.repair_estimate], ['Final trade-in value', valuation?.final_trade_in_value]];

  return <Card><CardHeader><CardTitle>Valuation summary</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid gap-3 sm:grid-cols-2">{metrics.map(([label, value]) => <div key={label as string} className="rounded-lg border p-3"><p className="text-sm text-muted-foreground">{label}</p><p className="text-lg font-semibold">{formatCurrency(value as string | number | undefined)}</p></div>)}</div><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Approval status</span><TradeInStatusBadge status={valuation?.approval_status} /></div></CardContent></Card>;
}
