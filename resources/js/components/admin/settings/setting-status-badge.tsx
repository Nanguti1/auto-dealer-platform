import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function SettingStatusBadge({ isPublic }: { isPublic?: boolean | null }) {
  return <StatusBadge status={isPublic} />;
}
