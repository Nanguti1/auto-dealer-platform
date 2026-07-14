import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Receipt } from '@/components/admin/payments/types';

interface Payment {
  id: number;
  amount: number;
  currency: string;
  method: string;
  status: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_number: string;
}

export default function ReceiptForm({
  receipt,
  action,
  method = 'post',
  payments = [],
  customers = [],
}: {
  receipt?: Receipt;
  action: string;
  method?: 'post' | 'put';
  payments?: Payment[];
  customers?: Customer[];
}) {
  const [formData, setFormData] = React.useState({
    payment_id: String(receipt?.payment_id ?? ''),
    customer_id: String(receipt?.customer_id ?? ''),
    amount: String(receipt?.amount ?? ''),
    currency: receipt?.currency ?? 'USD',
    issued_at: receipt?.issued_at ? new Date(receipt.issued_at).toISOString().slice(0, 16) : '',
    notes: receipt?.notes ?? '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const paymentOptions = payments.map(p => ({
    value: String(p.id),
    label: `${p.method} - ${p.amount} ${p.currency} (${p.status})${p.user ? ` (${p.user.first_name} ${p.user.last_name})` : ''}`,
  }));

  const customerOptions = customers.map(c => ({
    value: String(c.id),
    label: `${c.first_name} ${c.last_name} (${c.email}) - ${c.customer_number}`,
  }));

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save receipt"
      className="max-w-4xl"
    >
      <FormSection title="Receipt Details" gridCols={3}>
        <FormField
          name="payment_id"
          label="Payment"
          type="select"
          value={formData.payment_id}
          onChange={(value) => handleChange('payment_id', value)}
          options={paymentOptions}
        />
        <FormField
          name="customer_id"
          label="Customer"
          type="select"
          value={formData.customer_id}
          onChange={(value) => handleChange('customer_id', value)}
          options={customerOptions}
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
          name="issued_at"
          label="Issued date"
          type="datetime-local"
          value={formData.issued_at}
          onChange={(value) => handleChange('issued_at', value)}
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
