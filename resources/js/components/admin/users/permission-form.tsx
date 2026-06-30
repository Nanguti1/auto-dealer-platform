import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Permission {
  id?: number;
  name?: string;
  display_name?: string;
  module?: string;
  description?: string;
}

interface PermissionFormProps {
  permission?: Permission;
  action: string;
  method?: 'post' | 'put';
}

export default function PermissionForm({ permission, action, method = 'post' }: PermissionFormProps) {
  return (
    <Form action={action} method="post" className="space-y-6">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={permission?.name ?? ''} placeholder="e.g., users.view" />
              <InputError message={errors.name} />
              <p className="text-xs text-muted-foreground">Use dot notation (e.g., module.action)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input id="display_name" name="display_name" defaultValue={permission?.display_name ?? ''} placeholder="e.g., View Users" />
              <InputError message={errors.display_name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="module">Module</Label>
              <Input id="module" name="module" defaultValue={permission?.module ?? ''} placeholder="e.g., users" />
              <InputError message={errors.module} />
              <p className="text-xs text-muted-foreground">The module this permission belongs to</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={permission?.description ?? ''} rows={3} placeholder="Describe what this permission allows..." />
              <InputError message={errors.description} />
            </div>
          </div>

          <Button type="submit" disabled={processing}>
            <Save className="mr-2 size-4" />
            {processing ? 'Saving…' : 'Save permission'}
          </Button>
        </>
      )}
    </Form>
  );
}
