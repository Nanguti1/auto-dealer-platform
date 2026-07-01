import SettingForm from '@/components/admin/settings/setting-form';
import SettingShell, { SettingBackButton } from '@/components/admin/settings/setting-shell';
import type { AdminSetting } from '@/components/admin/settings/types';

export default function Edit({ setting }: { setting: AdminSetting }) {
  return (
    <SettingShell title="Edit Setting" description="Update a grouped configuration value." actions={<SettingBackButton />}>
      <SettingForm setting={setting} action={`/admin/settings/${setting.id}`} method="put" />
    </SettingShell>
  );
}
