import { Form } from '@inertiajs/react';
import { tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
export default function Edit({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
 const valuation = tradeInRequest.valuation;

 return <TradeInShell title="Edit Vehicle Valuation" description={tradeInVehicleName(tradeInRequest)} actions={<TradeInBackButton href={`/admin/trade-ins/${tradeInRequest.id}/valuation`} />}><Form action={`/admin/trade-ins/${tradeInRequest.id}/valuation`} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4"><input type="hidden" name="_method" value="put" /><div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Market value</Label><Input name="market_value" type="number" defaultValue={valuation?.market_value ?? ''} /></div><div className="space-y-2"><Label>Estimated resale value</Label><Input name="estimated_resale_value" type="number" defaultValue={valuation?.estimated_resale_value ?? ''} /></div><div className="space-y-2"><Label>Repair estimate</Label><Input name="repair_estimate" type="number" defaultValue={valuation?.repair_estimate ?? ''} /></div><div className="space-y-2"><Label>Final trade-in value</Label><Input name="final_trade_in_value" type="number" defaultValue={valuation?.final_trade_in_value ?? ''} /></div><div className="space-y-2 md:col-span-2"><Label>Approval status</Label><Input name="approval_status" defaultValue={valuation?.approval_status ?? 'pending'} /></div><div className="space-y-2 md:col-span-2"><Label>Pricing adjustments</Label><Textarea name="adjustments" rows={6} defaultValue={JSON.stringify(valuation?.adjustments ?? [], null, 2)} /></div></div><Button className="w-fit">Save valuation</Button></Form></TradeInShell>; 
}
