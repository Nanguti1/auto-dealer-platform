import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Payment } from './types';

export default function PaymentForm({ payment, action }: { payment?: Payment; action: string }) {
  return (
    <FormShell
      action={action}
      method={payment ? 'put' : 'post'}
      submitLabel="Save payment"
      className="max-w-4xl"
    >
      <FormSection title="References" gridCols={3}>
        <FormField
          name="user_id"
          label="Customer ID"
          type="number"
          value={String(payment?.user_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="vehicle_id"
          label="Vehicle ID"
          type="number"
          value={String(payment?.vehicle_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="vehicle_reservation_id"
          label="Reservation ID"
          type="number"
          value={String(payment?.vehicle_reservation_id ?? '')}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Payment Details" gridCols={3}>
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
          name="method"
          label="Payment method"
          value={payment?.method ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={payment?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="transaction_reference"
          label="Transaction reference"
          value={payment?.transaction_reference ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="paid_at"
          label="Payment date"
          type="datetime-local"
          value={payment?.paid_at ? new Date(payment.paid_at).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Metadata" gridCols={1} fullWidth>
        <FormField
          name="metadata"
          label="Metadata (JSON)"
          type="textarea"
          value={JSON.stringify(payment?.metadata ?? {}, null, 2)}
          onChange={() => {}}
          className="font-mono text-xs"
        />
      </FormSection>
    </FormShell>
  );
}
