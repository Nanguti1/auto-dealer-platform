import * as React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageHeader from '@/components/admin/page-header';
import PageWrapper from '@/components/admin/page-wrapper';
import { Button } from '@/components/ui/button';
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
    <AdminLayout title={title} breadcrumbs={[{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Payments', href: '/admin/payments' }, ...breadcrumbs]}>
      <PageWrapper>
        <PageHeader title={title} description={description} actions={actions} />
        {children}
      </PageWrapper>
    </AdminLayout>
  );
}

export function PaymentBackButton({ href = '/admin/payments' }: { href?: string }) {
  return <Button variant="outline" asChild><Link href={href}>Back</Link></Button>;
}
