import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';
import BranchShell, { BranchBackButton } from '@/components/admin/branches/branch-shell';

interface Branch {
  id: number;
  company_id: number;
  name: string;
  slug: string;
  code: string;
  email?: string;
  phone?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
}

export default function Edit({ branch }: { branch: Branch }) {
  const { data, setData, errors } = useForm({
    company_id: branch.company_id,
    name: branch.name,
    slug: branch.slug,
    code: branch.code,
    email: branch.email || '',
    phone: branch.phone || '',
    address_line_1: branch.address_line_1,
    address_line_2: branch.address_line_2 || '',
    city: branch.city,
    state: branch.state,
    postal_code: branch.postal_code || '',
    country: branch.country,
    latitude: branch.latitude?.toString() || '',
    longitude: branch.longitude?.toString() || '',
    is_active: branch.is_active,
  });

  return (
    <BranchShell title="Edit Branch" description={`Update branch information for ${branch.name}.`} actions={<BranchBackButton href={admin.branches.show(branch.id).url} label="Back to Branch" />}>
      <FormShell
        action={admin.branches.update(branch.id).url}
        method="put"
        submitLabel="Save Changes"
        cancelLabel="Cancel"
        cancelUrl={admin.branches.show(branch.id).url}
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
    </BranchShell>
  );
}
