import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CustomerRecord } from './types';

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  value?: string | number | boolean | null;
  error?: string;
}

function Field({ name, label, type = 'text', value, error }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={String(value ?? '')} />
      <InputError message={error} />
    </div>
  );
}

export default function CustomerForm({ customer, action }: { customer: CustomerRecord; action: string }) {
  const preferences = customer.preferences ?? {};

  return (
    <Form action={action} method="post" className="space-y-6">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value="put" />
          <Tabs defaultValue="personal">
            <TabsList className="flex h-auto w-full flex-wrap justify-start">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="contact">Contact Information</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="status">Account Status</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="first_name" label="First name" value={customer.first_name} error={errors.first_name} />
              <Field name="last_name" label="Last name" value={customer.last_name} error={errors.last_name} />
              <Field name="date_of_birth" label="Date of birth" type="date" value={customer.date_of_birth} error={errors.date_of_birth} />
              <Field name="customer_number" label="Customer number" value={customer.customer_number} error={errors.customer_number} />
            </TabsContent>
            <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="email" label="Email" type="email" value={customer.email} error={errors.email} />
              <Field name="phone" label="Phone" value={customer.phone} error={errors.phone} />
            </TabsContent>
            <TabsContent value="address" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="address[line1]" label="Address line 1" value={customer.address?.line1} error={errors['address.line1']} />
              <Field name="address[line2]" label="Address line 2" value={customer.address?.line2} error={errors['address.line2']} />
              <Field name="address[city]" label="City" value={customer.address?.city} error={errors['address.city']} />
              <Field name="address[state]" label="State" value={customer.address?.state} error={errors['address.state']} />
              <Field name="address[postal_code]" label="Postal code" value={customer.address?.postal_code} error={errors['address.postal_code']} />
              <Field name="address[country]" label="Country" value={customer.address?.country} error={errors['address.country']} />
            </TabsContent>
            <TabsContent value="preferences" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="preferences[preferred_contact_method]" label="Preferred contact method" value={preferences.preferred_contact_method} />
              <Field name="preferences[vehicle_interest]" label="Vehicle interest" value={preferences.vehicle_interest} />
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label>Email marketing</Label>
                <Switch name="preferences[email_marketing]" value="1" defaultChecked={Boolean(preferences.email_marketing)} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label>SMS updates</Label>
                <Switch name="preferences[sms_updates]" value="1" defaultChecked={Boolean(preferences.sms_updates)} />
              </div>
            </TabsContent>
            <TabsContent value="status" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="status" label="Account status" value={customer.status ?? 'active'} error={errors.status} />
              <Field name="preferences[lifecycle_stage]" label="Lifecycle stage" value={preferences.lifecycle_stage} />
            </TabsContent>
          </Tabs>
          <Button type="submit" disabled={processing}><Save className="mr-2 size-4" />{processing ? 'Saving…' : 'Save customer'}</Button>
        </>
      )}
    </Form>
  );
}
