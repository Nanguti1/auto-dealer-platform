import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface AnalyticsShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AnalyticsShell({ title, description, actions, children, breadcrumbs = [] }: AnalyticsShellProps) {
  return (
    <ModuleShell
      moduleName="Analytics"
      moduleBaseHref="/admin/analytics"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function AnalyticsBackButton({ href = '/admin/analytics' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
