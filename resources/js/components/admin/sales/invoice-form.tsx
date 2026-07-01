import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Invoice } from '@/components/admin/payments/types';

export default function InvoiceForm({ invoice, action, method = 'post' }: { invoice?: Invoice; action: string; method?: 'post' | 'put' }) {
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
          label="Customer ID"
          type="number"
          value={String(invoice?.customer_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="vehicle_id"
          label="Vehicle ID"
          type="number"
          value={String(invoice?.vehicle_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="reservation_id"
          label="Reservation ID"
          type="number"
          value={String(invoice?.reservation_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="invoice_number"
          label="Invoice number"
          value={invoice?.invoice_number ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="subtotal"
          label="Subtotal"
          type="number"
          step="0.01"
          value={String(invoice?.subtotal ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="tax_amount"
          label="Tax amount"
          type="number"
          step="0.01"
          value={String(invoice?.tax_amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="total_amount"
          label="Total amount"
          type="number"
          step="0.01"
          value={String(invoice?.total_amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="currency"
          label="Currency"
          value={invoice?.currency ?? 'USD'}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={invoice?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="due_date"
          label="Due date"
          type="datetime-local"
          value={invoice?.due_date ? new Date(invoice.due_date).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
        <FormField
          name="paid_at"
          label="Paid date"
          type="datetime-local"
          value={invoice?.paid_at ? new Date(invoice.paid_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={invoice?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
