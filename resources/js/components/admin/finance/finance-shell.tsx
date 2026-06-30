import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface FinanceShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function FinanceShell({ title, description, actions, children, breadcrumbs = [] }: FinanceShellProps) {
  return (
    <ModuleShell
      moduleName="Finance"
      moduleBaseHref="/admin/finance-applications"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function FinanceBackButton({ href = '/admin/finance-applications' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
