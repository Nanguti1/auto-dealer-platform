import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function CrmStatusBadge({ status = 'new' }: { status?: string }) {
  return <StatusBadge status={status} />;
}
