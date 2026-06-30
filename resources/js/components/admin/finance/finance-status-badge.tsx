import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function FinanceStatusBadge({ status }: { status?: string }) {
  return <StatusBadge status={status} />;
}
