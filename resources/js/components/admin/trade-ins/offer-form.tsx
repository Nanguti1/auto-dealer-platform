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
          name="amount"
          label="Offer amount"
          type="number"
          value={String(offer?.amount ?? offer?.offer_amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="expires_at"
          label="Expiration date"
          type="datetime-local"
          value={offer?.expires_at ?? offer?.expiration_date ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={offer?.status ?? 'draft'}
          onChange={() => {}}
        />
        <FormField
          name="approval_status"
          label="Approval status"
          value={offer?.approval_status ?? 'pending'}
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
