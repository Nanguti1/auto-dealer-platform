import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ReservationRecord } from './types';

function Field({ name, label, value, type = 'text', error, required = false }: { name: string; label: string; value?: string | number | null; type?: string; error?: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label} {required && <span className="text-destructive">*</span>}</Label>
      <Input id={name} name={name} type={type} defaultValue={String(value ?? '')} required={required} />
      <InputError message={error} />
    </div>
  );
}

export default function ReservationForm({ reservation, action, method = 'post' }: { reservation?: ReservationRecord; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method="post" className="space-y-6">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={method} />
          
          <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
            <Field name="vehicle_id" label="Vehicle ID" type="number" value={reservation?.vehicle_id} error={errors.vehicle_id} required />
            <Field name="user_id" label="User ID" type="number" value={reservation?.user_id} error={errors.user_id} required />
            <Field name="deposit_amount" label="Deposit Amount" type="number" step="0.01" value={reservation?.deposit_amount} error={errors.deposit_amount} />
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={reservation?.status ?? 'pending'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.status} />
            </div>
            <Field name="expires_at" label="Expires At" type="datetime-local" value={reservation?.expires_at} error={errors.expires_at} />
          </div>

          <Button disabled={processing}>
            <Save className="mr-2 size-4" />
            {processing ? 'Saving…' : 'Save reservation'}
          </Button>
        </>
      )}
    </Form>
  );
}