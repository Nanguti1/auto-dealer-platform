import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface SalesShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function SalesShell({ title, description, actions, children, breadcrumbs = [] }: SalesShellProps) {
  return (
    <ModuleShell
      moduleName="Sales"
      moduleBaseHref="/admin"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function SalesBackButton({ href = '/admin' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
