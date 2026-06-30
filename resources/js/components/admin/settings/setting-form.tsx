import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { previewValue } from './helpers';
import type { AdminSetting } from './types';

const typeOptions = [
  { value: 'string', label: 'String' },
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'json', label: 'JSON' },
];

export default function SettingForm({ setting, action, method = 'post' }: { setting?: AdminSetting; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save setting"
      className="max-w-3xl"
    >
      <FormSection title="Identification" gridCols={2}>
        <FormField
          name="group"
          label="Group"
          value={setting?.group ?? ''}
          placeholder="general"
          onChange={() => {}}
        />
        <FormField
          name="key"
          label="Key"
          value={setting?.key ?? ''}
          placeholder="site_name"
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Configuration" gridCols={2}>
        <FormField
          name="type"
          label="Type"
          type="select"
          value={setting?.type ?? 'string'}
          options={typeOptions}
          onChange={() => {}}
        />
        <FormField
          name="is_public"
          label="Public setting"
          type="switch"
          value={setting?.is_public ?? false}
          hint="Expose this setting to public-facing consumers."
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Value" gridCols={1} fullWidth>
        <FormField
          name="value"
          label="Value"
          type="textarea"
          value={previewValue(setting?.value, 10000) === '—' ? '' : previewValue(setting?.value, 10000)}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
