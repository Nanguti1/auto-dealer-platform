import { Link } from '@inertiajs/react';
import { ArrowLeft, Lock, Shield } from 'lucide-react';
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
  description?: string;
  roles?: Role[];
  created_at: string;
  updated_at: string;
}

export default function Show({ permission }: { permission: Permission }) {
  return (
    <CmsShell
      title={permission.display_name || permission.name}
      description="View permission details and role assignments."
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/permissions/${permission.id}/edit`}>Edit Permission</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="size-5" />
              Permission Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Display Name</p>
              <p className="text-lg font-semibold">{permission.display_name || '—'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Technical Name</p>
              <p className="font-mono text-sm">{permission.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Module</p>
              <Badge variant="outline">{permission.module}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p>{permission.description || '—'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned to Roles</p>
                <p className="text-lg font-semibold">{permission.roles?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assigned Roles</CardTitle>
          </CardHeader>
          <CardContent>
            {permission.roles && permission.roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {permission.roles.map((role) => (
                  <Badge key={role.id} variant="secondary" className="text-sm">
                    {role.display_name || role.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">This permission is not assigned to any roles</p>
            )}
          </CardContent>
        </Card>
      </div>
    </CmsShell>
  );
}
