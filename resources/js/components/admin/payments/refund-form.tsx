import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Refund } from './types';

export default function RefundForm({ refund, action }: { refund?: Refund; action: string }) {
  return (
    <Form action={action} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={refund ? 'put' : 'post'} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="payment_id">Payment ID</Label>
              <Input id="payment_id" name="payment_id" type="number" defaultValue={String(refund?.payment_id ?? '')} />
              <InputError message={errors.payment_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Refund amount</Label>
              <Input id="amount" name="amount" type="number" step="0.01" defaultValue={refund?.amount ?? ''} />
              <InputError message={errors.amount} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" name="currency" defaultValue={refund?.currency ?? 'USD'} />
              <InputError message={errors.currency} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refund_method">Refund method</Label>
              <Input id="refund_method" name="refund_method" defaultValue={refund?.refund_method ?? ''} />
              <InputError message={errors.refund_method} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" defaultValue={refund?.status ?? 'pending'} />
              <InputError message={errors.status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="processed_at">Processed date</Label>
              <Input id="processed_at" name="processed_at" type="datetime-local" defaultValue={refund?.processed_at ? new Date(refund.processed_at).toISOString().slice(0, 16) : ''} />
              <InputError message={errors.processed_at} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for refund</Label>
            <Textarea id="reason" name="reason" rows={4} defaultValue={refund?.reason ?? ''} />
            <InputError message={errors.reason} />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save refund'}</Button>
        </>
      )}
    </Form>
  );
}
