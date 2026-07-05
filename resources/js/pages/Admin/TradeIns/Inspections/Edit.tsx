import { Form } from '@inertiajs/react';
import { tradeInVehicleName } from '@/components/admin/trade-ins/helpers';
import InspectionChecklist from '@/components/admin/trade-ins/inspection-checklist';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
export default function Edit({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
 const inspection = tradeInRequest.inspection;

 return <TradeInShell title="Edit Vehicle Inspection" description={tradeInVehicleName(tradeInRequest)} actions={<TradeInBackButton href={`/admin/trade-ins/${tradeInRequest.id}/inspection}`} />}><Form action={`/admin/trade-ins/${tradeInRequest.id}/inspection`} method="post" className="space-y-4"><input type="hidden" name="_method" value="put" /><InspectionChecklist editable values={{ exterior: inspection?.exterior, interior: inspection?.interior, mechanical: inspection?.mechanical }} /><div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2"><div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue={inspection?.status ?? 'pending'} /></div><div className="space-y-2"><Label>Inspection Date</Label><Input name="inspection_date" type="date" defaultValue={inspection?.inspection_date ?? ''} /></div><div className="space-y-2"><Label>Estimated Repair Cost</Label><Input name="estimated_repair_cost" type="number" step="0.01" defaultValue={inspection?.estimated_repair_cost ?? ''} /></div><div className="space-y-2 md:col-span-2"><Label>Repair Recommendations</Label><Textarea name="repair_recommendations" rows={3} defaultValue={inspection?.repair_recommendations ?? ''} /></div><div className="space-y-2 md:col-span-2"><Label>Notes</Label><Textarea name="notes" rows={5} defaultValue={inspection?.notes ?? ''} /></div><Button className="w-fit">Save inspection</Button></div></Form></TradeInShell>;
}
