import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { Refund } from './types';
import * as React from 'react';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'processed', label: 'Processed' },
];

const refundMethodOptions = [
  { value: 'original', label: 'Original payment method' },
  { value: 'bank_transfer', label: 'Bank transfer' },
  { value: 'check', label: 'Check' },
  { value: 'cash', label: 'Cash' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'CAD', label: 'CAD' },
];

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function RefundForm({ refund, action, payments }: { refund?: Refund; action: string; payments?: Array<{ id: number; amount: number; customer?: { name: string } }> }) {
  const paymentOptions = (payments || []).map(payment => ({
    value: payment.id,
    label: `Payment #${payment.id} - $${payment.amount}${payment.customer ? ` (${payment.customer.name})` : ''}`,
  }));

  // If editing an existing refund and no payments provided, create a single option for the current payment
  if (refund?.payment_id && paymentOptions.length === 0) {
    paymentOptions.push({
      value: refund.payment_id,
      label: `Payment #${refund.payment_id}`,
    });
  }

  const { data, setData, post, put, processing, errors } = useForm({
    payment_id: String(refund?.payment_id ?? ''),
    amount: String(refund?.amount ?? ''),
    currency: refund?.currency ?? 'USD',
    refund_method: refund?.refund_method ?? 'original',
    status: refund?.status ?? 'pending',
    processed_at: formatDate(refund?.processed_at),
    reason: refund?.reason ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refund) {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {refund && <input type="hidden" name="_method" value="put" />}
      {refund && <input type="hidden" name="payment_id" value={refund.payment_id} />}
      
      <FormSection title="Refund Details" gridCols={3}>
        {refund ? (
          <FormField
            name="payment_id"
            label="Payment"
            type="text"
            value={`Payment #${refund.payment_id}`}
            disabled
            onChange={() => {}}
          />
        ) : (
          <ForeignSelector
            name="payment_id"
            label="Payment"
            value={data.payment_id}
            options={paymentOptions}
            placeholder="Select a payment"
            searchable
            required
            onChange={(value) => setData('payment_id', value)}
            error={errors.payment_id}
          />
        )}
        <FormField
          name="amount"
          label="Refund amount"
          type="number"
          step="0.01"
          value={data.amount}
          error={errors.amount}
          onChange={(value) => setData('amount', value)}
        />
        <FormField
          name="currency"
          label="Currency"
          type="select"
          value={data.currency}
          error={errors.currency}
          options={currencyOptions}
          onChange={(value) => setData('currency', value)}
        />
        <FormField
          name="refund_method"
          label="Refund method"
          type="select"
          value={data.refund_method}
          error={errors.refund_method}
          options={refundMethodOptions}
          onChange={(value) => setData('refund_method', value)}
        />
        <FormField
          name="status"
          label="Status"
          type="select"
          value={data.status}
          error={errors.status}
          options={statusOptions}
          onChange={(value) => setData('status', value)}
        />
        <FormField
          name="processed_at"
          label="Processed date"
          type="datetime-local"
          value={data.processed_at}
          error={errors.processed_at}
          onChange={(value) => setData('processed_at', value)}
        />
      </FormSection>

      <FormSection title="Reason" gridCols={1} fullWidth>
        <FormField
          name="reason"
          label="Reason for refund"
          type="textarea"
          value={data.reason}
          error={errors.reason}
          onChange={(value) => setData('reason', value)}
        />
      </FormSection>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save refund'}
        </Button>
      </div>
    </form>
  );
}
