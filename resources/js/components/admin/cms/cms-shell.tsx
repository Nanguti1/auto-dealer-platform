import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface CmsShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function CmsShell({ title, description, actions, children, breadcrumbs = [] }: CmsShellProps) {
  return (
    <ModuleShell
      moduleName="CMS"
      moduleBaseHref="/admin/cms"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function CmsBackButton({ href = '/admin/cms' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
