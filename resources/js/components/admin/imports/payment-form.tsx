import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { ImportPayment } from '@/components/admin/imports/types';

export default function PaymentForm({ payment, action, method = 'post' }: { payment?: ImportPayment; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save payment"
      className="max-w-4xl"
    >
      <FormSection title="Payment Details" gridCols={3}>
        <FormField
          name="import_request_id"
          label="Import request ID"
          type="number"
          value={String(payment?.import_request_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="amount"
          label="Amount"
          type="number"
          step="0.01"
          value={String(payment?.amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="currency"
          label="Currency"
          value={payment?.currency ?? 'USD'}
          onChange={() => {}}
        />
        <FormField
          name="payment_method"
          label="Payment method"
          value={payment?.payment_method ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={payment?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="due_date"
          label="Due date"
          type="datetime-local"
          value={payment?.due_date ? new Date(payment.due_date).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
        <FormField
          name="paid_at"
          label="Paid date"
          type="datetime-local"
          value={payment?.paid_at ? new Date(payment.paid_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
        <FormField
          name="transaction_reference"
          label="Transaction reference"
          value={payment?.transaction_reference ?? ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Notes" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={payment?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
