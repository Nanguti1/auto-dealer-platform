import { useForm } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import TradeInShell from '@/components/admin/trade-ins/trade-in-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ForeignSelector } from '@/components/admin/shared';
import * as React from 'react';

export default function Create({ tradeInRequests, users }: { tradeInRequests?: Array<{ id: number; make: string; model: string; year: number }>; users?: Array<{ id: number; name: string; email?: string }> }) {
  const tradeInRequestOptions = (tradeInRequests || []).map(req => ({
    value: req.id,
    label: `${req.year} ${req.make} ${req.model}`,
  }));

  const userOptions = (users || []).map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  const { data, setData, post, processing, errors } = useForm({
    trade_in_request_id: '',
    valuation_source_id: '',
    trade_in_value: '',
    wholesale_value: '',
    retail_value: '',
    valuation_method: '',
    adjustments: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(adminRoutes.valuations.store().url);
  };

  return (
    <TradeInShell title="Create Vehicle Valuation" description="Create a new vehicle valuation for a trade-in request.">
      <form onSubmit={handleSubmit} className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <ForeignSelector
            name="trade_in_request_id"
            label="Trade-In Request"
            value={data.trade_in_request_id}
            options={tradeInRequestOptions}
            placeholder="Select a trade-in request"
            searchable
            required
            onChange={(value) => setData('trade_in_request_id', value)}
            error={errors.trade_in_request_id}
          />
          <ForeignSelector
            name="valuation_source_id"
            label="Valuation Source"
            value={data.valuation_source_id}
            options={userOptions}
            placeholder="Select a user"
            searchable
            onChange={(value) => setData('valuation_source_id', value)}
            error={errors.valuation_source_id}
          />
          <div className="space-y-2">
            <Label htmlFor="trade_in_value">Trade-In Value</Label>
            <Input 
              id="trade_in_value" 
              name="trade_in_value" 
              type="number" 
              step="0.01" 
              value={data.trade_in_value}
              onChange={(e) => setData('trade_in_value', e.target.value)}
              required 
            />
            {errors.trade_in_value && <p className="text-sm text-destructive">{errors.trade_in_value}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="wholesale_value">Wholesale Value</Label>
            <Input 
              id="wholesale_value" 
              name="wholesale_value" 
              type="number" 
              step="0.01" 
              value={data.wholesale_value}
              onChange={(e) => setData('wholesale_value', e.target.value)}
            />
            {errors.wholesale_value && <p className="text-sm text-destructive">{errors.wholesale_value}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="retail_value">Retail Value</Label>
            <Input 
              id="retail_value" 
              name="retail_value" 
              type="number" 
              step="0.01" 
              value={data.retail_value}
              onChange={(e) => setData('retail_value', e.target.value)}
            />
            {errors.retail_value && <p className="text-sm text-destructive">{errors.retail_value}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="valuation_method">Valuation Method</Label>
            <Input 
              id="valuation_method" 
              name="valuation_method" 
              placeholder="e.g., market_comparable, dealer_book"
              value={data.valuation_method}
              onChange={(e) => setData('valuation_method', e.target.value)}
            />
            {errors.valuation_method && <p className="text-sm text-destructive">{errors.valuation_method}</p>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="adjustments">Adjustments</Label>
            <Textarea 
              id="adjustments" 
              name="adjustments" 
              rows={3} 
              placeholder="Pricing adjustments..."
              value={data.adjustments}
              onChange={(e) => setData('adjustments', e.target.value)}
            />
            {errors.adjustments && <p className="text-sm text-destructive">{errors.adjustments}</p>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              rows={3} 
              placeholder="Additional valuation notes..."
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
          </div>
        </div>
        <Button type="submit" disabled={processing} className="w-fit">
          {processing ? 'Creating...' : 'Create valuation'}
        </Button>
      </form>
    </TradeInShell>
  );
}
