import { Link, router } from '@inertiajs/react';
import { Archive, CheckCircle2, Eye, Pencil, XCircle } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import FinanceShell from '@/components/admin/finance/finance-shell';
import FinanceStatusBadge from '@/components/admin/finance/finance-status-badge';
import { applicantName, deposit, formatCurrency, formatDateTime, monthlyPayment, officerName, term, vehicleName } from '@/components/admin/finance/helpers';
import type { FinanceApplication, FinanceApplicationPagination, FinanceFilters } from '@/components/admin/finance/types';
import { Button } from '@/components/ui/button';

export default function Index({ financeApplications, filters = {} }: { financeApplications: FinanceApplicationPagination; filters?: FinanceFilters }) {
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

  return (
    <FinanceShell title="Finance Applications" description="Review applications, loan details, approvals, documents, officers, and financing activity.">
      <AdminDataTable rows={financeApplications} filters={filters} columns={columns} baseUrl="/admin/finance-applications" rowActions={(application) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" asChild><Link href={`/admin/finance-applications/${application.id}`}><Eye className="size-4" /></Link></Button>
          <Button variant="ghost" size="icon" asChild><Link href={`/admin/finance-applications/${application.id}/edit`}><Pencil className="size-4" /></Link></Button>
          <Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/finance-applications/${application.id}`, { status: 'approved', approval_status: 'approved' })}><CheckCircle2 className="size-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.patch(`/admin/finance-applications/${application.id}`, { status: 'rejected', approval_status: 'rejected' })}><XCircle className="size-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.delete(`/admin/finance-applications/${application.id}`)}><Archive className="size-4" /></Button>
        </div>
      )} />
    </FinanceShell>
  );
}
