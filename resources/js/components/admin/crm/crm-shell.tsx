import * as React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageWrapper from '@/components/admin/page-wrapper';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
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
    <AdminLayout title={title} breadcrumbs={[{ title: 'Admin', href: '/admin/dashboard' }, { title: 'CRM', href: '/admin/leads' }, ...breadcrumbs]}>
      <PageWrapper>
        <PageHeader title={title} description={description} actions={actions} />
        {children}
      </PageWrapper>
    </AdminLayout>
  );
}

export function CrmBackButton({ href = '/admin/leads' }: { href?: string }) {
  return <Button variant="outline" asChild><Link href={href}>Back</Link></Button>;
}
