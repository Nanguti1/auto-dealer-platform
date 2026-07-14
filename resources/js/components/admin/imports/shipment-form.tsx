import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { Shipment } from '@/components/admin/imports/types';
import * as React from 'react';

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function ShipmentForm({ shipment, action, method = 'post' }: { shipment?: Shipment; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    import_request_id: String(shipment?.import_request_id ?? ''),
    tracking_number: shipment?.tracking_number ?? '',
    carrier: shipment?.carrier ?? '',
    origin: shipment?.origin ?? '',
    destination: shipment?.destination ?? '',
    status: shipment?.status ?? 'pending',
    estimated_arrival: formatDate(shipment?.estimated_arrival),
    actual_arrival: formatDate(shipment?.actual_arrival),
    shipping_cost: String(shipment?.shipping_cost ?? ''),
    notes: shipment?.notes ?? '',
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
      
      <FormSection title="Shipment Details" gridCols={3}>
        <FormField
          name="import_request_id"
          label="Import request ID"
          type="number"
          value={data.import_request_id}
          error={errors.import_request_id}
          onChange={(value) => setData('import_request_id', value)}
        />
        <FormField
          name="tracking_number"
          label="Tracking number"
          value={data.tracking_number}
          error={errors.tracking_number}
          onChange={(value) => setData('tracking_number', value)}
        />
        <FormField
          name="carrier"
          label="Carrier"
          value={data.carrier}
          error={errors.carrier}
          onChange={(value) => setData('carrier', value)}
        />
        <FormField
          name="origin"
          label="Origin"
          value={data.origin}
          error={errors.origin}
          onChange={(value) => setData('origin', value)}
        />
        <FormField
          name="destination"
          label="Destination"
          value={data.destination}
          error={errors.destination}
          onChange={(value) => setData('destination', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={data.status}
          error={errors.status}
          onChange={(value) => setData('status', value)}
        />
        <FormField
          name="estimated_arrival"
          label="Estimated arrival"
          type="datetime-local"
          value={data.estimated_arrival}
          error={errors.estimated_arrival}
          onChange={(value) => setData('estimated_arrival', value)}
        />
        <FormField
          name="actual_arrival"
          label="Actual arrival"
          type="datetime-local"
          value={data.actual_arrival}
          error={errors.actual_arrival}
          onChange={(value) => setData('actual_arrival', value)}
        />
        <FormField
          name="shipping_cost"
          label="Shipping cost"
          type="number"
          step="0.01"
          value={data.shipping_cost}
          error={errors.shipping_cost}
          onChange={(value) => setData('shipping_cost', value)}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1} fullWidth>
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
          {processing ? 'Saving...' : 'Save shipment'}
        </Button>
      </div>
    </form>
  );
}
