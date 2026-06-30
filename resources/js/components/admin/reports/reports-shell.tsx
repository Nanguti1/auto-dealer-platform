import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface ReportsShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ReportsShell({ title, description, actions, children, breadcrumbs = [] }: ReportsShellProps) {
  return (
    <ModuleShell
      moduleName="Reports"
      moduleBaseHref="/admin/reports"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function ReportsBackButton({ href = '/admin/reports' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
