import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface ImportShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ImportShell({ title, description, actions, children, breadcrumbs = [] }: ImportShellProps) {
  return (
    <ModuleShell
      moduleName="Imports"
      moduleBaseHref="/admin/imports"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function ImportBackButton({ href = '/admin/imports' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
