import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { previewValue } from './helpers';
import type { AdminSetting } from './types';

export default function SettingForm({ setting, action, method = 'post' }: { setting?: AdminSetting; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Input id="group" name="group" defaultValue={setting?.group ?? ''} placeholder="general" />
              <InputError message={errors.group} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Input id="key" name="key" defaultValue={setting?.key ?? ''} placeholder="site_name" />
              <InputError message={errors.key} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue={setting?.type ?? 'string'}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.type} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <Label htmlFor="is_public">Public setting</Label>
                <p className="text-sm text-muted-foreground">Expose this setting to public-facing consumers.</p>
              </div>
              <Switch id="is_public" name="is_public" defaultChecked={setting?.is_public ?? false} value="1" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Textarea id="value" name="value" rows={6} defaultValue={previewValue(setting?.value, 10000) === '—' ? '' : previewValue(setting?.value, 10000)} />
            <InputError message={errors.value} />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save setting'}</Button>
        </>
      )}
    </Form>
  );
}
