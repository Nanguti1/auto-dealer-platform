import { Link } from '@inertiajs/react';
import { ArrowLeft, Shield, Users, Lock } from 'lucide-react';
import * as React from 'react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Permission {
  id: number;
  name: string;
  display_name: string;
  module: string;
}

interface Role {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  is_system: boolean;
  permissions?: Permission[];
  created_at: string;
  updated_at: string;
}

export default function Show({ role }: { role: Role }) {
  const groupedPermissions = role.permissions?.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }

    acc[permission.module].push(permission);

    return acc;
  }, {} as Record<string, Permission[]>) || {};

  return (
    <CmsShell
      title={role.display_name || role.name}
      description="View role details and assigned permissions."
      actions={
        <>
          <CmsBackButton />
          {!role.is_system && (
            <Button asChild>
              <Link href={`/admin/roles/${role.id}/edit`}>Edit Role</Link>
            </Button>
          )}
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              Role Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Display Name</p>
              <p className="text-lg font-semibold">{role.display_name || '—'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Technical Name</p>
              <p className="font-mono text-sm">{role.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p>{role.description || '—'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <Badge variant={role.is_system ? 'default' : 'secondary'}>
                {role.is_system ? 'System Role' : 'Custom Role'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Permissions</p>
                <p className="text-lg font-semibold">{role.permissions?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(groupedPermissions).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([module, permissions]) => (
                  <div key={module}>
                    <h4 className="mb-2 font-semibold capitalize">{module}</h4>
                    <div className="flex flex-wrap gap-2">
                      {permissions.map((permission) => (
                        <Badge key={permission.id} variant="outline" className="text-sm">
                          {permission.display_name || permission.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No permissions assigned to this role</p>
            )}
          </CardContent>
        </Card>
      </div>
    </CmsShell>
  );
}
