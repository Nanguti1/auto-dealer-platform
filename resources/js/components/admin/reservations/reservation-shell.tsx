import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface ReservationShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ReservationShell({ title, description, actions, children, breadcrumbs = [] }: ReservationShellProps) {
  return (
    <ModuleShell
      moduleName="Reservations"
      moduleBaseHref="/admin/reservations"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function ReservationBackButton({ href = '/admin/reservations' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}