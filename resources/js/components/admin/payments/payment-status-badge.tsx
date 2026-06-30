import StatusBadge from '@/components/admin/shared/StatusBadge';

export default function PaymentStatusBadge({ status }: { status?: string }) {
  return <StatusBadge status={status} />;
}
