import ModuleShell, { ModuleBackButton } from '@/components/admin/shared/ModuleShell';
import type { BreadcrumbItem } from '@/types/navigation';

interface PaymentShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PaymentShell({ title, description, actions, children, breadcrumbs = [] }: PaymentShellProps) {
  return (
    <ModuleShell
      moduleName="Payments"
      moduleBaseHref="/admin/payments"
      title={title}
      description={description}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </ModuleShell>
  );
}

export function PaymentBackButton({ href = '/admin/payments' }: { href?: string }) {
  return <ModuleBackButton href={href} />;
}
