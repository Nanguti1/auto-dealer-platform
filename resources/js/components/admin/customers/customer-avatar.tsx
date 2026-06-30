import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { customerInitials, customerName } from './helpers';
import type { CustomerRecord } from './types';

export default function CustomerAvatar({ customer }: { customer: CustomerRecord }) {
  return (
    <Avatar className="size-10">
      <AvatarImage src={customer.avatar_url} alt={customerName(customer)} />
      <AvatarFallback>{customerInitials(customer)}</AvatarFallback>
    </Avatar>
  );
}
