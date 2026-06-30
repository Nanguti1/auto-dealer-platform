import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { CustomerNote } from './types';

export default function NoteForm({ note, action, customerId }: { note?: CustomerNote; action: string; customerId?: number }) {
  return (
    <Form action={action} method="post" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={note ? 'put' : 'post'} />
          {customerId ? <input type="hidden" name="customer_id" value={customerId} /> : null}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={note?.title ?? ''} />
            <InputError message={errors.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" defaultValue={note?.type ?? 'general'} />
            <InputError message={errors.type} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Note</Label>
            <Textarea id="body" name="body" defaultValue={note?.body ?? note?.note ?? ''} rows={8} />
            <InputError message={errors.body ?? errors.note} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label>Pin note</Label>
            <Switch name="is_pinned" value="1" defaultChecked={Boolean(note?.is_pinned)} />
          </div>
          <Button disabled={processing}>{processing ? 'Saving…' : 'Save note'}</Button>
        </>
      )}
    </Form>
  );
}
