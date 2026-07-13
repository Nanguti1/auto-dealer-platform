import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { previewValue } from './helpers';
import type { AdminSetting } from './types';

const typeOptions = [
  { value: 'string', label: 'String' },
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'json', label: 'JSON' },
];

export default function SettingForm({ setting, action, method = 'post', cancelUrl }: { setting?: AdminSetting; action: string; method?: 'post' | 'put'; cancelUrl?: string }) {
  const { data, setData, post, put, processing, errors } = useForm({
    group: setting?.group ?? '',
    key: setting?.key ?? '',
    type: setting?.type ?? 'string',
    is_public: setting?.is_public ?? false,
    value: previewValue(setting?.value, 10000) === '—' ? '' : previewValue(setting?.value, 10000),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'post') {
      post(action);
    } else {
      put(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {(method === 'put' || method === 'patch') && (
        <input type="hidden" name="_method" value={method} />
      )}

      <FormSection title="Identification" gridCols={2}>
        <FormField
          name="group"
          label="Group"
          value={data.group}
          error={errors.group}
          placeholder="general"
          onChange={(value) => setData('group', value)}
        />
        <FormField
          name="key"
          label="Key"
          value={data.key}
          error={errors.key}
          placeholder="site_name"
          onChange={(value) => setData('key', value)}
        />
      </FormSection>

      <FormSection title="Configuration" gridCols={2}>
        <FormField
          name="type"
          label="Type"
          type="select"
          value={data.type}
          error={errors.type}
          options={typeOptions}
          onChange={(value) => setData('type', value)}
        />
        <FormField
          name="is_public"
          label="Public setting"
          type="switch"
          value={data.is_public}
          error={errors.is_public}
          hint="Expose this setting to public-facing consumers."
          onChange={(value) => setData('is_public', value)}
        />
      </FormSection>

      <FormSection title="Value" gridCols={1} fullWidth>
        <FormField
          name="value"
          label="Value"
          type="textarea"
          value={data.value}
          error={errors.value}
          onChange={(value) => setData('value', value)}
        />
      </FormSection>

      <div className="flex justify-end gap-4 mt-6">
        {cancelUrl && (
          <Button type="button" variant="outline" asChild>
            <a href={cancelUrl}>
              <X className="mr-2 size-4" />
              Cancel
            </a>
          </Button>
        )}
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save setting'}
        </Button>
      </div>
    </form>
  );
}
