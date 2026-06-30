import CustomerForm from '@/components/admin/customers/customer-form';
import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import type { CustomerRecord } from '@/components/admin/customers/types';
import { admin } from '@/routes/admin';

export default function Create() {
  const emptyCustomer: CustomerRecord = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: null,
    customer_number: '',
    status: 'active',
    address: null,
    preferences: {},
    created_at: '',
    updated_at: '',
  };

  return (
    <CustomerShell title="Create Customer" description="Add a new customer with personal information, contact details, address, and preferences." actions={<CustomerBackButton />}>
      <CustomerForm customer={emptyCustomer} action={admin.customers.store.form().action} />
    </CustomerShell>
  );
}
