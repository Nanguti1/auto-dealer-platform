import SupplierForm from '@/components/admin/suppliers/supplier-form';
import SupplierShell, { SupplierBackButton } from '@/components/admin/suppliers/supplier-shell';
import type { SupplierRecord } from '@/components/admin/suppliers/types';
import admin from '@/routes/admin';

export default function Create() {
  const emptySupplier: SupplierRecord = {
    id: 0,
    branch_id: null,
    company_name: '',
    supplier_code: '',
    contact_person: '',
    supplier_type: 'other',
    email: '',
    phone: '',
    alternative_phone: '',
    website: '',
    country: '',
    county: '',
    city: '',
    postal_code: '',
    physical_address: '',
    tax_pin: '',
    registration_number: '',
    payment_terms: '',
    currency: 'USD',
    credit_limit: 0,
    status: 'active',
    notes: '',
    created_by: null,
    updated_by: null,
    created_at: '',
    updated_at: '',
    deleted_at: null,
  };

  return (
    <SupplierShell title="Create Supplier" description="Add a new supplier with company information, contact details, address, and business terms." actions={<SupplierBackButton />}>
      <SupplierForm supplier={emptySupplier} action={admin.suppliers.store().url} />
    </SupplierShell>
  );
}
