import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function MarketingStatusBadge({ status, active }: { status?: string | boolean | null; active?: boolean | null }) {
  const normalizedStatus = typeof status === 'string' ? status : active ? 'active' : status === false ? 'inactive' : 'draft';
  return <StatusBadge status={normalizedStatus} />;
}
