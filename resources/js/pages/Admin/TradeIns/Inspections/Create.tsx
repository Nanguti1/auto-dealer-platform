import { Form } from '@inertiajs/react';
import InspectionChecklist from '@/components/admin/trade-ins/inspection-checklist';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create({ tradeInRequest }: { tradeInRequest?: TradeInRequest }) {
  if (!tradeInRequest) {
    return (
      <TradeInShell title="Create Vehicle Inspection" description="Inspect the trade-in vehicle and document its condition." actions={<TradeInBackButton href="/admin/trade-ins" />}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Trade-in request not found.</p>
        </div>
      </TradeInShell>
    );
  }

  return (
    <TradeInShell title="Create Vehicle Inspection" description="Inspect the trade-in vehicle and document its condition." actions={<TradeInBackButton href={`/admin/trade-ins/${tradeInRequest.id}`} />}>
      <Form action={`/admin/trade-ins/${tradeInRequest.id}/inspection`} method="post" className="space-y-4">
        <input type="hidden" name="trade_in_request_id" value={tradeInRequest.id} />
        <InspectionChecklist editable values={{ exterior: {}, interior: {}, mechanical: {} }} />
        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue="pending" /></div>
          <div className="space-y-2"><Label>Inspection Date</Label><Input name="inspection_date" type="date" /></div>
          <div className="space-y-2"><Label>Estimated Repair Cost</Label><Input name="estimated_repair_cost" type="number" step="0.01" /></div>
          <div className="space-y-2 md:col-span-2"><Label>Repair Recommendations</Label><Textarea name="repair_recommendations" rows={3} placeholder="Recommendations for repairs..." /></div>
          <div className="space-y-2 md:col-span-2"><Label>Notes</Label><Textarea name="notes" rows={5} placeholder="Additional inspection notes..." /></div>
          <Button type="submit" className="w-fit">Create inspection</Button>
        </div>
      </Form>
    </TradeInShell>
  );
}
