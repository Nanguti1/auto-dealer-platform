import CustomerForm from '@/components/admin/customers/customer-form';
import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import { customerName } from '@/components/admin/customers/helpers';
import type { CustomerRecord } from '@/components/admin/customers/types';
import { admin } from '@/routes/admin';

export default function Edit({ customer }: { customer: CustomerRecord }) {
  return (
    <CustomerShell title={`Edit ${customerName(customer)}`} description="Update personal information, contact preferences, address, and account status." actions={<CustomerBackButton href={admin.customers.show(customer.id).url} />}>
      <CustomerForm customer={customer} action={admin.customers.update.form(customer.id).action} />
    </CustomerShell>
  );
}
