import { Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Building2, Shield, Calendar } from 'lucide-react';
import * as React from 'react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Role {
  id: number;
  name: string;
  display_name: string;
}

interface Permission {
  id: number;
  name: string;
  display_name: string;
  module: string;
}

interface Branch {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  roles?: Role[];
  permissions?: Permission[];
  branch?: Branch;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export default function Show({ user }: { user: User }) {
  return (
    <CmsShell
      title={user.name || 'User Details'}
      description="View user information and permissions."
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/users/${user.id}/edit`}>Edit User</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{user.name || '—'}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{user.email || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{user.phone || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Branch</p>
                <p>{user.branch?.name || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
                <Badge variant={user.email_verified_at ? 'default' : 'secondary'}>
                  {user.email_verified_at ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
          </CardHeader>
          <CardContent>
            {user.roles && user.roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.roles.map((role) => (
                  <Badge key={role.id} variant="secondary" className="text-sm">
                    {role.display_name || role.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No roles assigned</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            {user.permissions && user.permissions.length > 0 ? (
              <div className="space-y-2">
                {user.permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{permission.display_name || permission.name}</p>
                      <p className="text-sm text-muted-foreground">{permission.module}</p>
                    </div>
                    <Badge variant="outline">{permission.name}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No direct permissions assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
    </CmsShell>
  );
}
