import { Form, Link } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInValuation } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ForeignSelector } from '@/components/admin/shared';

export default function Edit({ valuation, tradeInRequests, users }: { valuation: TradeInValuation; tradeInRequests?: Array<{ id: number; make: string; model: string; year: number }>; users?: Array<{ id: number; name: string; email?: string }> }) {
  const tradeInRequestOptions = (tradeInRequests || []).map(req => ({
    value: req.id,
    label: `${req.year} ${req.make} ${req.model}`,
  }));

  const userOptions = (users || []).map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  return <TradeInShell title="Edit Vehicle Valuation" description={`Valuation #${valuation.id}`} actions={<Button variant="outline" asChild><Link href={adminRoutes.valuations.index().url}>Back to Valuations</Link></Button>}><Form action={adminRoutes.valuations.update(valuation.id).url} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4"><input type="hidden" name="_method" value="put" /><div className="grid gap-4 md:grid-cols-2"><ForeignSelector name="trade_in_request_id" label="Trade-In Request" options={tradeInRequestOptions} value={valuation?.trade_in_request_id} placeholder="Select a trade-in request" searchable /><ForeignSelector name="valuation_source_id" label="Valuation Source" options={userOptions} value={valuation?.valuation_source_id} placeholder="Select a user" searchable /><div className="space-y-2"><Label>Trade-In Value</Label><Input name="trade_in_value" type="number" step="0.01" defaultValue={valuation?.trade_in_value ?? ''} /></div><div className="space-y-2"><Label>Wholesale Value</Label><Input name="wholesale_value" type="number" step="0.01" defaultValue={valuation?.wholesale_value ?? ''} /></div><div className="space-y-2"><Label>Retail Value</Label><Input name="retail_value" type="number" step="0.01" defaultValue={valuation?.retail_value ?? ''} /></div><div className="space-y-2"><Label>Valuation Method</Label><Input name="valuation_method" defaultValue={valuation?.valuation_method ?? ''} /></div><div className="space-y-2 md:col-span-2"><Label>Adjustments</Label><Textarea name="adjustments" rows={3} defaultValue={valuation?.adjustments ?? ''} /></div><div className="space-y-2 md:col-span-2"><Label>Notes</Label><Textarea name="notes" rows={3} defaultValue={valuation?.notes ?? ''} /></div></div><Button className="w-fit">Save valuation</Button></Form></TradeInShell>;
}
