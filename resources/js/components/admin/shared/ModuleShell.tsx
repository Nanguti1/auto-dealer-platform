import * as React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageHeader from '@/components/admin/page-header';
import PageWrapper from '@/components/admin/page-wrapper';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/navigation';

interface ModuleShellProps {
  moduleName: string;
  moduleBaseHref: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ModuleShell({
  moduleName,
  moduleBaseHref,
  title,
  description,
  actions,
  children,
  breadcrumbs = [],
}: ModuleShellProps) {
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: moduleName, href: moduleBaseHref },
    ...breadcrumbs,
  ];

  return (
    <AdminLayout title={title} breadcrumbs={defaultBreadcrumbs}>
      <PageWrapper>
        <PageHeader title={title} description={description} actions={actions} />
        {children}
      </PageWrapper>
    </AdminLayout>
  );
}

interface ModuleBackButtonProps {
  href: string;
  label?: string;
}

export function ModuleBackButton({ href, label = 'Back' }: ModuleBackButtonProps) {
  return (
    <Button variant="outline" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
