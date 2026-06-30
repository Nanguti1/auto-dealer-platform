import type { CustomerAddress, CustomerRecord } from './types';
import { formatDate } from '@/lib/date-utils';
import { formatFileSize } from '@/lib/format-utils';

export { formatDate, formatFileSize };

export function customerName(customer: CustomerRecord): string {
  const name = [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim();
  return name || customer.email || customer.customer_number || 'Unnamed customer';
}

export function customerInitials(customer: CustomerRecord): string {
  return customerName(customer).split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2) || 'CU';
}

export function formatAddress(address?: CustomerAddress): string {
  if (!address) return 'No address on file';
  return [address.line1, address.line2, [address.city, address.state, address.postal_code].filter(Boolean).join(', '), address.country].filter(Boolean).join('\n');
}
