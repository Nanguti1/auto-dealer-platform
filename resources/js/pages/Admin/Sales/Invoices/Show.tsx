import { Link } from '@inertiajs/react';
import { FileText, Printer } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { customerName } from '@/components/admin/customers/helpers';
import { formatCurrency, formatDateTime, vehicleName } from '@/components/admin/payments/helpers';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import PaymentStatusBadge from '@/components/admin/payments/payment-status-badge';
import type { Invoice } from '@/components/admin/payments/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ invoice }: { invoice: Invoice }) {
  const outstandingBalance = (invoice.amount ?? 0) - (invoice.paid_amount ?? 0);

  return (
    <PaymentShell title={`Invoice ${invoice.invoice_number ?? `INV-${invoice.id}`}`} description={`Updated ${formatDateTime(invoice.updated_at)}`} actions={<><PaymentBackButton /><Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 size-4" />Print</Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Customer overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {invoice.customer ? <CustomerAvatar customer={invoice.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{customerName(invoice.customer)}</p></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p>{invoice.customer?.email ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p>{invoice.customer?.phone ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Invoice status</p><PaymentStatusBadge status={invoice.status} /></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Invoice summary</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Invoice number</p><p className="font-semibold">{invoice.invoice_number ?? `INV-${invoice.id}`}</p><p className="text-sm text-muted-foreground">Total amount</p><p className="font-semibold">{formatCurrency(invoice.amount)} {invoice.currency ?? 'USD'}</p><p className="text-sm text-muted-foreground">Paid amount</p><p className="font-semibold">{formatCurrency(invoice.paid_amount ?? 0)}</p><p className="text-sm text-muted-foreground">Outstanding balance</p><p className="font-semibold">{formatCurrency(outstandingBalance)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Vehicle details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{vehicleName(invoice.vehicle)}</p><p className="text-sm text-muted-foreground">Stock {invoice.vehicle?.stock_number ?? '—'}</p><p className="text-sm text-muted-foreground">VIN {invoice.vehicle?.vin ?? '—'}</p><p className="text-sm text-muted-foreground">{formatCurrency(invoice.vehicle?.sale_price)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Payment status</CardTitle></CardHeader><CardContent className="space-y-2"><PaymentStatusBadge status={invoice.status} /><p className="text-sm text-muted-foreground">Due date</p><p>{formatDateTime(invoice.due_date)}</p><p className="text-sm text-muted-foreground">Created</p><p>{formatDateTime(invoice.created_at)}</p></CardContent></Card>
        <Card className="lg:col-span-3"><CardHeader><CardTitle>Line items</CardTitle></CardHeader><CardContent className="space-y-3">{invoice.line_items?.length ? invoice.line_items.map((item, index) => <div key={index} className="flex items-center justify-between rounded-lg border p-3"><div><p className="font-medium">{item.description ?? 'Item'}</p><p className="text-sm text-muted-foreground">Qty: {item.quantity ?? 1} × {formatCurrency(item.unit_price)}</p></div><p className="font-semibold">{formatCurrency(item.total)}</p></div>) : <p className="text-sm text-muted-foreground">No line items.</p>}</CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Financial breakdown</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-sm text-muted-foreground">Subtotal</p><p className="font-semibold">{formatCurrency(invoice.amount)}</p></div><div><p className="text-sm text-muted-foreground">Taxes</p><p className="font-semibold">{formatCurrency(invoice.taxes ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Discounts</p><p className="font-semibold">{formatCurrency(invoice.discounts ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Total</p><p className="font-semibold">{formatCurrency(invoice.amount)}</p></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Payment history</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{invoice.payments?.length ? invoice.payments.map((payment) => <div key={payment.id} className="rounded-lg border p-3"><p className="font-medium">{formatCurrency(payment.amount)}</p><p className="text-sm text-muted-foreground">{payment.method} · {formatDateTime(payment.paid_at)}</p><PaymentStatusBadge status={payment.status} /></div>) : <p className="text-muted-foreground">No payments recorded.</p>}</CardContent></Card>
      </div>
    </PaymentShell>
  );
}
