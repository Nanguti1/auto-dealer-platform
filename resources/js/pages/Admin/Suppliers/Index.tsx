import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus } from 'lucide-react';
import * as React from 'react';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import { formatDate, supplierName, supplierTypeLabel, statusColor } from '@/components/admin/suppliers/helpers';
import SupplierShell from '@/components/admin/suppliers/supplier-shell';
import type { SupplierFilters, SupplierPagination, SupplierRecord } from '@/components/admin/suppliers/types';
import { LoadingState, EmptyGeneric, InlineError, RowActionsDropdown } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';

const getRowActions = (supplier: SupplierRecord) => [
  { label: 'View', icon: <Eye />, href: admin.suppliers.show(supplier.id).url },
  { label: 'Edit', icon: <Pencil />, href: admin.suppliers.edit(supplier.id).url },
];

const Index = React.memo(function Index({ suppliers, filters = {} }: { suppliers: SupplierPagination; filters?: SupplierFilters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const columns: Column<SupplierRecord>[] = React.useMemo(() => [
    {
      key: 'company_name',
      label: 'Company Name',
      sortable: true,
      render: (supplier) => (
        <div>
          <Link href={admin.suppliers.show(supplier.id).url} className="font-medium hover:underline">{supplierName(supplier)}</Link>
          <p className="text-xs text-muted-foreground">{supplier.supplier_code}</p>
        </div>
      ),
    },
    { key: 'contact_person', label: 'Contact Person', sortable: true, render: (supplier) => supplier.contact_person || '—' },
    { key: 'supplier_type', label: 'Type', sortable: true, render: (supplier) => <Badge variant="outline">{supplierTypeLabel(supplier.supplier_type)}</Badge> },
    { key: 'contact', label: 'Contact', render: (supplier) => <div><p>{supplier.email ?? '—'}</p><p className="text-xs text-muted-foreground">{supplier.phone ?? 'No phone'}</p></div> },
    { key: 'status', label: 'Status', sortable: true, render: (supplier) => <Badge className={statusColor(supplier.status)}>{supplier.status}</Badge> },
    { key: 'branch', label: 'Branch', render: (supplier) => supplier.branch?.name || '—' },
    { key: 'created_at', label: 'Created', sortable: true, render: (supplier) => formatDate(supplier.created_at) },
  ], []);

  if (isLoading) {
    return (
      <SupplierShell title="Suppliers" description="Manage supplier profiles, contact information, and business relationships." actions={<Button asChild><Link href={admin.suppliers.create().url}><Plus className="mr-2 h-4 w-4" />Add Supplier</Link></Button>}>
        <LoadingState message="Loading suppliers..." variant="full-page" />
      </SupplierShell>
    );
  }

  if (error) {
    return (
      <SupplierShell title="Suppliers" description="Manage supplier profiles, contact information, and business relationships." actions={<Button asChild><Link href={admin.suppliers.create().url}><Plus className="mr-2 h-4 w-4" />Add Supplier</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.suppliers.index().url);
          }}
        />
      </SupplierShell>
    );
  }

  return (
    <SupplierShell title="Suppliers" description="Manage supplier profiles, contact information, and business relationships." actions={<Button asChild><Link href={admin.suppliers.create().url}><Plus className="mr-2 h-4 w-4" />Add Supplier</Link></Button>}>
      {suppliers.data.length === 0 ? (
        <EmptyGeneric
          title="No suppliers"
          description="Create your first supplier to start managing your supplier relationships."
          action={{ label: 'Create Supplier', onClick: () => router.visit(admin.suppliers.create().url) }}
        />
      ) : (
        <AdminDataTable
          rows={suppliers}
          filters={filters}
          columns={columns}
          baseUrl={admin.suppliers.index().url}
          rowActions={(supplier) => (
            <RowActionsDropdown
              ariaLabel={`Actions for supplier ${supplier.id}`}
              actions={getRowActions(supplier)}
            />
          )}
        />
      )}
    </SupplierShell>
  );
});

export default Index;
