import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Eye, Pencil, Plus, XCircle } from 'lucide-react';
import * as React from 'react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import FinanceShell from '@/components/admin/finance/finance-shell';
import FinanceStatusBadge from '@/components/admin/finance/finance-status-badge';
import { applicantName, deposit, formatDateTime, monthlyPayment, officerName, term, vehicleName } from '@/components/admin/finance/helpers';
import type { FinanceApplication, FinanceApplicationPagination, FinanceFilters } from '@/components/admin/finance/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyFinanceApplications, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Button } from '@/components/ui/button';

export default function Index({ financeApplications, filters = {} }: { financeApplications: FinanceApplicationPagination; filters?: FinanceFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const formatCurrency = useFormatCurrency();

  const columns: Column<FinanceApplication>[] = [
    { key: 'customer', label: 'Customer', render: (application) => <div className="flex items-center gap-3">{application.customer ? <CustomerAvatar customer={application.customer} /> : null}<div><Link href={`/admin/finance-applications/${application.id}`} className="font-medium hover:underline">{applicantName(application)}</Link><p className="text-xs text-muted-foreground">{application.customer?.email ?? application.user?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Vehicle', render: (application) => vehicleName(application.vehicle) },
    { key: 'requested_amount', label: 'Requested amount', sortable: true, render: (application) => formatCurrency(application.requested_amount) },
    { key: 'down_payment', label: 'Deposit', sortable: true, render: (application) => formatCurrency(deposit(application)) },
    { key: 'term_months', label: 'Loan term', sortable: true, render: (application) => `${term(application) ?? '—'} months` },
    { key: 'interest_rate', label: 'Interest rate', sortable: true, render: (application) => `${application.interest_rate ?? '—'}%` },
    { key: 'estimated_monthly_payment', label: 'Monthly payment', sortable: true, render: (application) => formatCurrency(monthlyPayment(application)) },
    { key: 'status', label: 'Application status', sortable: true, render: (application) => <FinanceStatusBadge status={application.status} /> },
    { key: 'approval_status', label: 'Approval status', sortable: true, render: (application) => <FinanceStatusBadge status={application.approval_status} /> },
    { key: 'assigned_user_id', label: 'Assigned officer', sortable: true, render: officerName },
    { key: 'created_at', label: 'Created', sortable: true, render: (application) => formatDateTime(application.created_at) },
    { key: 'updated_at', label: 'Last updated', sortable: true, render: (application) => formatDateTime(application.updated_at) },
  ];

  if (isLoading) {
    return (
      <FinanceShell title="Finance Applications" description="Review applications, loan details, approvals, documents, officers, and financing activity.">
        <LoadingState message="Loading finance applications..." variant="full-page" />
      </FinanceShell>
    );
  }

  if (error) {
    return (
      <FinanceShell title="Finance Applications" description="Review applications, loan details, approvals, documents, officers, and financing activity.">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/finance-applications');
          }}
        />
      </FinanceShell>
    );
  }

  return (
    <FinanceShell 
      title="Finance Applications" 
      description="Review applications, loan details, approvals, documents, officers, and financing activity."
      actions={
        <Button asChild>
          <Link href="/admin/finance-applications/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Application
          </Link>
        </Button>
      }
    >
      {financeApplications.data.length === 0 ? (
        <EmptyFinanceApplications onCreate={() => router.visit('/admin/finance-applications/create')} />
      ) : (
        <AdminDataTable rows={financeApplications} filters={filters} columns={columns} baseUrl="/admin/finance-applications" rowActions={(application) => (
          <RowActionsDropdown
            ariaLabel={`Actions for finance application ${application.id}`}
            actions={[
              {
                label: 'View',
                icon: <Eye />,
                href: `/admin/finance-applications/${application.id}`,
              },
              {
                label: 'Edit',
                icon: <Pencil />,
                href: `/admin/finance-applications/${application.id}/edit`,
              },
              {
                label: 'Approve',
                icon: <CheckCircle2 />,
                onClick: () => router.patch(`/admin/finance-applications/${application.id}`, { status: 'approved', approval_status: 'approved' }),
              },
              {
                label: 'Reject',
                icon: <XCircle />,
                destructive: true,
                onClick: () => router.patch(`/admin/finance-applications/${application.id}`, { status: 'rejected', approval_status: 'rejected' }),
              },
              {
                label: 'Delete',
                icon: <Archive />,
                destructive: true,
                onClick: () => router.delete(`/admin/finance-applications/${application.id}`),
              },
            ]}
          />
        )} />
      )}
    </FinanceShell>
  );
}
