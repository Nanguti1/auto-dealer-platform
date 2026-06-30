import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImportStatusBadge from './import-status-badge';
import { formatCurrency, formatDateTime } from './helpers';
import type { ImportPayment } from './types';

export default function PaymentSummaryCard({ payment }: { payment: ImportPayment }) {
  return (
    <Card>
      <CardHeader><CardTitle>{payment.payment_type ?? 'Payment'}</CardTitle></CardHeader>
      <CardContent className="space-y-2"><p className="font-semibold">{formatCurrency(payment.amount)}</p><p className="text-sm text-muted-foreground">{payment.method ?? '—'}</p><p className="text-sm text-muted-foreground">Ref: {payment.reference ?? '—'}</p><ImportStatusBadge status={payment.status} /><p className="text-xs text-muted-foreground">{formatDateTime(payment.payment_date)}</p></CardContent>
    </Card>
  );
}
