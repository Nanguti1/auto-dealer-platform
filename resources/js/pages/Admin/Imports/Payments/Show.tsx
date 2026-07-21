import { Link } from '@inertiajs/react';
import { DollarSign, Eye } from 'lucide-react';
import adminRoutes from '@/routes/admin';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import { formatCurrency, formatDateTime, importVehicleName, requesterName, supplierName } from '@/components/admin/imports/helpers';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import PaymentSummaryCard from '@/components/admin/imports/payment-summary-card';
import type { ImportPayment, ImportRequest } from '@/components/admin/imports/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ importPayment }: { importPayment: ImportPayment }) {
  const vehicleImport = importPayment.vehicle_import;
  const payments = vehicleImport?.payments ?? [];
  const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const outstandingBalance = (vehicleImport?.estimated_cost ?? 0) - totalPaid;

  if (!vehicleImport) {
    return (
      <ImportShell title="Payment Details" description="Payment information" actions={<ImportBackButton href={adminRoutes.importPayments.index().url} />}>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">No import request associated with this payment.</p>
          </CardContent>
        </Card>
      </ImportShell>
    );
  }

  return (
    <ImportShell title={`Payment for ${importVehicleName(vehicleImport)}`} description={`Payment #${importPayment.id} · Updated ${formatDateTime(importPayment.updated_at)}`} actions={<><ImportBackButton href={adminRoutes.importPayments.index().url} /><Button variant="outline" asChild><Link href={adminRoutes.imports.show(vehicleImport.id).url}><Eye className="mr-2 size-4" />View Request</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Payment details</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {vehicleImport.customer ? <CustomerAvatar customer={vehicleImport.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Amount</p><p className="font-semibold">{formatCurrency(importPayment.amount)}</p></div>
              <div><p className="text-sm text-muted-foreground">Currency</p><p>{importPayment.currency}</p></div>
              <div><p className="text-sm text-muted-foreground">Payment method</p><p>{importPayment.payment_method ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Status</p><ImportStatusBadge status={importPayment.status} /></div>
              <div><p className="text-sm text-muted-foreground">Due date</p><p>{formatDateTime(importPayment.due_date)}</p></div>
              <div><p className="text-sm text-muted-foreground">Paid date</p><p>{formatDateTime(importPayment.paid_at)}</p></div>
              <div><p className="text-sm text-muted-foreground">Transaction reference</p><p>{importPayment.transaction_reference ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{requesterName(vehicleImport)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Payment summary</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Estimated cost</p><p className="font-semibold">{formatCurrency(vehicleImport.estimated_cost)}</p><p className="text-sm text-muted-foreground">Total paid</p><p className="font-semibold">{formatCurrency(totalPaid)}</p><p className="text-sm text-muted-foreground">Outstanding balance</p><p className="font-semibold">{formatCurrency(outstandingBalance)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Vehicle details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{importVehicleName(vehicleImport)}</p><p className="text-sm text-muted-foreground">Stock {vehicleImport.vehicle?.stock_number ?? '—'}</p><p className="text-sm text-muted-foreground">VIN {vehicleImport.vehicle?.vin ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Supplier details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{supplierName(vehicleImport.supplier)}</p><p className="text-sm text-muted-foreground">{vehicleImport.supplier?.email ?? '—'}</p><p className="text-sm text-muted-foreground">{vehicleImport.supplier?.phone ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Import status</CardTitle></CardHeader><CardContent className="space-y-2"><ImportStatusBadge status={vehicleImport.status} /><p className="text-sm text-muted-foreground">Current stage: {vehicleImport.current_stage ?? '—'}</p><p className="text-sm text-muted-foreground">Estimated arrival: {formatDateTime(vehicleImport.estimated_arrival)}</p></CardContent></Card>
        {importPayment.notes && (
          <Card className="lg:col-span-3"><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent><p className="text-sm">{importPayment.notes}</p></CardContent></Card>
        )}
        <Card className="lg:col-span-3"><CardHeader><CardTitle>Payment history</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{payments.length ? payments.map((payment) => <PaymentSummaryCard key={payment.id} payment={payment} />) : <p className="text-sm text-muted-foreground">No payments recorded.</p>}</CardContent></Card>
        <Card className="lg:col-span-3"><CardHeader><CardTitle>Payment breakdown</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-sm text-muted-foreground">Deposit</p><p className="font-semibold">{formatCurrency(payments.find(p => p.payment_type === 'deposit')?.amount ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Supplier payment</p><p className="font-semibold">{formatCurrency(payments.find(p => p.payment_type === 'supplier')?.amount ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Shipping payment</p><p className="font-semibold">{formatCurrency(payments.find(p => p.payment_type === 'shipping')?.amount ?? 0)}</p></div><div><p className="text-sm text-muted-foreground">Customs & taxes</p><p className="font-semibold">{formatCurrency(payments.find(p => p.payment_type === 'customs')?.amount ?? 0)}</p></div></CardContent></Card>
      </div>
    </ImportShell>
  );
}
