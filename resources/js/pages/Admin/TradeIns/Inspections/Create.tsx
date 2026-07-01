import { Form } from '@inertiajs/react';
import InspectionChecklist from '@/components/admin/trade-ins/inspection-checklist';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
  return (
    <TradeInShell title="Create Vehicle Inspection" description="Inspect the trade-in vehicle and document its condition." actions={<TradeInBackButton href={`/admin/trade-ins/${tradeInRequest.id}`} />}>
      <Form action={`/admin/trade-ins/${tradeInRequest.id}/inspection`} method="post" className="space-y-4">
        <InspectionChecklist editable values={{ exterior: {}, interior: {}, mechanical: {} }} />
        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue="pending" /></div>
          <div className="space-y-2"><Label>Tire condition</Label><Input name="tire_condition" placeholder="e.g., Good, Fair, Poor" /></div>
          <div className="space-y-2"><Label>Engine condition</Label><Input name="engine_condition" placeholder="e.g., Excellent, Good, Fair" /></div>
          <div className="space-y-2"><Label>Transmission condition</Label><Input name="transmission_condition" placeholder="e.g., Excellent, Good, Fair" /></div>
          <div className="space-y-2 md:col-span-2"><Label>Electrical systems</Label><Input name="electrical_systems" placeholder="e.g., All functional, Lights not working" /></div>
          <div className="space-y-2 md:col-span-2"><Label>Damage notes</Label><Textarea name="damage_notes" rows={5} placeholder="Document any visible damage..." /></div>
          <div className="space-y-2 md:col-span-2"><Label>Inspector notes</Label><Textarea name="inspector_notes" rows={5} placeholder="Additional inspection notes..." /></div>
          <Button className="w-fit">Create inspection</Button>
        </div>
      </Form>
    </TradeInShell>
  );
}
