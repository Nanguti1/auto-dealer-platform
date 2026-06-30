import * as React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Mail, Phone, Building2, Users, Car, BadgeCheck, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import branches from '@/routes/admin/branches';

interface BranchUser {
  id: number;
  name: string;
  email: string;
}

interface BranchVehicle {
  id: number;
  title: string;
  stock_number: string;
  year: number;
}

interface Branch {
  id: number;
  name: string;
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
  created_at: string;
  users?: BranchUser[];
  vehicles?: BranchVehicle[];
}

export default function Show({ branch }: { branch: Branch }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{branch.name}</h1>
          <p className="text-muted-foreground">Branch code: {branch.code}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={branches.index.url()}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Branches
            </Link>
          </Button>
          <Button asChild>
            <Link href={branches.edit.url(branch.id)}>
              Edit Branch
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-lg">{branch.address_line_1}</p>
              {branch.address_line_2 && <p className="text-sm">{branch.address_line_2}</p>}
              <p className="text-sm">
                {branch.city}, {branch.state} {branch.postal_code}
              </p>
              <p className="text-sm">{branch.country}</p>
            </div>
            {branch.latitude && branch.longitude && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                <p className="text-sm font-mono">
                  {branch.latitude}, {branch.longitude}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{branch.email ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{branch.phone ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {branch.is_active ? (
                <BadgeCheck className="size-4 text-green-600" />
              ) : (
                <XCircle className="size-4 text-destructive" />
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={branch.is_active ? 'default' : 'secondary'}>
                  {branch.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          {branch.users && branch.users.length > 0 ? (
            <div className="space-y-2">
              {branch.users.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/users/${user.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No staff assigned to this branch.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="size-5" />
            Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {branch.vehicles && branch.vehicles.length > 0 ? (
            <div className="space-y-2">
              {branch.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{vehicle.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.year} • Stock: {vehicle.stock_number}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/vehicles/${vehicle.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No vehicles at this branch.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
