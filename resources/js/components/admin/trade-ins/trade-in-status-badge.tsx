import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function TradeInStatusBadge({ status }: { status?: string }) {
  return <StatusBadge status={status} />;
}
