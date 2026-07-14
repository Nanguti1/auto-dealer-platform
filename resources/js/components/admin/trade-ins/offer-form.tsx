import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { TradeInOffer } from './types';
import * as React from 'react';

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function OfferForm({ offer, action, tradeInRequestId }: { offer?: TradeInOffer; action: string; tradeInRequestId?: number }) {
  const { data, setData, post, put, processing, errors } = useForm({
    offer_amount: String(offer?.offer_amount ?? ''),
    valid_until: formatDate(offer?.valid_until),
    status: offer?.status ?? 'pending',
    notes: offer?.notes ?? '',
    trade_in_request_id: String(tradeInRequestId ?? ''),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offer) {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {offer && <input type="hidden" name="_method" value="put" />}
      {tradeInRequestId && <input type="hidden" name="trade_in_request_id" value={tradeInRequestId} />}
      
      <FormSection title="Offer Details" gridCols={2}>
        <FormField
          name="offer_amount"
          label="Offer amount"
          type="number"
          value={data.offer_amount}
          error={errors.offer_amount}
          onChange={(value) => setData('offer_amount', value)}
        />
        <FormField
          name="valid_until"
          label="Expiration date"
          type="datetime-local"
          value={data.valid_until}
          error={errors.valid_until}
          onChange={(value) => setData('valid_until', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={data.status}
          error={errors.status}
          onChange={(value) => setData('status', value)}
        />
      </FormSection>

      <FormSection title="Notes" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={data.notes}
          error={errors.notes}
          onChange={(value) => setData('notes', value)}
        />
      </FormSection>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save offer'}
        </Button>
      </div>
    </form>
  );
}
