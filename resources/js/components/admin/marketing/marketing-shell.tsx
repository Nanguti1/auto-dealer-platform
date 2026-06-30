import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

export default function MarketingShell({ title, description, actions, children, breadcrumbs = [] }: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
  return (
    <ModuleShell
      moduleName="Marketing"
      moduleBaseHref="/admin/promotions"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function MarketingBackButton({ href = '/admin/promotions' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
