import { router } from '@inertiajs/react';
import * as React from 'react';
import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import { customerName } from '@/components/admin/customers/helpers';
import TimelineList from '@/components/admin/customers/timeline-list';
import type { CustomerRecord, TimelineEvent } from '@/components/admin/customers/types';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';

export default function Index({ customer, events = [] }: { customer?: CustomerRecord; events?: TimelineEvent[] }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const customerUrl = customer ? `/admin/customers/${customer.id}` : '/admin/customers';

  if (isLoading) {
    return (
      <CustomerShell title="Customer Timeline" description={customer ? `Unified chronological activity for ${customerName(customer)}.` : 'Unified chronological customer activity.'} actions={<CustomerBackButton href={customerUrl} />}>
        <LoadingState message="Loading timeline..." variant="full-page" />
      </CustomerShell>
    );
  }

  if (error) {
    return (
      <CustomerShell title="Customer Timeline" description={customer ? `Unified chronological activity for ${customerName(customer)}.` : 'Unified chronological customer activity.'} actions={<CustomerBackButton href={customerUrl} />}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(customerUrl);
          }}
        />
      </CustomerShell>
    );
  }

  return (
    <CustomerShell title="Customer Timeline" description={customer ? `Unified chronological activity for ${customerName(customer)}.` : 'Unified chronological customer activity.'} actions={<CustomerBackButton href={customerUrl} />}>
      {events.length === 0 ? (
        <EmptyGeneric
          title="No timeline events"
          description="No activity has been recorded for this customer yet."
        />
      ) : (
        <TimelineList events={events} />
      )}
    </CustomerShell>
  );
}
