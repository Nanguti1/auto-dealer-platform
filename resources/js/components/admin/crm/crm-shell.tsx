import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface CrmShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function CrmShell({ title, description, actions, children, breadcrumbs = [] }: CrmShellProps) {
  return (
    <ModuleShell
      moduleName="CRM"
      moduleBaseHref="/admin/leads"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function CrmBackButton({ href = '/admin/leads' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
