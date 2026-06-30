import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface SettingShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function SettingShell({ title, description, actions, children, breadcrumbs = [] }: SettingShellProps) {
  return (
    <ModuleShell
      moduleName="Settings"
      moduleBaseHref="/admin/settings"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function SettingBackButton({ href = '/admin/settings' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
