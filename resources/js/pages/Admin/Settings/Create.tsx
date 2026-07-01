import SettingForm from '@/components/admin/settings/setting-form';
import SettingShell, { SettingBackButton } from '@/components/admin/settings/setting-shell';

export default function Create() {
  return (
    <SettingShell title="Create Setting" description="Create a grouped configuration value." actions={<SettingBackButton />}>
      <SettingForm action="/admin/settings" method="post" />
    </SettingShell>
  );
}
