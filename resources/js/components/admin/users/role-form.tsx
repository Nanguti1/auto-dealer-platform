import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface Permission {
  id: number;
  name: string;
  display_name: string;
  module: string;
}

interface Role {
  id?: number;
  name?: string;
  display_name?: string;
  description?: string;
  is_system?: boolean;
  permissions?: Permission[];
}

interface RoleFormProps {
  role?: Role;
  permissions?: Permission[];
  action: string;
  method?: 'post' | 'put';
}

export default function RoleForm({ role, permissions = [], action, method = 'post' }: RoleFormProps) {
  const rolePermissions = role?.permissions?.map((p) => p.id) || [];

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }

    acc[permission.module].push(permission);

    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <Form action={action} method="post" className="space-y-6">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={role?.name ?? ''} disabled={role?.is_system} />
              <InputError message={errors.name} />
              {role?.is_system && <p className="text-xs text-muted-foreground">System roles cannot be renamed</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input id="display_name" name="display_name" defaultValue={role?.display_name ?? ''} />
              <InputError message={errors.display_name} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={role?.description ?? ''} rows={3} />
              <InputError message={errors.description} />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="space-y-2">
              <Label>Permissions</Label>
              {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                <div key={module} className="space-y-2">
                  <h4 className="font-semibold text-sm capitalize">{module}</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {modulePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permission-${permission.id}`}
                          name="permissions[]"
                          value={permission.id}
                          defaultChecked={rolePermissions.includes(permission.id)}
                        />
                        <Label htmlFor={`permission-${permission.id}`} className="font-normal cursor-pointer">
                          {permission.display_name || permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <InputError message={errors.permissions} />
            </div>
          </div>

          <Button type="submit" disabled={processing}>
            <Save className="mr-2 size-4" />
            {processing ? 'Saving…' : 'Save role'}
          </Button>
        </>
      )}
    </Form>
  );
}
