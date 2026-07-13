import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Invoice } from '@/components/admin/payments/types';

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Vehicle {
  id: number;
  stock_number: string;
  make: { id: number; name: string };
  model: { id: number; name: string };
}

interface Reservation {
  id: number;
  reservation_number: string;
  customer: { id: number; name: string };
}

export default function InvoiceForm({
  invoice,
  action,
  method = 'post',
  customers = [],
  vehicles = [],
  reservations = [],
}: {
  invoice?: Invoice;
  action: string;
  method?: 'post' | 'put';
  customers?: Customer[];
  vehicles?: Vehicle[];
  reservations?: Reservation[];
}) {
  const [formData, setFormData] = React.useState({
    customer_id: String(invoice?.customer_id ?? ''),
    vehicle_id: String(invoice?.vehicle_id ?? ''),
    reservation_id: String(invoice?.reservation_id ?? ''),
    subtotal: String(invoice?.subtotal ?? ''),
    tax_amount: String(invoice?.tax_amount ?? ''),
    total_amount: String(invoice?.total_amount ?? ''),
    currency: invoice?.currency ?? 'USD',
    status: invoice?.status ?? 'pending',
    due_date: invoice?.due_date ? new Date(invoice.due_date).toISOString().slice(0, 16) : '',
    paid_at: invoice?.paid_at ? new Date(invoice.paid_at).toISOString().slice(0, 16) : '',
    notes: invoice?.notes ?? '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const vehicleOptions = vehicles.map(v => ({
    value: String(v.id),
    label: `${v.stock_number} - ${v.make.name} ${v.model.name}`,
  }));

  const customerOptions = customers.map(c => ({
    value: String(c.id),
    label: `${c.name} (${c.email})`,
  }));

  const reservationOptions = reservations.map(r => ({
    value: String(r.id),
    label: `${r.reservation_number} - ${r.customer.name}`,
  }));

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save invoice"
      className="max-w-4xl"
    >
      <FormSection title="Invoice Details" gridCols={3}>
        <FormField
          name="customer_id"
          label="Customer"
          type="select"
          value={formData.customer_id}
          onChange={(value) => handleChange('customer_id', value)}
          options={customerOptions}
        />
        <FormField
          name="vehicle_id"
          label="Vehicle"
          type="select"
          value={formData.vehicle_id}
          onChange={(value) => handleChange('vehicle_id', value)}
          options={vehicleOptions}
        />
        <FormField
          name="reservation_id"
          label="Reservation"
          type="select"
          value={formData.reservation_id}
          onChange={(value) => handleChange('reservation_id', value)}
          options={[{ value: '', label: 'No reservation' }, ...reservationOptions]}
        />
        <FormField
          name="subtotal"
          label="Subtotal"
          type="number"
          step="0.01"
          value={formData.subtotal}
          onChange={(value) => handleChange('subtotal', value)}
        />
        <FormField
          name="tax_amount"
          label="Tax amount"
          type="number"
          step="0.01"
          value={formData.tax_amount}
          onChange={(value) => handleChange('tax_amount', value)}
        />
        <FormField
          name="total_amount"
          label="Total amount"
          type="number"
          step="0.01"
          value={formData.total_amount}
          onChange={(value) => handleChange('total_amount', value)}
        />
        <FormField
          name="currency"
          label="Currency"
          value={formData.currency}
          onChange={(value) => handleChange('currency', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={formData.status}
          onChange={(value) => handleChange('status', value)}
        />
        <FormField
          name="due_date"
          label="Due date"
          type="datetime-local"
          value={formData.due_date}
          onChange={(value) => handleChange('due_date', value)}
        />
        <FormField
          name="paid_at"
          label="Paid date"
          type="datetime-local"
          value={formData.paid_at}
          onChange={(value) => handleChange('paid_at', value)}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={formData.notes}
          onChange={(value) => handleChange('notes', value)}
        />
      </FormSection>
    </FormShell>
  );
}
