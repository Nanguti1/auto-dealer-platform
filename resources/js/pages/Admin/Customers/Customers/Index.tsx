import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import CustomerShell from '@/components/admin/customers/customer-shell';
import { customerName, formatDate } from '@/components/admin/customers/helpers';
import type { CustomerFilters, CustomerPagination, CustomerRecord } from '@/components/admin/customers/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { admin } from '@/routes/admin';
import { LoadingState, EmptyCustomers, InlineError } from '@/components/admin/shared';

export default function Index({ customers, filters = {} }: { customers: CustomerPagination; filters?: CustomerFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<CustomerRecord>[] = [
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (customer) => (
        <div className="flex items-center gap-3">
          <CustomerAvatar customer={customer} />
          <div>
            <Link href={admin.customers.show(customer.id).url} className="font-medium hover:underline">{customerName(customer)}</Link>
            <p className="text-xs text-muted-foreground">{customer.customer_number ?? `#${customer.id}`}</p>
          </div>
        </div>
      ),
    },
    { key: 'contact', label: 'Contact', render: (customer) => <div><p>{customer.email ?? '—'}</p><p className="text-xs text-muted-foreground">{customer.phone ?? 'No phone'}</p></div> },
    { key: 'purchase_summary', label: 'Purchase Summary', render: (customer) => <Badge variant="secondary">{customer.purchases_count ?? 0} purchases</Badge> },
    { key: 'reservations_count', label: 'Reservations', sortable: true, render: (customer) => customer.reservations_count ?? 0 },
    { key: 'finance_applications_count', label: 'Finance', sortable: true, render: (customer) => customer.finance_applications_count ?? 0 },
    { key: 'trade_ins_count', label: 'Trade-ins', sortable: true, render: (customer) => customer.trade_ins_count ?? 0 },
    { key: 'import_requests_count', label: 'Imports', sortable: true, render: (customer) => customer.import_requests_count ?? 0 },
    { key: 'status', label: 'Status', render: (customer) => <Badge>{customer.status ?? 'Active'}</Badge> },
    { key: 'last_activity_at', label: 'Last Activity', sortable: true, render: (customer) => formatDate(customer.last_activity_at ?? customer.updated_at as string) },
  ];

  if (isLoading) {
    return (
      <CustomerShell title="Customers" description="Manage customer profiles, engagement, purchases, and account activity.">
        <LoadingState message="Loading customers..." variant="full-page" />
      </CustomerShell>
    );
  }

  if (error) {
    return (
      <CustomerShell title="Customers" description="Manage customer profiles, engagement, purchases, and account activity.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.customers.index().url);
          }}
        />
      </CustomerShell>
    );
  }

  return (
    <CustomerShell title="Customers" description="Manage customer profiles, engagement, purchases, and account activity.">
      {customers.data.length === 0 ? (
        <EmptyCustomers onCreate={() => router.visit(admin.customers.create().url)} />
      ) : (
        <AdminDataTable
          rows={customers}
          filters={filters}
          columns={columns}
          baseUrl={admin.customers.index().url}
          rowActions={(customer) => (
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="icon" asChild><Link href={admin.customers.show(customer.id).url}><Eye className="size-4" /></Link></Button>
              <Button variant="ghost" size="icon" asChild><Link href={admin.customers.edit(customer.id).url}><Pencil className="size-4" /></Link></Button>
            </div>
          )}
        />
      )}
    </CustomerShell>
  );
}
