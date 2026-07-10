import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CustomerRecord } from './types';

export default function CustomerForm({ customer, action, method = 'post' }: { customer: CustomerRecord; action: string; method?: 'post' | 'put' }) {
  const [formData, setFormData] = React.useState<CustomerRecord>(customer);
  const preferences = formData.preferences ?? {};

  const handleChange = (field: string, value: string | boolean) => {
    // Handle nested fields like address[line1] or preferences[email_marketing]
    if (field.includes('[')) {
      const [parent, child] = field.match(/([^\[]+)\[([^\]]+)\]/)?.slice(1) || [];
      if (parent && child) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof CustomerRecord] as object || {}),
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

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
            value={formData.first_name ?? ''}
            onChange={(value) => handleChange('first_name', value)}
          />
          <FormField
            name="last_name"
            label="Last name"
            value={formData.last_name ?? ''}
            onChange={(value) => handleChange('last_name', value)}
          />
          <FormField
            name="date_of_birth"
            label="Date of birth"
            type="date"
            value={formData.date_of_birth ?? ''}
            onChange={(value) => handleChange('date_of_birth', value)}
          />
          <FormField
            name="customer_number"
            label="Customer number"
            value={formData.customer_number ?? ''}
            onChange={(value) => handleChange('customer_number', value)}
          />
        </TabsContent>
        <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="email"
            label="Email"
            type="email"
            value={formData.email ?? ''}
            onChange={(value) => handleChange('email', value)}
          />
          <FormField
            name="phone"
            label="Phone"
            value={formData.phone ?? ''}
            onChange={(value) => handleChange('phone', value)}
          />
        </TabsContent>
        <TabsContent value="address" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="address[line1]"
            label="Address line 1"
            value={formData.address?.line1 ?? ''}
            onChange={(value) => handleChange('address[line1]', value)}
          />
          <FormField
            name="address[line2]"
            label="Address line 2"
            value={formData.address?.line2 ?? ''}
            onChange={(value) => handleChange('address[line2]', value)}
          />
          <FormField
            name="address[city]"
            label="City"
            value={formData.address?.city ?? ''}
            onChange={(value) => handleChange('address[city]', value)}
          />
          <FormField
            name="address[state]"
            label="State"
            value={formData.address?.state ?? ''}
            onChange={(value) => handleChange('address[state]', value)}
          />
          <FormField
            name="address[postal_code]"
            label="Postal code"
            value={formData.address?.postal_code ?? ''}
            onChange={(value) => handleChange('address[postal_code]', value)}
          />
          <FormField
            name="address[country]"
            label="Country"
            value={formData.address?.country ?? ''}
            onChange={(value) => handleChange('address[country]', value)}
          />
        </TabsContent>
        <TabsContent value="preferences" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="preferences[preferred_contact_method]"
            label="Preferred contact method"
            value={preferences.preferred_contact_method ?? ''}
            onChange={(value) => handleChange('preferences[preferred_contact_method]', value)}
          />
          <FormField
            name="preferences[vehicle_interest]"
            label="Vehicle interest"
            value={preferences.vehicle_interest ?? ''}
            onChange={(value) => handleChange('preferences[vehicle_interest]', value)}
          />
          <FormField
            name="preferences[email_marketing]"
            label="Email marketing"
            type="switch"
            value={Boolean(preferences.email_marketing)}
            onChange={(value) => handleChange('preferences[email_marketing]', value)}
          />
          <FormField
            name="preferences[sms_updates]"
            label="SMS updates"
            type="switch"
            value={Boolean(preferences.sms_updates)}
            onChange={(value) => handleChange('preferences[sms_updates]', value)}
          />
        </TabsContent>
        <TabsContent value="status" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="status"
            label="Account status"
            value={formData.status ?? 'active'}
            onChange={(value) => handleChange('status', value)}
          />
          <FormField
            name="preferences[lifecycle_stage]"
            label="Lifecycle stage"
            value={preferences.lifecycle_stage ?? ''}
            onChange={(value) => handleChange('preferences[lifecycle_stage]', value)}
          />
        </TabsContent>
      </Tabs>
    </FormShell>
  );
}
