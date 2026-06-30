import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function ImportStatusBadge({ status }: { status?: string }) {
  return <StatusBadge status={status} />;
}
