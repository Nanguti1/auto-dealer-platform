import * as React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageHeader from '@/components/admin/page-header';
import PageWrapper from '@/components/admin/page-wrapper';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/navigation';

interface SettingShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function SettingShell({ title, description, actions, children, breadcrumbs = [] }: SettingShellProps) {
  return (
    <AdminLayout title={title} breadcrumbs={[{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Settings', href: '/admin/settings' }, ...breadcrumbs]}>
      <PageWrapper>
        <PageHeader title={title} description={description} actions={actions} />
        {children}
      </PageWrapper>
    </AdminLayout>
  );
}

export function SettingBackButton({ href = '/admin/settings' }: { href?: string }) {
  return (
    <Button variant="outline" asChild>
      <Link href={href}>Back</Link>
    </Button>
  );
}
