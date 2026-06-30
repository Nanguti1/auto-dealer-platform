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
                <Input id="name" name="name" defaultValue={user?.name ?? ''} />
                <InputError message={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password{method === 'put' ? ' (leave blank to keep current)' : ''}</Label>
                <Input id="password" name="password" type="password" defaultValue={user?.password ?? ''} />
                <InputError message={errors.password} />
              </div>
            </TabsContent>
            <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={user?.email ?? ''} />
                <InputError message={errors.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={user?.phone ?? ''} />
                <InputError message={errors.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch_id">Branch</Label>
                <select
                  id="branch_id"
                  name="branch_id"
                  defaultValue={user?.branch_id ?? ''}
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
                        name="roles[]"
                        value={role.id}
                        defaultChecked={userRoles.includes(role.id)}
                      />
                      <Label htmlFor={`role-${role.id}`} className="font-normal">
                        {role.display_name || role.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <InputError message={errors.roles} />
              </div>
            </TabsContent>
            <TabsContent value="preferences" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferences[timezone]">Timezone</Label>
                <Input id="preferences[timezone]" name="preferences[timezone]" defaultValue={user?.preferences?.timezone ?? ''} />
                <InputError message={errors['preferences.timezone']} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferences[language]">Language</Label>
                <Input id="preferences[language]" name="preferences[language]" defaultValue={user?.preferences?.language ?? 'en'} />
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
