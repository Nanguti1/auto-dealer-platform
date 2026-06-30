import * as React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { useForm } from '@inertiajs/react';
import branches from '@/routes/admin/branches';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    company_id: 1,
    name: '',
    slug: '',
    code: '',
    email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    latitude: '',
    longitude: '',
    is_active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(branches.store.url());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Branch</h1>
          <p className="text-muted-foreground">Add a new branch location to your dealership.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={branches.index.url()}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Branches
          </Link>
        </Button>
      </div>

      <FormShell
        action={branches.store.url()}
        method="post"
        submitLabel="Create Branch"
        cancelLabel="Cancel"
        cancelUrl={branches.index.url()}
        className="grid gap-6 md:grid-cols-2"
      >
        <FormSection title="Basic Information" className="md:col-span-2" gridCols={2}>
          <FormField
            name="name"
            label="Branch Name"
            value={data.name}
            error={errors.name}
            placeholder="Main Street Location"
            required
            onChange={(value) => setData('name', value)}
          />
          <FormField
            name="code"
            label="Branch Code"
            value={data.code}
            error={errors.code}
            placeholder="MAIN"
            required
            onChange={(value) => setData('code', value.toUpperCase())}
          />
          <FormField
            name="slug"
            label="Slug"
            value={data.slug}
            error={errors.slug}
            placeholder="main-street-location"
            required
            onChange={(value) => setData('slug', value.toLowerCase().replace(/\s+/g, '-'))}
            className="md:col-span-2"
          />
          <FormField
            name="is_active"
            label="Active Branch"
            type="switch"
            value={data.is_active}
            onChange={(value) => setData('is_active', value)}
            className="md:col-span-2"
          />
        </FormSection>

        <FormSection title="Contact Information" gridCols={1}>
          <FormField
            name="email"
            label="Email"
            type="email"
            value={data.email}
            error={errors.email}
            placeholder="branch@example.com"
            onChange={(value) => setData('email', value)}
          />
          <FormField
            name="phone"
            label="Phone"
            type="tel"
            value={data.phone}
            error={errors.phone}
            placeholder="+1 (555) 123-4567"
            onChange={(value) => setData('phone', value)}
          />
        </FormSection>

        <FormSection title="Location" gridCols={1}>
          <FormField
            name="address_line_1"
            label="Address Line 1"
            value={data.address_line_1}
            error={errors.address_line_1}
            placeholder="123 Main Street"
            required
            onChange={(value) => setData('address_line_1', value)}
          />
          <FormField
            name="address_line_2"
            label="Address Line 2"
            value={data.address_line_2}
            error={errors.address_line_2}
            placeholder="Suite 100"
            onChange={(value) => setData('address_line_2', value)}
          />
          <FormField
            name="city"
            label="City"
            value={data.city}
            error={errors.city}
            placeholder="New York"
            required
            onChange={(value) => setData('city', value)}
          />
          <FormField
            name="state"
            label="State"
            value={data.state}
            error={errors.state}
            placeholder="NY"
            required
            onChange={(value) => setData('state', value)}
          />
          <FormField
            name="postal_code"
            label="Postal Code"
            value={data.postal_code}
            error={errors.postal_code}
            placeholder="10001"
            onChange={(value) => setData('postal_code', value)}
          />
          <FormField
            name="country"
            label="Country"
            value={data.country}
            error={errors.country}
            placeholder="US"
            required
            onChange={(value) => setData('country', value)}
          />
          <FormField
            name="latitude"
            label="Latitude"
            type="number"
            value={data.latitude}
            error={errors.latitude}
            placeholder="40.7128"
            step="0.0000001"
            onChange={(value) => setData('latitude', value)}
          />
          <FormField
            name="longitude"
            label="Longitude"
            type="number"
            value={data.longitude}
            error={errors.longitude}
            placeholder="-74.0060"
            step="0.0000001"
            onChange={(value) => setData('longitude', value)}
          />
        </FormSection>
      </FormShell>
    </div>
  );
}
