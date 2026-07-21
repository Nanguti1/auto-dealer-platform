import { useForm } from '@inertiajs/react';
import InspectionChecklist from '@/components/admin/trade-ins/inspection-checklist';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ForeignSelector } from '@/components/admin/shared';

export default function Create({ tradeInRequest, tradeInRequests }: { tradeInRequest?: TradeInRequest; tradeInRequests?: Array<{ id: number; make: string; model: string; year: number; vin?: string }> }) {
  const tradeInRequestOptions = (tradeInRequests || []).map(req => ({
    value: req.id,
    label: `${req.year} ${req.make} ${req.model} ${req.vin ? `(${req.vin})` : ''}`,
  }));

  const hasPreselectedTradeIn = !!tradeInRequest;

  const { data, setData, post, processing, errors } = useForm({
    trade_in_request_id: hasPreselectedTradeIn ? tradeInRequest.id.toString() : '',
    status: 'pending',
    inspection_date: '',
    estimated_repair_cost: '',
    repair_recommendations: '',
    notes: '',
    condition_details: {
      exterior: {},
      interior: {},
      mechanical: {},
    },
  });

  const handleChecklistChange = (group: string, item: string, checked: boolean) => {
    setData(`condition_details.${group}.${item}`, checked);
  };

  const handleNotesChange = (group: string, notes: string) => {
    setData(`condition_details.${group}.notes`, notes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(hasPreselectedTradeIn ? `/admin/trade-ins/${tradeInRequest.id}/inspection` : '/admin/inspections');
  };

  return (
    <TradeInShell 
      title="Create Vehicle Inspection" 
      description="Inspect the trade-in vehicle and document its condition." 
      actions={<TradeInBackButton href={hasPreselectedTradeIn ? `/admin/trade-ins/${tradeInRequest.id}` : '/admin/inspections'} />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!hasPreselectedTradeIn && (
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
        )}
        {hasPreselectedTradeIn && (
          <input type="hidden" name="trade_in_request_id" value={data.trade_in_request_id} />
        )}
        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              name="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
            />
            {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="inspection_date">Inspection Date</Label>
            <Input
              id="inspection_date"
              name="inspection_date"
              type="date"
              value={data.inspection_date}
              onChange={(e) => setData('inspection_date', e.target.value)}
            />
            {errors.inspection_date && <p className="text-sm text-destructive">{errors.inspection_date}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated_repair_cost">Estimated Repair Cost</Label>
            <Input
              id="estimated_repair_cost"
              name="estimated_repair_cost"
              type="number"
              step="0.01"
              value={data.estimated_repair_cost}
              onChange={(e) => setData('estimated_repair_cost', e.target.value)}
            />
            {errors.estimated_repair_cost && <p className="text-sm text-destructive">{errors.estimated_repair_cost}</p>}
          </div>
        </div>

        <InspectionChecklist
          editable
          values={data.condition_details}
          onChange={handleChecklistChange}
          onNotesChange={handleNotesChange}
        />

        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="repair_recommendations">Repair Recommendations</Label>
            <Textarea 
              id="repair_recommendations" 
              name="repair_recommendations" 
              rows={3} 
              placeholder="Recommendations for repairs..."
              value={data.repair_recommendations}
              onChange={(e) => setData('repair_recommendations', e.target.value)}
            />
            {errors.repair_recommendations && <p className="text-sm text-destructive">{errors.repair_recommendations}</p>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              rows={5} 
              placeholder="Additional inspection notes..."
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
          </div>
          <Button type="submit" disabled={processing} className="w-fit">
            {processing ? 'Creating...' : 'Create inspection'}
          </Button>
        </div>
      </form>
    </TradeInShell>
  );
}
