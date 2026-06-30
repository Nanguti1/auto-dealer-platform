import { Badge } from '@/components/ui/badge';

export default function MarketingStatusBadge({ status, active }: { status?: string | boolean | null; active?: boolean | null }) {
  const normalized = typeof status === 'string' ? status.toLowerCase() : active ? 'active' : status === false ? 'inactive' : 'draft';
  const positive = ['active', 'published', 'approved', 'sent', 'live'].includes(normalized);
  const warning = ['pending', 'scheduled', 'draft'].includes(normalized);
  return <Badge variant={positive ? 'default' : warning ? 'secondary' : 'outline'}>{normalized.replace(/_/g, ' ')}</Badge>;
}
