import { useForm } from '@inertiajs/react';
import * as React from 'react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { SupplierRecord } from './types';

export default function SupplierForm({ supplier, action, method = 'post' }: { supplier: SupplierRecord; action: string; method?: 'post' | 'put' }) {
  const { data, setData, processing, errors, post, put } = useForm({
    company_name: supplier.company_name ?? '',
    supplier_code: supplier.supplier_code ?? '',
    contact_person: supplier.contact_person ?? '',
    supplier_type: supplier.supplier_type ?? 'other',
    email: supplier.email ?? '',
    phone: supplier.phone ?? '',
    alternative_phone: supplier.alternative_phone ?? '',
    website: supplier.website ?? '',
    country: supplier.country ?? '',
    county: supplier.county ?? '',
    city: supplier.city ?? '',
    postal_code: supplier.postal_code ?? '',
    physical_address: supplier.physical_address ?? '',
    tax_pin: supplier.tax_pin ?? '',
    registration_number: supplier.registration_number ?? '',
    payment_terms: supplier.payment_terms ?? '',
    currency: supplier.currency ?? 'USD',
    credit_limit: String(supplier.credit_limit ?? 0),
    status: supplier.status ?? 'active',
    notes: supplier.notes ?? '',
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
      <Tabs defaultValue="basic">
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="business">Business Information</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="company_name"
            label="Company Name"
            value={data.company_name}
            onChange={(value) => setData('company_name', value)}
            error={errors.company_name}
            required
          />
          <FormField
            name="supplier_code"
            label="Supplier Code"
            value={data.supplier_code}
            onChange={(value) => setData('supplier_code', value)}
            disabled
          />
          <FormField
            name="contact_person"
            label="Contact Person"
            value={data.contact_person}
            onChange={(value) => setData('contact_person', value)}
            error={errors.contact_person}
          />
          <FormField
            name="supplier_type"
            label="Supplier Type"
            type="select"
            value={data.supplier_type}
            onChange={(value) => setData('supplier_type', value)}
            error={errors.supplier_type}
            options={[
              { value: 'vehicle_dealer', label: 'Vehicle Dealer' },
              { value: 'vehicle_manufacturer', label: 'Vehicle Manufacturer' },
              { value: 'spare_parts_supplier', label: 'Spare Parts Supplier' },
              { value: 'accessories_supplier', label: 'Accessories Supplier' },
              { value: 'auction_house', label: 'Auction House' },
              { value: 'individual', label: 'Individual' },
              { value: 'other', label: 'Other' },
            ]}
            required
          />
          <FormField
            name="status"
            label="Status"
            type="select"
            value={data.status}
            onChange={(value) => setData('status', value)}
            error={errors.status}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'blacklisted', label: 'Blacklisted' },
            ]}
            required
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
            label="Phone Number"
            value={data.phone}
            onChange={(value) => setData('phone', value)}
            error={errors.phone}
          />
          <FormField
            name="alternative_phone"
            label="Alternative Phone"
            value={data.alternative_phone}
            onChange={(value) => setData('alternative_phone', value)}
            error={errors.alternative_phone}
          />
          <FormField
            name="website"
            label="Website"
            type="url"
            value={data.website}
            onChange={(value) => setData('website', value)}
            error={errors.website}
          />
        </TabsContent>

        <TabsContent value="address" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="country"
            label="Country"
            value={data.country}
            onChange={(value) => setData('country', value)}
            error={errors.country}
          />
          <FormField
            name="county"
            label="County / State"
            value={data.county}
            onChange={(value) => setData('county', value)}
            error={errors.county}
          />
          <FormField
            name="city"
            label="City"
            value={data.city}
            onChange={(value) => setData('city', value)}
            error={errors.city}
          />
          <FormField
            name="postal_code"
            label="Postal Code"
            value={data.postal_code}
            onChange={(value) => setData('postal_code', value)}
            error={errors.postal_code}
          />
          <FormField
            name="physical_address"
            label="Physical Address"
            type="textarea"
            value={data.physical_address}
            onChange={(value) => setData('physical_address', value)}
            error={errors.physical_address}
            className="md:col-span-2"
          />
        </TabsContent>

        <TabsContent value="business" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="tax_pin"
            label="Tax PIN / VAT Number"
            value={data.tax_pin}
            onChange={(value) => setData('tax_pin', value)}
            error={errors.tax_pin}
          />
          <FormField
            name="registration_number"
            label="Registration Number"
            value={data.registration_number}
            onChange={(value) => setData('registration_number', value)}
            error={errors.registration_number}
          />
          <FormField
            name="payment_terms"
            label="Payment Terms"
            value={data.payment_terms}
            onChange={(value) => setData('payment_terms', value)}
            error={errors.payment_terms}
          />
          <FormField
            name="currency"
            label="Currency"
            value={data.currency}
            onChange={(value) => setData('currency', value)}
            error={errors.currency}
          />
          <FormField
            name="credit_limit"
            label="Credit Limit"
            type="number"
            value={data.credit_limit}
            onChange={(value) => setData('credit_limit', value)}
            error={errors.credit_limit}
            step="0.01"
          />
        </TabsContent>

        <TabsContent value="notes" className="grid gap-4 rounded-xl border bg-card p-4">
          <FormField
            name="notes"
            label="Internal Notes"
            type="textarea"
            value={data.notes}
            onChange={(value) => setData('notes', value)}
            error={errors.notes}
            className="md:col-span-2"
            rows={5}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-6">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save supplier'}
        </Button>
      </div>
    </form>
  );
}
