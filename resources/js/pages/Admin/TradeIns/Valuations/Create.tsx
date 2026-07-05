import { Form } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ForeignSelector } from '@/components/admin/shared';

export default function Create({ tradeInRequests, users }: { tradeInRequests?: Array<{ id: number; make: string; model: string; year: number }>; users?: Array<{ id: number; name: string; email?: string }> }) {
  const tradeInRequestOptions = (tradeInRequests || []).map(req => ({
    value: req.id,
    label: `${req.year} ${req.make} ${req.model}`,
  }));

  const userOptions = (users || []).map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  return (
    <TradeInShell title="Create Vehicle Valuation" description="Create a new vehicle valuation for a trade-in request.">
      <Form action={adminRoutes.valuations.store().url} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <ForeignSelector
            name="trade_in_request_id"
            label="Trade-In Request"
            options={tradeInRequestOptions}
            placeholder="Select a trade-in request"
            searchable
            required
          />
          <ForeignSelector
            name="valuation_source_id"
            label="Valuation Source"
            options={userOptions}
            placeholder="Select a user"
            searchable
          />
          <div className="space-y-2">
            <Label htmlFor="trade_in_value">Trade-In Value</Label>
            <Input id="trade_in_value" name="trade_in_value" type="number" step="0.01" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wholesale_value">Wholesale Value</Label>
            <Input id="wholesale_value" name="wholesale_value" type="number" step="0.01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retail_value">Retail Value</Label>
            <Input id="retail_value" name="retail_value" type="number" step="0.01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valuation_method">Valuation Method</Label>
            <Input id="valuation_method" name="valuation_method" placeholder="e.g., market_comparable, dealer_book" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="adjustments">Adjustments</Label>
            <Textarea id="adjustments" name="adjustments" rows={3} placeholder="Pricing adjustments..." />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" rows={3} placeholder="Additional valuation notes..." />
          </div>
        </div>
        <Button className="w-fit">Create valuation</Button>
      </Form>
    </TradeInShell>
  );
}
