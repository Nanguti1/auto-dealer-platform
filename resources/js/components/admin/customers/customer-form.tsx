import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CustomerRecord } from './types';

export default function CustomerForm({ customer, action, method = 'post' }: { customer: CustomerRecord; action: string; method?: 'post' | 'put' }) {
  const preferences = customer.preferences ?? {};

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save customer"
      className="space-y-6"
    >
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
            value={customer.first_name ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="last_name"
            label="Last name"
            value={customer.last_name ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="date_of_birth"
            label="Date of birth"
            type="date"
            value={customer.date_of_birth ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="customer_number"
            label="Customer number"
            value={customer.customer_number ?? ''}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="email"
            label="Email"
            type="email"
            value={customer.email ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="phone"
            label="Phone"
            value={customer.phone ?? ''}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="address" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="address[line1]"
            label="Address line 1"
            value={customer.address?.line1 ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="address[line2]"
            label="Address line 2"
            value={customer.address?.line2 ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="address[city]"
            label="City"
            value={customer.address?.city ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="address[state]"
            label="State"
            value={customer.address?.state ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="address[postal_code]"
            label="Postal code"
            value={customer.address?.postal_code ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="address[country]"
            label="Country"
            value={customer.address?.country ?? ''}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="preferences" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="preferences[preferred_contact_method]"
            label="Preferred contact method"
            value={preferences.preferred_contact_method ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="preferences[vehicle_interest]"
            label="Vehicle interest"
            value={preferences.vehicle_interest ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="preferences[email_marketing]"
            label="Email marketing"
            type="switch"
            value={Boolean(preferences.email_marketing)}
            onChange={() => {}}
          />
          <FormField
            name="preferences[sms_updates]"
            label="SMS updates"
            type="switch"
            value={Boolean(preferences.sms_updates)}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="status" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="status"
            label="Account status"
            value={customer.status ?? 'active'}
            onChange={() => {}}
          />
          <FormField
            name="preferences[lifecycle_stage]"
            label="Lifecycle stage"
            value={preferences.lifecycle_stage ?? ''}
            onChange={() => {}}
          />
        </TabsContent>
      </Tabs>
    </FormShell>
  );
}
