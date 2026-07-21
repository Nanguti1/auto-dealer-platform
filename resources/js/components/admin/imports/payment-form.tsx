import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { ImportPayment } from '@/components/admin/imports/types';

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function PaymentForm({ payment, action, method = 'post', importRequests }: { payment?: ImportPayment; action: string; method?: 'post' | 'put'; importRequests?: Array<{ id: number; reference_number: string; origin_country: string }> }) {
  const { data, setData, post, put, processing, errors } = useForm({
    vehicle_import_id: String(payment?.vehicle_import_id ?? ''),
    amount: String(payment?.amount ?? ''),
    currency: payment?.currency ?? 'USD',
    payment_method: payment?.payment_method ?? '',
    status: payment?.status ?? 'pending',
    due_date: formatDate(payment?.due_date),
    paid_at: formatDate(payment?.paid_at),
    transaction_reference: payment?.transaction_reference ?? '',
    notes: payment?.notes ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'put') {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {method === 'put' && <input type="hidden" name="_method" value="put" />}

      <FormSection title="Payment Details" gridCols={3}>
        <FormField
          name="vehicle_import_id"
          label="Import Request"
          type="select"
          value={data.vehicle_import_id}
          error={errors.vehicle_import_id}
          onChange={(value) => setData('vehicle_import_id', value)}
          options={importRequests?.map(req => ({
            value: String(req.id),
            label: `${req.reference_number} - ${req.origin_country}`,
          })) ?? []}
        />
        <FormField
          name="amount"
          label="Amount"
          type="number"
          step="0.01"
          value={data.amount}
          error={errors.amount}
          onChange={(value) => setData('amount', value)}
        />
        <FormField
          name="currency"
          label="Currency"
          value={data.currency}
          error={errors.currency}
          onChange={(value) => setData('currency', value)}
        />
        <FormField
          name="payment_method"
          label="Payment method"
          value={data.payment_method}
          error={errors.payment_method}
          onChange={(value) => setData('payment_method', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={data.status}
          error={errors.status}
          onChange={(value) => setData('status', value)}
        />
        <FormField
          name="due_date"
          label="Due date"
          type="datetime-local"
          value={data.due_date}
          error={errors.due_date}
          onChange={(value) => setData('due_date', value)}
        />
        <FormField
          name="paid_at"
          label="Paid date"
          type="datetime-local"
          value={data.paid_at}
          error={errors.paid_at}
          onChange={(value) => setData('paid_at', value)}
        />
        <FormField
          name="transaction_reference"
          label="Transaction reference"
          value={data.transaction_reference}
          error={errors.transaction_reference}
          onChange={(value) => setData('transaction_reference', value)}
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
          {processing ? 'Saving...' : 'Save payment'}
        </Button>
      </div>
    </form>
  );
}
