import { Badge } from '@/components/ui/badge';

const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  approved: 'default',
  funded: 'default',
  active: 'default',
  pending: 'secondary',
  submitted: 'secondary',
  review: 'secondary',
  reviewing: 'secondary',
  rejected: 'destructive',
  declined: 'destructive',
  archived: 'outline',
  draft: 'outline',
};

export default function FinanceStatusBadge({ status }: { status?: string }) {
  const value = status ?? 'pending';

  return <Badge variant={variants[value.toLowerCase()] ?? 'outline'} className="capitalize">{value.replaceAll('_', ' ')}</Badge>;
}
