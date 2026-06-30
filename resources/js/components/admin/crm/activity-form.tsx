import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CrmActivity } from './types';

export default function ActivityForm({ activity, action, leadId }: { activity?: CrmActivity; action: string; leadId?: number }) {
  return (
    <Form action={action} method="post" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => <><input type="hidden" name="_method" value={activity ? 'put' : 'post'} />{leadId ? <input type="hidden" name="lead_id" value={leadId} /> : null}<div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Type</Label><Input name="type" defaultValue={activity?.type ?? 'follow-up'} /><InputError message={errors.type} /></div><div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue={activity?.status ?? 'open'} /><InputError message={errors.status} /></div><div className="space-y-2"><Label>Due at</Label><Input name="due_at" type="datetime-local" defaultValue={activity?.due_at ?? ''} /><InputError message={errors.due_at} /></div><div className="space-y-2"><Label>Completed at</Label><Input name="completed_at" type="datetime-local" defaultValue={activity?.completed_at ?? ''} /><InputError message={errors.completed_at} /></div></div><div className="space-y-2"><Label>Notes</Label><Textarea name="notes" defaultValue={activity?.notes ?? ''} rows={6} /><InputError message={errors.notes} /></div><Button disabled={processing}>{processing ? 'Saving…' : 'Save activity'}</Button></>}
    </Form>
  );
}
