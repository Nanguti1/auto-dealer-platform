import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Payment } from './types';

export default function PaymentForm({ payment, action }: { payment?: Payment; action: string }) {
  return (
    <Form action={action} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={payment ? 'put' : 'post'} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="user_id">Customer ID</Label>
              <Input id="user_id" name="user_id" type="number" defaultValue={String(payment?.user_id ?? '')} />
              <InputError message={errors.user_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle_id">Vehicle ID</Label>
              <Input id="vehicle_id" name="vehicle_id" type="number" defaultValue={String(payment?.vehicle_id ?? '')} />
              <InputError message={errors.vehicle_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle_reservation_id">Reservation ID</Label>
              <Input id="vehicle_reservation_id" name="vehicle_reservation_id" type="number" defaultValue={String(payment?.vehicle_reservation_id ?? '')} />
              <InputError message={errors.vehicle_reservation_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="number" step="0.01" defaultValue={payment?.amount ?? ''} />
              <InputError message={errors.amount} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" name="currency" defaultValue={payment?.currency ?? 'USD'} />
              <InputError message={errors.currency} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Payment method</Label>
              <Input id="method" name="method" defaultValue={payment?.method ?? ''} />
              <InputError message={errors.method} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" defaultValue={payment?.status ?? 'pending'} />
              <InputError message={errors.status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transaction_reference">Transaction reference</Label>
              <Input id="transaction_reference" name="transaction_reference" defaultValue={payment?.transaction_reference ?? ''} />
              <InputError message={errors.transaction_reference} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paid_at">Payment date</Label>
              <Input id="paid_at" name="paid_at" type="datetime-local" defaultValue={payment?.paid_at ? new Date(payment.paid_at).toISOString().slice(0, 16) : ''} />
              <InputError message={errors.paid_at} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON)</Label>
            <Textarea id="metadata" name="metadata" rows={6} defaultValue={JSON.stringify(payment?.metadata ?? {}, null, 2)} />
            <InputError message={errors.metadata} />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save payment'}</Button>
        </>
      )}
    </Form>
  );
}
