import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Invoice } from '@/components/admin/payments/types';

interface Vehicle {
  id: number;
  stock_number: string;
  make?: { id: number; name: string };
  vehicleModel?: { id: number; name: string };
}

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  customer_number: string;
}

interface Reservation {
  id: number;
  customer?: {
    first_name: string;
    last_name: string;
  };
}

export default function InvoiceForm({
  invoice,
  action,
  method = 'post',
  vehicles = [],
  customers = [],
  reservations = [],
}: {
  invoice?: Invoice;
  action: string;
  method?: 'post' | 'put';
  vehicles?: Vehicle[];
  customers?: Customer[];
  reservations?: Reservation[];
}) {
  const [formData, setFormData] = React.useState({
    customer_id: String(invoice?.customer_id ?? ''),
    vehicle_id: String(invoice?.vehicle_id ?? ''),
    subtotal: String(invoice?.subtotal ?? ''),
    tax_total: String(invoice?.tax_total ?? ''),
    total: String(invoice?.total ?? ''),
    status: invoice?.status ?? 'draft',
    issued_at: invoice?.issued_at ? new Date(invoice.issued_at).toISOString().slice(0, 16) : '',
    due_at: invoice?.due_at ? new Date(invoice.due_at).toISOString().slice(0, 16) : '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const vehicleOptions = vehicles.map(v => ({
    value: String(v.id),
    label: `${v.stock_number} - ${v.make?.name || 'Unknown Make'} ${v.vehicleModel?.name || 'Unknown Model'}`,
  }));

  const customerOptions = customers.map(c => ({
    value: String(c.id),
    label: `${c.first_name} ${c.last_name} (${c.email || 'No email'}) - ${c.customer_number}`,
  }));

  const reservationOptions = reservations.map(r => ({
    value: String(r.id),
    label: `Reservation #${r.id} - ${r.customer?.first_name || 'Unknown'} ${r.customer?.last_name || ''}`,
  }));

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save invoice"
      className="max-w-4xl"
    >
      {({ errors }) => (
        <>
          <FormSection title="Invoice Details" gridCols={3}>
            <FormField
              name="customer_id"
              label="Customer"
              type="select"
              value={formData.customer_id}
              onChange={(value) => handleChange('customer_id', value)}
              options={customerOptions}
              error={errors.customer_id}
            />
            <FormField
              name="vehicle_id"
              label="Vehicle"
              type="select"
              value={formData.vehicle_id}
              onChange={(value) => handleChange('vehicle_id', value)}
              options={vehicleOptions}
              error={errors.vehicle_id}
            />
            <FormField
              name="subtotal"
              label="Subtotal"
              type="number"
              step="0.01"
              value={formData.subtotal}
              onChange={(value) => handleChange('subtotal', value)}
              error={errors.subtotal}
            />
            <FormField
              name="tax_total"
              label="Tax amount"
              type="number"
              step="0.01"
              value={formData.tax_total}
              onChange={(value) => handleChange('tax_total', value)}
              error={errors.tax_total}
            />
            <FormField
              name="total"
              label="Total amount"
              type="number"
              step="0.01"
              value={formData.total}
              onChange={(value) => handleChange('total', value)}
              error={errors.total}
            />
            <FormField
              name="status"
              label="Status"
              type="select"
              value={formData.status}
              onChange={(value) => handleChange('status', value)}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'sent', label: 'Sent' },
                { value: 'paid', label: 'Paid' },
                { value: 'overdue', label: 'Overdue' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
              error={errors.status}
            />
            <FormField
              name="issued_at"
              label="Issued date"
              type="datetime-local"
              value={formData.issued_at}
              onChange={(value) => handleChange('issued_at', value)}
              error={errors.issued_at}
            />
            <FormField
              name="due_at"
              label="Due date"
              type="datetime-local"
              value={formData.due_at}
              onChange={(value) => handleChange('due_at', value)}
              error={errors.due_at}
            />
          </FormSection>
        </>
      )}
    </FormShell>
  );
}
