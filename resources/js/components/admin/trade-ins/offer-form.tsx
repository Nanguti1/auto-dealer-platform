import { useForm } from '@inertiajs/react';
import { FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { TradeInOffer } from './types';
import * as React from 'react';

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

function getDefaultExpirationDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30); // Default to 30 days from now
  return date.toISOString().slice(0, 16);
}

interface OfferFormProps {
  offer?: TradeInOffer;
  action: string;
  tradeInRequestId?: number;
  tradeInRequests?: Array<{ id: number; make: string; model: string; year: number; vin?: string }>;
}

export default function OfferForm({ offer, action, tradeInRequestId, tradeInRequests }: OfferFormProps) {
  const hasPreselectedTradeIn = !!tradeInRequestId;

  const { data, setData, post, put, processing, errors } = useForm({
    offer_amount: String(offer?.offer_amount ?? ''),
    valid_until: offer ? formatDate(offer.valid_until) : getDefaultExpirationDate(),
    status: offer?.status ?? 'pending',
    notes: offer?.notes ?? '',
    trade_in_request_id: hasPreselectedTradeIn ? String(tradeInRequestId) : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offer) {
      put(action);
    } else {
      post(action);
    }
  };

  const tradeInRequestOptions = (tradeInRequests || []).map(req => ({
    value: req.id,
    label: `${req.year} ${req.make} ${req.model} ${req.vin ? `(${req.vin})` : ''}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {offer && <input type="hidden" name="_method" value="put" />}
      {hasPreselectedTradeIn && (
        <input type="hidden" name="trade_in_request_id" value={data.trade_in_request_id} />
      )}

      {!hasPreselectedTradeIn && (
        <FormSection title="Trade-In Request" gridCols={1}>
          <ForeignSelector
            name="trade_in_request_id"
            label="Trade-In Request"
            value={data.trade_in_request_id}
            options={tradeInRequestOptions}
            placeholder="Select a trade-in request"
            searchable
            required
            onChange={(value) => setData('trade_in_request_id', value)}
            error={errors.trade_in_request_id}
          />
        </FormSection>
      )}

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
          required
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
