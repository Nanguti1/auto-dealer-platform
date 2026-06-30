import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CrmTask } from './types';

export default function TaskForm({ task, action, leadId }: { task?: CrmTask; action: string; leadId?: number }) {
  return (
    <Form action={action} method="post" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => <><input type="hidden" name="_method" value={task ? 'put' : 'post'} />{leadId ? <input type="hidden" name="lead_id" value={leadId} /> : null}<div className="space-y-2"><Label>Title</Label><Input name="title" defaultValue={task?.title ?? ''} /><InputError message={errors.title} /></div><div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue={task?.status ?? 'open'} /><InputError message={errors.status} /></div><div className="space-y-2"><Label>Priority</Label><Input name="priority" defaultValue={task?.priority ?? 'normal'} /><InputError message={errors.priority} /></div><div className="space-y-2"><Label>Due date</Label><Input name="due_at" type="datetime-local" defaultValue={task?.due_at ?? ''} /><InputError message={errors.due_at} /></div><div className="space-y-2"><Label>Assigned user ID</Label><Input name="assigned_user_id" type="number" defaultValue={String(task?.assigned_user_id ?? '')} /><InputError message={errors.assigned_user_id} /></div></div><div className="space-y-2"><Label>Description</Label><Textarea name="description" defaultValue={task?.description ?? ''} rows={6} /><InputError message={errors.description} /></div><Button disabled={processing}>{processing ? 'Saving…' : 'Save task'}</Button></>}
    </Form>
  );
}
