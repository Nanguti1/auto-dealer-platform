import * as React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageWrapper from '@/components/admin/page-wrapper';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }
export default function InventoryShell({ title, description, actions, children, breadcrumbs = [] }: Props) {
  return <AdminLayout title={title} breadcrumbs={[{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Inventory', href: '/admin/vehicles' }, ...breadcrumbs]}><PageWrapper><PageHeader title={title} description={description} actions={actions} /><div>{children}</div></PageWrapper></AdminLayout>;
}
export function BackButton({ href = '/admin/vehicles' }: { href?: string }) { return <Button variant="outline" asChild><Link href={href}>Back</Link></Button>; }
