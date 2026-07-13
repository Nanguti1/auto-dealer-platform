import * as React from 'react';
import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Role {
  id: number;
  name: string;
  display_name: string;
}

interface Branch {
  id: number;
  name: string;
}

interface User {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  branch_id?: number;
  roles?: Role[];
  branch?: Branch;
  preferences?: Record<string, any>;
}

interface UserFormProps {
  user?: User;
  roles?: Role[];
  branches?: Branch[];
  action: string;
  method?: 'post' | 'put';
}

export default function UserForm({ user, roles = [], branches = [], action, method = 'post' }: UserFormProps) {
  const userRoles = user?.roles?.map((r) => r.id) || [];

  const [formData, setFormData] = React.useState({
    name: user?.name ?? '',
    password: '',
    password_confirmation: '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    branch_id: String(user?.branch_id ?? ''),
    roles: userRoles,
    preferences_timezone: user?.preferences?.timezone ?? '',
    preferences_language: user?.preferences?.language ?? 'en',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (roleId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      roles: checked
        ? [...prev.roles, roleId]
        : prev.roles.filter(id => id !== roleId)
    }));
  };

  return (
    <Form action={action} method="post" className="space-y-6">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <Tabs defaultValue="personal">
            <TabsList className="flex h-auto w-full flex-wrap justify-start">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="contact">Contact Information</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <InputError message={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password{method === 'put' ? ' (leave blank to keep current)' : ''}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <InputError message={errors.password} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Password Confirmation</Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                />
                <InputError message={errors.password_confirmation} />
              </div>
            </TabsContent>
            <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <InputError message={errors.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <InputError message={errors.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch_id">Branch</Label>
                <select
                  id="branch_id"
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={(e) => handleInputChange('branch_id', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="">Select branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                <InputError message={errors.branch_id} />
              </div>
            </TabsContent>
            <TabsContent value="roles" className="grid gap-4 rounded-xl border bg-card p-4">
              <div className="space-y-2">
                <Label>Roles</Label>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role.id}`}
                        checked={formData.roles.includes(role.id)}
                        onCheckedChange={(checked) => handleRoleChange(role.id, checked === true)}
                      />
                      <Label htmlFor={`role-${role.id}`} className="font-normal">
                        {role.display_name || role.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <InputError message={errors.roles} />
              </div>
              {/* Hidden inputs to ensure roles are submitted */}
              {formData.roles.map((roleId) => (
                <input key={roleId} type="hidden" name="roles[]" value={roleId} />
              ))}
            </TabsContent>
            <TabsContent value="preferences" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferences[timezone]">Timezone</Label>
                <Input
                  id="preferences[timezone]"
                  name="preferences[timezone]"
                  value={formData.preferences_timezone}
                  onChange={(e) => handleInputChange('preferences_timezone', e.target.value)}
                />
                <InputError message={errors['preferences.timezone']} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferences[language]">Language</Label>
                <Input
                  id="preferences[language]"
                  name="preferences[language]"
                  value={formData.preferences_language}
                  onChange={(e) => handleInputChange('preferences_language', e.target.value)}
                />
                <InputError message={errors['preferences.language']} />
              </div>
            </TabsContent>
          </Tabs>
          <Button type="submit" disabled={processing}>
            <Save className="mr-2 size-4" />
            {processing ? 'Saving…' : 'Save user'}
          </Button>
        </>
      )}
    </Form>
  );
}
