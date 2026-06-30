import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import TimelineList from '@/components/admin/customers/timeline-list';
import { formatCurrency, tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import ValuationSummary from '@/components/admin/trade-ins/valuation-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function Show({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
 const valuation = tradeInRequest.valuation; const adjustments = Array.isArray(valuation?.adjustments) ? valuation.adjustments : Object.entries(valuation?.adjustments ?? {}).map(([label, amount]) => ({ label, amount }));

 return <TradeInShell title="Vehicle Valuation" description={tradeInVehicleName(tradeInRequest)} actions={<><TradeInBackButton href={`/admin/trade-ins/${tradeInRequest.id}`} /><Button asChild><Link href={`/admin/trade-ins/${tradeInRequest.id}/valuation/edit`}><Pencil className="mr-2 size-4" />Edit valuation</Link></Button></>}><div className="grid gap-4 lg:grid-cols-2"><ValuationSummary valuation={valuation} /><Card><CardHeader><CardTitle>Pricing adjustments</CardTitle></CardHeader><CardContent className="space-y-3">{adjustments.length ? adjustments.map((adjustment, index) => <div key={`${adjustment.label}-${index}`} className="flex justify-between rounded-lg border p-3"><span>{adjustment.label ?? adjustment.reason ?? 'Adjustment'}</span><span>{formatCurrency(adjustment.amount)}</span></div>) : <p className="text-sm text-muted-foreground">No adjustments recorded.</p>}</CardContent></Card><Card className="lg:col-span-2"><CardHeader><CardTitle>Approval history</CardTitle></CardHeader><CardContent><TimelineList events={valuation?.approval_history ?? []} /></CardContent></Card></div></TradeInShell>; 
}
