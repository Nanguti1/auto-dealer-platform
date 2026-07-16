import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface SupplierShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function SupplierShell({ title, description, actions, children, breadcrumbs = [] }: SupplierShellProps) {
  return (
    <ModuleShell
      moduleName="Suppliers"
      moduleBaseHref="/admin/suppliers"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function SupplierBackButton({ href = '/admin/suppliers' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
