import { Link } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { customerName } from '@/components/admin/customers/helpers';
import { formatCurrency, formatDateTime } from '@/components/admin/payments/helpers';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import type { Receipt } from '@/components/admin/payments/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ receipt }: { receipt: Receipt }) {
  return (
    <PaymentShell title={`Receipt ${receipt.receipt_number ?? `RCP-${receipt.id}`}`} description={`Issued ${formatDateTime(receipt.issued_at)}`} actions={<><PaymentBackButton /><Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 size-4" />Print</Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Customer overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {receipt.customer ? <CustomerAvatar customer={receipt.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{customerName(receipt.customer)}</p></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p>{receipt.customer?.email ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p>{receipt.customer?.phone ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Receipt number</p><p>{receipt.receipt_number ?? `RCP-${receipt.id}`}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Payment summary</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Amount</p><p className="font-semibold">{formatCurrency(receipt.amount)} {receipt.currency ?? 'USD'}</p><p className="text-sm text-muted-foreground">Payment method</p><p>{receipt.payment_method ?? '—'}</p><p className="text-sm text-muted-foreground">Issued date</p><p>{formatDateTime(receipt.issued_at)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Payment reference</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Payment ID</p><p>#{receipt.payment_id ?? '—'}</p><p className="text-sm text-muted-foreground">Transaction reference</p><p>{receipt.payment?.transaction_reference ?? '—'}</p><p className="text-sm text-muted-foreground">Payment method</p><p>{receipt.payment?.method ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Receipt details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Created</p><p>{formatDateTime(receipt.created_at)}</p><p className="text-sm text-muted-foreground">Updated</p><p>{formatDateTime(receipt.updated_at)}</p></CardContent></Card>
        <Card className="lg:col-span-3"><CardHeader><CardTitle>Printable receipt</CardTitle></CardHeader><CardContent className="space-y-4 border-t pt-4"><div className="flex justify-between"><p className="text-muted-foreground">Receipt Number:</p><p className="font-semibold">{receipt.receipt_number ?? `RCP-${receipt.id}`}</p></div><div className="flex justify-between"><p className="text-muted-foreground">Date:</p><p>{formatDateTime(receipt.issued_at)}</p></div><div className="flex justify-between"><p className="text-muted-foreground">Customer:</p><p>{customerName(receipt.customer)}</p></div><div className="flex justify-between"><p className="text-muted-foreground">Amount:</p><p className="font-semibold">{formatCurrency(receipt.amount)} {receipt.currency ?? 'USD'}</p></div><div className="flex justify-between"><p className="text-muted-foreground">Payment Method:</p><p>{receipt.payment_method ?? receipt.payment?.method ?? '—'}</p></div><div className="flex justify-between"><p className="text-muted-foreground">Transaction Reference:</p><p>{receipt.payment?.transaction_reference ?? '—'}</p></div></CardContent></Card>
      </div>
    </PaymentShell>
  );
}
