import adminRoutes from '@/routes/admin';
import SettingForm from '@/components/admin/settings/setting-form';
import SettingShell, { SettingBackButton } from '@/components/admin/settings/setting-shell';

export default function Create() {
  return (
    <SettingShell title="Create Setting" description="Create a grouped configuration value." actions={<SettingBackButton />}>
      <SettingForm action={adminRoutes.settings.store().url} method="post" />
    </SettingShell>
  );
}
