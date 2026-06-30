import { Badge } from '@/components/ui/badge';

export default function CrmStatusBadge({ status = 'new' }: { status?: string }) {
  const normalized = status.toLowerCase();
  const variant = normalized.includes('lost') || normalized.includes('archived') ? 'destructive' : normalized.includes('won') || normalized.includes('converted') ? 'default' : 'secondary';
  return <Badge variant={variant}>{status.replaceAll('_', ' ')}</Badge>;
}
