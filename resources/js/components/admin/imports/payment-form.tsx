import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { ImportPayment } from '@/components/admin/imports/types';

export default function PaymentForm({ payment, action, method = 'post', importRequests }: { payment?: ImportPayment; action: string; method?: 'post' | 'put'; importRequests?: Array<{ id: number; reference_number: string; origin_country: string }> }) {
  const [formData, setFormData] = React.useState({
    vehicle_import_id: String(payment?.vehicle_import_id ?? ''),
    amount: String(payment?.amount ?? ''),
    currency: payment?.currency ?? 'USD',
    payment_method: payment?.payment_method ?? '',
    status: payment?.status ?? 'pending',
    due_date: payment?.due_date ? new Date(payment.due_date).toISOString().slice(0, 16) : '',
    paid_at: payment?.paid_at ? new Date(payment.paid_at).toISOString().slice(0, 16) : '',
    transaction_reference: payment?.transaction_reference ?? '',
    notes: payment?.notes ?? '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save payment"
      className="max-w-4xl"
    >
      <FormSection title="Payment Details" gridCols={3}>
        <FormField
          name="vehicle_import_id"
          label="Import Request"
          type="select"
          value={formData.vehicle_import_id}
          onChange={(value) => handleChange('vehicle_import_id', value)}
          options={importRequests?.map(req => ({
            value: String(req.id),
            label: `${req.reference_number} - ${req.origin_country}`,
          })) ?? []}
        />
        <FormField
          name="amount"
          label="Amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(value) => handleChange('amount', value)}
        />
        <FormField
          name="currency"
          label="Currency"
          value={formData.currency}
          onChange={(value) => handleChange('currency', value)}
        />
        <FormField
          name="payment_method"
          label="Payment method"
          value={formData.payment_method}
          onChange={(value) => handleChange('payment_method', value)}
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
        <FormField
          name="transaction_reference"
          label="Transaction reference"
          value={formData.transaction_reference}
          onChange={(value) => handleChange('transaction_reference', value)}
        />
      </FormSection>

      <FormSection title="Notes" gridCols={1} fullWidth>
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
