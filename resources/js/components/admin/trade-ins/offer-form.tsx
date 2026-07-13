import * as React from 'react';
import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { TradeInOffer } from './types';

export default function OfferForm({ offer, action, tradeInRequestId }: { offer?: TradeInOffer; action: string; tradeInRequestId?: number }) {
  const [formData, setFormData] = React.useState({
    offer_amount: String(offer?.offer_amount ?? ''),
    valid_until: offer?.valid_until ? new Date(offer.valid_until).toISOString().slice(0, 16) : '',
    status: offer?.status ?? 'pending',
    notes: offer?.notes ?? '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          value={formData.offer_amount}
          onChange={(value) => handleChange('offer_amount', value)}
        />
        <FormField
          name="valid_until"
          label="Expiration date"
          type="datetime-local"
          value={formData.valid_until}
          onChange={(value) => handleChange('valid_until', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={formData.status}
          onChange={(value) => handleChange('status', value)}
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
