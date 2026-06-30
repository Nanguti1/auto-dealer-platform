import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface CustomerShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function CustomerShell({ title, description, actions, children, breadcrumbs = [] }: CustomerShellProps) {
  return (
    <ModuleShell
      moduleName="Customers"
      moduleBaseHref="/admin/customers"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function CustomerBackButton({ href = '/admin/customers' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
