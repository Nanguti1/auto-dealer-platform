import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const groups = { exterior: ['Paint condition', 'Body panels', 'Glass', 'Lights', 'Trim'], interior: ['Seats', 'Dashboard', 'Controls', 'Odor', 'Carpets'], mechanical: ['Brakes', 'Suspension', 'Fluids', 'Leaks', 'Road test'] };
export default function InspectionChecklist({ values = {}, editable = false }: { values?: Record<string, Record<string, boolean | string> | undefined>; editable?: boolean }) {
  return <div className="grid gap-4 lg:grid-cols-3">{Object.entries(groups).map(([group, items]) => <div key={group} className="rounded-xl border bg-card p-4"><h3 className="mb-3 font-medium capitalize">{group} checklist</h3><div className="space-y-3">{items.map((item) => { const checked = Boolean(values[group]?.[item]); return <Label key={item} className="flex items-center gap-2 text-sm"><Checkbox name={`${group}[${item}]`} defaultChecked={checked} disabled={!editable} />{item}</Label>; })}</div>{editable ? <Textarea name={`${group}_notes`} className="mt-4" placeholder={`${group} notes`} /> : null}</div>)}</div>;
}
