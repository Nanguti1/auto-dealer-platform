import { useForm } from '@inertiajs/react';
import * as React from 'react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { CustomerRecord } from './types';

export default function CustomerForm({ customer, action, method = 'post' }: { customer: CustomerRecord; action: string; method?: 'post' | 'put' }) {
  const { data, setData, processing, errors, post, put } = useForm({
    first_name: customer.first_name ?? '',
    last_name: customer.last_name ?? '',
    date_of_birth: customer.date_of_birth ?? '',
    customer_number: customer.customer_number ?? '',
    email: customer.email ?? '',
    phone: customer.phone ?? '',
    'address[line1]': customer.address?.line1 ?? '',
    'address[line2]': customer.address?.line2 ?? '',
    'address[city]': customer.address?.city ?? '',
    'address[state]': customer.address?.state ?? '',
    'address[postal_code]': customer.address?.postal_code ?? '',
    'address[country]': customer.address?.country ?? '',
    'preferences[preferred_contact_method]': customer.preferences?.preferred_contact_method ?? '',
    'preferences[vehicle_interest]': customer.preferences?.vehicle_interest ?? '',
    'preferences[email_marketing]': Boolean(customer.preferences?.email_marketing),
    'preferences[sms_updates]': Boolean(customer.preferences?.sms_updates),
    status: customer.status ?? 'active',
    'preferences[lifecycle_stage]': customer.preferences?.lifecycle_stage ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'put') {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="personal">
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="status">Account Status</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="first_name"
            label="First name"
            value={data.first_name}
            onChange={(value) => setData('first_name', value)}
            error={errors.first_name}
          />
          <FormField
            name="last_name"
            label="Last name"
            value={data.last_name}
            onChange={(value) => setData('last_name', value)}
            error={errors.last_name}
          />
          <FormField
            name="date_of_birth"
            label="Date of birth"
            type="date"
            value={data.date_of_birth}
            onChange={(value) => setData('date_of_birth', value)}
            error={errors.date_of_birth}
          />
          <FormField
            name="customer_number"
            label="Customer number"
            value={data.customer_number}
            onChange={(value) => setData('customer_number', value)}
            error={errors.customer_number}
          />
        </TabsContent>
        <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="email"
            label="Email"
            type="email"
            value={data.email}
            onChange={(value) => setData('email', value)}
            error={errors.email}
          />
          <FormField
            name="phone"
            label="Phone"
            value={data.phone}
            onChange={(value) => setData('phone', value)}
            error={errors.phone}
          />
        </TabsContent>
        <TabsContent value="address" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="address[line1]"
            label="Address line 1"
            value={data['address[line1]']}
            onChange={(value) => setData('address[line1]', value)}
            error={errors['address[line1]']}
          />
          <FormField
            name="address[line2]"
            label="Address line 2"
            value={data['address[line2]']}
            onChange={(value) => setData('address[line2]', value)}
            error={errors['address[line2]']}
          />
          <FormField
            name="address[city]"
            label="City"
            value={data['address[city]']}
            onChange={(value) => setData('address[city]', value)}
            error={errors['address[city]']}
          />
          <FormField
            name="address[state]"
            label="State"
            value={data['address[state]']}
            onChange={(value) => setData('address[state]', value)}
            error={errors['address[state]']}
          />
          <FormField
            name="address[postal_code]"
            label="Postal code"
            value={data['address[postal_code]']}
            onChange={(value) => setData('address[postal_code]', value)}
            error={errors['address[postal_code]']}
          />
          <FormField
            name="address[country]"
            label="Country"
            value={data['address[country]']}
            onChange={(value) => setData('address[country]', value)}
            error={errors['address[country]']}
          />
        </TabsContent>
        <TabsContent value="preferences" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="preferences[preferred_contact_method]"
            label="Preferred contact method"
            value={data['preferences[preferred_contact_method]']}
            onChange={(value) => setData('preferences[preferred_contact_method]', value)}
            error={errors['preferences[preferred_contact_method]']}
          />
          <FormField
            name="preferences[vehicle_interest]"
            label="Vehicle interest"
            value={data['preferences[vehicle_interest]']}
            onChange={(value) => setData('preferences[vehicle_interest]', value)}
            error={errors['preferences[vehicle_interest]']}
          />
          <FormField
            name="preferences[email_marketing]"
            label="Email marketing"
            type="switch"
            value={data['preferences[email_marketing]']}
            onChange={(value) => setData('preferences[email_marketing]', value)}
            error={errors['preferences[email_marketing]']}
          />
          <FormField
            name="preferences[sms_updates]"
            label="SMS updates"
            type="switch"
            value={data['preferences[sms_updates]']}
            onChange={(value) => setData('preferences[sms_updates]', value)}
            error={errors['preferences[sms_updates]']}
          />
        </TabsContent>
        <TabsContent value="status" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="status"
            label="Account status"
            value={data.status}
            onChange={(value) => setData('status', value)}
            error={errors.status}
          />
          <FormField
            name="preferences[lifecycle_stage]"
            label="Lifecycle stage"
            value={data['preferences[lifecycle_stage]']}
            onChange={(value) => setData('preferences[lifecycle_stage]', value)}
            error={errors['preferences[lifecycle_stage]']}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-6">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save customer'}
        </Button>
      </div>
    </form>
  );
}
