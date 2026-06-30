import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

export default function TradeInShell({ title, description, actions, children, breadcrumbs = [] }: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
  return (
    <ModuleShell
      moduleName="Trade-Ins"
      moduleBaseHref="/admin/trade-ins"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function TradeInBackButton({ href = '/admin/trade-ins' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
