import { useForm } from '@inertiajs/react';
import { tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import InspectionChecklist from '@/components/admin/trade-ins/inspection-checklist';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInInspection } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatDateTime } from '@/lib/date-utils';
import { formatCurrency } from '@/lib/format-utils';

export default function Edit({ inspection }: { inspection: TradeInInspection }) {
  const tradeInRequest = inspection.tradeInRequest;

  const { data, setData, put, processing, errors } = useForm({
    status: inspection.status || 'pending',
    inspection_date: inspection.inspection_date || '',
    estimated_repair_cost: inspection.estimated_repair_cost || '',
    repair_recommendations: inspection.repair_recommendations || '',
    notes: inspection.notes || '',
    condition_details: inspection.condition_details || {
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
    put(`/admin/inspections/${inspection.id}`);
  };

  return (
    <TradeInShell
      title="Edit Vehicle Inspection"
      description={tradeInRequest ? tradeInVehicleName(tradeInRequest) : 'Inspection Details'}
      actions={<TradeInBackButton href={tradeInRequest ? `/admin/trade-ins/${tradeInRequest.id}` : `/admin/inspections/${inspection.id}`} />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
          </div>
          <Button type="submit" disabled={processing} className="w-fit">
            {processing ? 'Saving...' : 'Save inspection'}
          </Button>
        </div>
      </form>
    </TradeInShell>
  );
}