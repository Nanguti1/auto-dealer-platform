import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import TimelineList from '@/components/admin/customers/timeline-list';
import { customerName } from '@/components/admin/customers/helpers';
import type { CustomerRecord, TimelineEvent } from '@/components/admin/customers/types';

export default function Index({ customer, events = [] }: { customer?: CustomerRecord; events?: TimelineEvent[] }) {
  return (
    <CustomerShell title="Customer Timeline" description={customer ? `Unified chronological activity for ${customerName(customer)}.` : 'Unified chronological customer activity.'} actions={<CustomerBackButton href={customer ? `/admin/customers/${customer.id}` : '/admin/customers'} />}>
      <TimelineList events={events} />
    </CustomerShell>
  );
}
