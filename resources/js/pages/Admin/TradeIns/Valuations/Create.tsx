import { Form } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
  return (
    <TradeInShell title="Create Vehicle Valuation" description="Create a new vehicle valuation for a trade-in request.">
      <Form action={adminRoutes.valuations.store().url} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="trade_in_request_id">Trade-In Request ID</Label>
            <Input id="trade_in_request_id" name="trade_in_request_id" type="number" required />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="valuation_source_id">Valuation Source ID</Label>
            <Input id="valuation_source_id" name="valuation_source_id" type="number" />
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
