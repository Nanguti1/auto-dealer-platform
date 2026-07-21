import { Link } from '@inertiajs/react';
import { Eye, FileText, Plus } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { customerName } from '@/components/admin/customers/helpers';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDateTime, vehicleName } from '@/components/admin/payments/helpers';
import PaymentShell from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import type { InvoiceFilters, InvoicePagination, Invoice } from '@/components/admin/payments/types';
import { RowActionsDropdown } from '@/components/admin/shared';
import { useFormatCurrency } from '@/components/admin/shared/CurrencyFormatter';
import { Button } from '@/components/ui/button';
import adminRoutes from '@/routes/admin';

export default function Index({ invoices, filters = {} }: { invoices: InvoicePagination; filters?: InvoiceFilters }) {
  const formatCurrency = useFormatCurrency();
  
  const columns: Column<Invoice>[] = [
    { key: 'status', label: 'Status', sortable: true, render: (row) => <PaymentStatusBadge status={row.status} /> },
    { key: 'invoice_number', label: 'Invoice #', sortable: true, render: (row) => row.invoice_number ?? `INV-${row.id}` },
    { key: 'customer', label: 'Customer', render: (row) => <div className="flex items-center gap-3">{row.customer ? <CustomerAvatar customer={row.customer} /> : null}<div><Link href={`/admin/invoices/${row.id}`} className="font-medium hover:underline">{customerName(row.customer)}</Link><p className="text-xs text-muted-foreground">{row.customer?.email ?? 'No contact'}</p></div></div> },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => <div>{vehicleName(row.vehicle)}<p className="text-xs text-muted-foreground">{row.vehicle?.stock_number ?? '—'}</p></div> },
    { key: 'total', label: 'Total', sortable: true, render: (row) => <div>{formatCurrency(row.total)}<p className="text-xs text-muted-foreground">USD</p></div> },
    { key: 'paid_amount', label: 'Paid', sortable: true, render: (row) => formatCurrency(row.paid_amount ?? 0) },
    { key: 'outstanding_balance', label: 'Outstanding', sortable: true, render: (row) => formatCurrency((row.total ?? 0) - (row.paid_amount ?? 0)) },
    { key: 'due_at', label: 'Due date', sortable: true, render: (row) => formatDateTime(row.due_at) },
    { key: 'created_at', label: 'Created', sortable: true, render: (row) => formatDateTime(row.created_at) },
  ];

  return (
    <PaymentShell 
      title="Invoices" 
      description="Manage customer invoices, line items, taxes, discounts, and payment tracking."
      actions={
        <Button asChild>
          <Link href={adminRoutes.invoices.create().url}>
            <Plus className="mr-2 size-4" />
            Create Invoice
          </Link>
        </Button>
      }
    >
      <AdminDataTable
        rows={invoices}
        filters={filters}
        columns={columns}
        baseUrl="/admin/invoices"
        rowActions={(row) => (
          <RowActionsDropdown
            ariaLabel={`Actions for invoice ${row.id}`}
            actions={[
              {
                label: 'View',
                icon: <Eye />,
                href: `/admin/invoices/${row.id}`,
              },
              {
                label: 'Print',
                icon: <FileText />,
                href: `/admin/invoices/${row.id}/print`,
              },
            ]}
          />
        )}
      />
    </PaymentShell>
  );
}
