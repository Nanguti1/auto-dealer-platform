import { Link } from '@inertiajs/react';
import { RotateCcw } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import { formatCurrency, formatDateTime, userName } from '@/components/admin/payments/helpers';
import type { Refund } from '@/components/admin/payments/types';

export default function Show({ refund }: { refund: Refund }) {
  const timeline = refund.timeline ?? [];

  return (
    <PaymentShell title={`Refund #${refund.id}`} description={`Refund for payment #${refund.payment_id} · Updated ${formatDateTime(refund.updated_at)}`} actions={<><PaymentBackButton /><Button variant="outline" asChild><Link href={`/admin/payments/${refund.payment_id}`}><RotateCcw className="mr-2 size-4" />View Payment</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Refund overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Refund ID</p><p>#{refund.id}</p></div>
              <div><p className="text-sm text-muted-foreground">Original payment</p><p><Link href={`/admin/payments/${refund.payment_id}`} className="font-medium hover:underline">Payment #{refund.payment_id}</Link></p></div>
              <div><p className="text-sm text-muted-foreground">Refund status</p><PaymentStatusBadge status={refund.status} /></div>
              <div><p className="text-sm text-muted-foreground">Refund method</p><p>{refund.refund_method ?? '—'}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Refund amount</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Refund amount</p><p className="font-semibold">{formatCurrency(refund.amount)} {refund.currency ?? 'USD'}</p><p className="text-sm text-muted-foreground">Original payment</p><p>{formatCurrency(refund.original_payment?.amount)}</p><p className="text-sm text-muted-foreground">Processed date</p><p>{formatDateTime(refund.processed_at)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Approval details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Approved by</p><p>{userName(refund.approved_by)}</p><p className="text-sm text-muted-foreground">Refund status</p><PaymentStatusBadge status={refund.status} /><p className="text-sm text-muted-foreground">Created</p><p>{formatDateTime(refund.created_at)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Reason for refund</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm">{refund.reason ?? 'No reason provided.'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Payment details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Payment method</p><p>{refund.original_payment?.method ?? '—'}</p><p className="text-sm text-muted-foreground">Transaction reference</p><p>{refund.original_payment?.transaction_reference ?? '—'}</p><p className="text-sm text-muted-foreground">Payment date</p><p>{formatDateTime(refund.original_payment?.paid_at)}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Refund timeline</CardTitle></CardHeader><CardContent><TimelineList events={timeline} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Refund history</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p className="text-muted-foreground">Refund tracking information and status changes are recorded in the timeline.</p></CardContent></Card>
      </div>
    </PaymentShell>
  );
}
