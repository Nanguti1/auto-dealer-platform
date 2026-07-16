import SupplierForm from '@/components/admin/suppliers/supplier-form';
import SupplierShell, { SupplierBackButton } from '@/components/admin/suppliers/supplier-shell';
import type { SupplierRecord } from '@/components/admin/suppliers/types';
import admin from '@/routes/admin';

export default function Edit({ supplier }: { supplier: SupplierRecord }) {
  return (
    <SupplierShell title="Edit Supplier" description="Update supplier information, contact details, address, and business terms." actions={<SupplierBackButton />}>
      <SupplierForm supplier={supplier} action={admin.suppliers.update(supplier.id).form().action} method="put" />
    </SupplierShell>
  );
}
