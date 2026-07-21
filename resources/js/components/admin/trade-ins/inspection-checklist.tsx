import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const groups = { exterior: ['Paint condition', 'Body panels', 'Glass', 'Lights', 'Trim'], interior: ['Seats', 'Dashboard', 'Controls', 'Odor', 'Carpets'], mechanical: ['Brakes', 'Suspension', 'Fluids', 'Leaks', 'Road test'] };

interface InspectionChecklistProps {
  values?: Record<string, Record<string, boolean | string> | undefined>;
  editable?: boolean;
  onChange?: (group: string, item: string, checked: boolean) => void;
  onNotesChange?: (group: string, notes: string) => void;
}

export default function InspectionChecklist({ values = {}, editable = false, onChange, onNotesChange }: InspectionChecklistProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Object.entries(groups).map(([group, items]) => (
        <div key={group} className="rounded-xl border bg-card p-4">
          <h3 className="mb-3 font-medium capitalize">{group} checklist</h3>
          <div className="space-y-3">
            {items.map((item) => {
              const checked = Boolean(values[group]?.[item]);

              return (
                <Label key={item} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={checked}
                    disabled={!editable}
                    onCheckedChange={(checked) => {
                      if (editable && onChange) {
                        onChange(group, item, checked === true);
                      }
                    }}
                  />
                  {item}
                </Label>
              );
            })}
          </div>
          {editable && onNotesChange ? (
            <Textarea
              value={values[group]?.['notes'] as string || ''}
              onChange={(e) => onNotesChange(group, e.target.value)}
              className="mt-4"
              placeholder={`${group} notes`}
            />
          ) : editable ? (
            <Textarea name={`${group}_notes`} className="mt-4" placeholder={`${group} notes`} />
          ) : values[group]?.['notes'] ? (
            <div className="mt-4 rounded-md bg-muted p-3 text-sm">
              <p className="font-medium">Notes:</p>
              <p className="text-muted-foreground">{values[group]?.['notes'] as string}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
