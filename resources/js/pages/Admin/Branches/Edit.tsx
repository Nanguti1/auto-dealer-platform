import * as React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import branches from '@/routes/admin/branches';

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
  const { data, setData, put, processing, errors } = useForm({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(branches.update.url(branch.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Branch</h1>
          <p className="text-muted-foreground">Update branch information for {branch.name}.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={branches.show.url(branch.id)}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Branch
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Branch Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Main Street Location"
                    required
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Branch Code *</Label>
                  <Input
                    id="code"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                    placeholder="MAIN"
                    required
                  />
                  {errors.code && <p className="text-sm text-destructive">{errors.code}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={data.slug}
                  onChange={(e) => setData('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="main-street-location"
                  required
                />
                {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={data.is_active}
                  onCheckedChange={(checked) => setData('is_active', checked)}
                />
                <Label htmlFor="is_active">Active Branch</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="branch@example.com"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address_line_1">Address Line 1 *</Label>
                <Input
                  id="address_line_1"
                  value={data.address_line_1}
                  onChange={(e) => setData('address_line_1', e.target.value)}
                  placeholder="123 Main Street"
                  required
                />
                {errors.address_line_1 && <p className="text-sm text-destructive">{errors.address_line_1}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_line_2">Address Line 2</Label>
                <Input
                  id="address_line_2"
                  value={data.address_line_2}
                  onChange={(e) => setData('address_line_2', e.target.value)}
                  placeholder="Suite 100"
                />
                {errors.address_line_2 && <p className="text-sm text-destructive">{errors.address_line_2}</p>}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    placeholder="New York"
                    required
                  />
                  {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={data.state}
                    onChange={(e) => setData('state', e.target.value)}
                    placeholder="NY"
                    required
                  />
                  {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    value={data.postal_code}
                    onChange={(e) => setData('postal_code', e.target.value)}
                    placeholder="10001"
                  />
                  {errors.postal_code && <p className="text-sm text-destructive">{errors.postal_code}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={data.country}
                    onChange={(e) => setData('country', e.target.value)}
                    placeholder="US"
                    required
                  />
                  {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0000001"
                    value={data.latitude}
                    onChange={(e) => setData('latitude', e.target.value)}
                    placeholder="40.7128"
                  />
                  {errors.latitude && <p className="text-sm text-destructive">{errors.latitude}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0000001"
                    value={data.longitude}
                    onChange={(e) => setData('longitude', e.target.value)}
                    placeholder="-74.0060"
                  />
                  {errors.longitude && <p className="text-sm text-destructive">{errors.longitude}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href={branches.show.url(branch.id)}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={processing}>
            {processing ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
