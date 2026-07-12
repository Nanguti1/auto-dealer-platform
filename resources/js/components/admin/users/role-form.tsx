import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Role {
  id?: number;
  name?: string;
  display_name?: string;
  description?: string;
  is_system?: boolean;
}

interface RoleFormProps {
  role?: Role;
  action: string;
  method?: 'post' | 'put';
}

export default function RoleForm({ role, action, method = 'post' }: RoleFormProps) {
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

          <Button type="submit" disabled={processing}>
            <Save className="mr-2 size-4" />
            {processing ? 'Saving…' : 'Save role'}
          </Button>
        </>
      )}
    </Form>
  );
}
