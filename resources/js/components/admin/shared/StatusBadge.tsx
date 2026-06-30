import { Badge } from '@/components/ui/badge';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface StatusBadgeProps {
  status?: string | boolean | null;
  variantMapping?: Record<string, BadgeVariant>;
  capitalize?: boolean;
  fallbackVariant?: BadgeVariant;
}

const defaultVariantMapping: Record<string, BadgeVariant> = {
  // Positive statuses
  approved: 'default',
  accepted: 'default',
  completed: 'default',
  delivered: 'default',
  paid: 'default',
  successful: 'default',
  processed: 'default',
  funded: 'default',
  active: 'default',
  published: 'default',
  sent: 'default',
  live: 'default',
  won: 'default',
  converted: 'default',
  in_transit: 'default',

  // Warning/neutral statuses
  pending: 'secondary',
  submitted: 'secondary',
  review: 'secondary',
  reviewing: 'secondary',
  draft: 'secondary',
  processing: 'secondary',
  shipping: 'secondary',
  customs: 'secondary',
  scheduled: 'secondary',
  inspecting: 'secondary',
  inspection: 'secondary',
  new: 'secondary',

  // Negative statuses
  rejected: 'destructive',
  declined: 'destructive',
  cancelled: 'destructive',
  failed: 'destructive',
  refunded: 'destructive',
  expired: 'destructive',
  lost: 'destructive',
  archived: 'outline',
};

export default function StatusBadge({
  status,
  variantMapping = {},
  capitalize = true,
  fallbackVariant = 'outline',
}: StatusBadgeProps) {
  // Handle boolean status (for settings component)
  if (typeof status === 'boolean') {
    return (
      <Badge variant={status ? 'default' : 'secondary'}>
        {status ? 'Public' : 'Private'}
      </Badge>
    );
  }

  // Handle null/undefined status
  const value = status ?? 'pending';
  const statusString = String(value);

  // Get variant from custom mapping or default mapping
  const variant =
    variantMapping[statusString.toLowerCase()] ??
    defaultVariantMapping[statusString.toLowerCase()] ??
    fallbackVariant;

  // Format the display text
  const displayText = statusString
    .toLowerCase()
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => (capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ');

  return <Badge variant={variant}>{displayText}</Badge>;
}
