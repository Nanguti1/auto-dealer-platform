import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Receipt } from '@/components/admin/payments/types';

export default function ReceiptForm({ receipt, action, method = 'post' }: { receipt?: Receipt; action: string; method?: 'post' | 'put' }) {
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
          label="Payment ID"
          type="number"
          value={String(receipt?.payment_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="customer_id"
          label="Customer ID"
          type="number"
          value={String(receipt?.customer_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="receipt_number"
          label="Receipt number"
          value={receipt?.receipt_number ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="amount"
          label="Amount"
          type="number"
          step="0.01"
          value={String(receipt?.amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="currency"
          label="Currency"
          value={receipt?.currency ?? 'USD'}
          onChange={() => {}}
        />
        <FormField
          name="payment_method"
          label="Payment method"
          value={receipt?.payment_method ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="issued_at"
          label="Issued date"
          type="datetime-local"
          value={receipt?.issued_at ? new Date(receipt.issued_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={receipt?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
