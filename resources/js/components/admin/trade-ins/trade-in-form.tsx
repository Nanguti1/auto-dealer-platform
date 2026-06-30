import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { TradeInRequest } from './types';

export default function TradeInForm({ tradeInRequest, action, method = 'post' }: { tradeInRequest?: TradeInRequest; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save trade-in request"
      className="max-w-4xl"
    >
      <FormSection title="Vehicle Information" gridCols={3}>
        <FormField
          name="year"
          label="Year"
          type="number"
          value={String(tradeInRequest?.year ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="make"
          label="Make"
          value={tradeInRequest?.make ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="model"
          label="Model"
          value={tradeInRequest?.model ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="vin"
          label="VIN"
          value={tradeInRequest?.vin ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="mileage"
          label="Mileage"
          type="number"
          value={String(tradeInRequest?.mileage ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={tradeInRequest?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="estimated_value"
          label="Estimated value"
          type="number"
          value={String(tradeInRequest?.estimated_value ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="offered_value"
          label="Offered value"
          type="number"
          value={String(tradeInRequest?.offered_value ?? '')}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Condition Report" gridCols={1} fullWidth>
        <FormField
          name="condition_report"
          label="Condition report"
          type="textarea"
          value={JSON.stringify(tradeInRequest?.condition_report ?? {}, null, 2)}
          onChange={() => {}}
          className="font-mono text-xs"
        />
      </FormSection>
    </FormShell>
  );
}
