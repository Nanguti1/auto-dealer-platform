import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface BranchShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function BranchShell({ title, description, actions, children, breadcrumbs = [] }: BranchShellProps) {
  return (
    <ModuleShell
      moduleName="Branches"
      moduleBaseHref="/admin/branches"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function BranchBackButton({ href = '/admin/branches' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
