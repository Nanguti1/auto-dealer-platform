import { Link, router } from '@inertiajs/react';
import { Pencil, Receipt, RotateCcw } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import { formatCurrency, formatDateTime, customerNameFromPayment, vehicleName, userName } from '@/components/admin/payments/helpers';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import type { Payment } from '@/components/admin/payments/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ payment }: { payment: Payment }) {
  const timeline = payment.timeline ?? [];

  return (
    <PaymentShell title={`Payment #${payment.id}`} description={`Transaction reference: ${payment.transaction_reference ?? '—'} · Updated ${formatDateTime(payment.updated_at)}`} actions={<><PaymentBackButton /><Button variant="outline" asChild><Link href={`/admin/payments/${payment.id}/receipt`}><Receipt className="mr-2 size-4" />Receipt</Link></Button><Button variant="outline" onClick={() => router.post(`/admin/payments/${payment.id}/refund`)}><RotateCcw className="mr-2 size-4" />Refund</Button><Button asChild><Link href={`/admin/payments/${payment.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Customer overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {payment.customer ? <CustomerAvatar customer={payment.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{customerNameFromPayment(payment)}</p></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p>{payment.customer?.email ?? payment.user?.email ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p>{payment.customer?.phone ?? payment.user?.phone ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Processed by</p><p>{userName(payment.processed_by)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Payment summary</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Amount</p><p className="font-semibold">{formatCurrency(payment.amount)} {payment.currency ?? 'USD'}</p><p className="text-sm text-muted-foreground">Payment status</p><PaymentStatusBadge status={payment.status} /><p className="text-sm text-muted-foreground">Payment date</p><p>{formatDateTime(payment.paid_at)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Transaction details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Transaction reference</p><p>{payment.transaction_reference ?? '—'}</p><p className="text-sm text-muted-foreground">Payment method</p><p>{payment.method ?? '—'}</p><p className="text-sm text-muted-foreground">Payment type</p><p>{payment.metadata?.payment_type ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Related vehicle</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{vehicleName(payment.vehicle)}</p><p className="text-sm text-muted-foreground">Stock {payment.vehicle?.stock_number ?? '—'}</p><p className="text-sm text-muted-foreground">VIN {payment.vehicle?.vin ?? '—'}</p><p className="text-sm text-muted-foreground">{formatCurrency(payment.vehicle?.sale_price)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Reservation</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Reservation ID</p><p>#{payment.vehicle_reservation_id ?? '—'}</p><p className="text-sm text-muted-foreground">Status</p><PaymentStatusBadge status={payment.vehicleReservation?.status} /><p className="text-sm text-muted-foreground">Expires</p><p>{formatDateTime(payment.vehicleReservation?.expires_at)}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Payment breakdown</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div><p className="text-sm text-muted-foreground">Subtotal</p><p className="font-semibold">{formatCurrency(payment.metadata?.subtotal ?? payment.amount)}</p></div><div><p className="text-sm text-muted-foreground">Taxes</p><p className="font-semibold">{formatCurrency(payment.metadata?.taxes ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Discounts</p><p className="font-semibold">{formatCurrency(payment.metadata?.discounts ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Total</p><p className="font-semibold">{formatCurrency(payment.amount)}</p></div><div><p className="text-sm text-muted-foreground">Outstanding balance</p><p className="font-semibold">{formatCurrency(payment.metadata?.outstanding_balance ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Payment status</p><PaymentStatusBadge status={payment.status} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Related transactions</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>Finance Application: {payment.finance_application ? <Link className="hover:underline" href={`/admin/finance-applications/${payment.finance_application.id}`}>#{payment.finance_application.id}</Link> : '—'}</p><p>Import Request: {payment.import_request ? <Link className="hover:underline" href={`/admin/imports/${payment.import_request.id}`}>#{payment.import_request.id}</Link> : '—'}</p><p>Trade-In: {payment.trade_in ? <Link className="hover:underline" href={`/admin/trade-ins/${payment.trade_in.id}`}>#{payment.trade_in.id}</Link> : '—'}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><TimelineList events={timeline} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{payment.notes?.length ? payment.notes.map((note) => <p key={note.id}>{note.title ?? note.body ?? note.note}</p>) : <p className="text-muted-foreground">No notes recorded.</p>}</CardContent></Card>
        <Card className="lg:col-span-3"><CardHeader><CardTitle>Audit trail</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>Created: {formatDateTime(payment.created_at)}</p><p>Updated: {formatDateTime(payment.updated_at)}</p><p>Processed by: {userName(payment.processed_by)}</p></CardContent></Card>
      </div>
    </PaymentShell>
  );
}
