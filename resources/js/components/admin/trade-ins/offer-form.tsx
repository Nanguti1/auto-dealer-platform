import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { TradeInOffer } from './types';

export default function OfferForm({ offer, action, tradeInRequestId }: { offer?: TradeInOffer; action: string; tradeInRequestId?: number }) {
  return (
    <FormShell
      action={action}
      method={offer ? 'put' : 'post'}
      submitLabel="Save offer"
      className="max-w-3xl"
    >
      {tradeInRequestId && <input type="hidden" name="trade_in_request_id" value={tradeInRequestId} />}
      <FormSection title="Offer Details" gridCols={2}>
        <FormField
          name="offer_amount"
          label="Offer amount"
          type="number"
          value={String(offer?.offer_amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="valid_until"
          label="Expiration date"
          type="datetime-local"
          value={offer?.valid_until ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={offer?.status ?? 'pending'}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Notes" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={offer?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
