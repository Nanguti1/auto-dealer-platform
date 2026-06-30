import { Badge } from '@/components/ui/badge';

export default function SettingStatusBadge({ isPublic }: { isPublic?: boolean | null }) {
  return <Badge variant={isPublic ? 'default' : 'secondary'}>{isPublic ? 'Public' : 'Private'}</Badge>;
}
