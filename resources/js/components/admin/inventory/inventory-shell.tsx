import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function InventoryShell({ title, description, actions, children, breadcrumbs = [] }: Props) {
  return (
    <ModuleShell
      moduleName="Inventory"
      moduleBaseHref="/admin/vehicles"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function BackButton({ href = '/admin/vehicles' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
