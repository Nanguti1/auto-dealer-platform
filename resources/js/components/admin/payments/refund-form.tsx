import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Refund } from './types';

export default function RefundForm({ refund, action }: { refund?: Refund; action: string }) {
  return (
    <FormShell
      action={action}
      method={refund ? 'put' : 'post'}
      submitLabel="Save refund"
      className="max-w-4xl"
    >
      <FormSection title="Refund Details" gridCols={3}>
        <FormField
          name="payment_id"
          label="Payment ID"
          type="number"
          value={String(refund?.payment_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="amount"
          label="Refund amount"
          type="number"
          step="0.01"
          value={String(refund?.amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="currency"
          label="Currency"
          value={refund?.currency ?? 'USD'}
          onChange={() => {}}
        />
        <FormField
          name="refund_method"
          label="Refund method"
          value={refund?.refund_method ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={refund?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="processed_at"
          label="Processed date"
          type="datetime-local"
          value={refund?.processed_at ? new Date(refund.processed_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Reason" gridCols={1} fullWidth>
        <FormField
          name="reason"
          label="Reason for refund"
          type="textarea"
          value={refund?.reason ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
