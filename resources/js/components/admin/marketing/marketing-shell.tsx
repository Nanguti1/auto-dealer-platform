import * as React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageHeader from '@/components/admin/page-header';
import PageWrapper from '@/components/admin/page-wrapper';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/navigation';

export default function MarketingShell({ title, description, actions, children, breadcrumbs = [] }: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
  return <AdminLayout title={title} breadcrumbs={[{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Marketing', href: '/admin/promotions' }, ...breadcrumbs]}><PageWrapper><PageHeader title={title} description={description} actions={actions} />{children}</PageWrapper></AdminLayout>;
}

export function MarketingBackButton({ href = '/admin/promotions' }: { href?: string }) {
  return <Button variant="outline" asChild><Link href={href}>Back</Link></Button>;
}
