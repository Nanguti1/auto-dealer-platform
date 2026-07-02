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
            <Label htmlFor="market_value">Market value</Label>
            <Input id="market_value" name="market_value" type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated_resale_value">Estimated resale value</Label>
            <Input id="estimated_resale_value" name="estimated_resale_value" type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repair_estimate">Repair estimate</Label>
            <Input id="repair_estimate" name="repair_estimate" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="final_trade_in_value">Final trade-in value</Label>
            <Input id="final_trade_in_value" name="final_trade_in_value" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="approval_status">Approval status</Label>
            <Input id="approval_status" name="approval_status" defaultValue="pending" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="adjustments">Pricing adjustments (JSON)</Label>
            <Textarea id="adjustments" name="adjustments" rows={6} defaultValue="[]" />
          </div>
        </div>
        <Button className="w-fit">Create valuation</Button>
      </Form>
    </TradeInShell>
  );
}
