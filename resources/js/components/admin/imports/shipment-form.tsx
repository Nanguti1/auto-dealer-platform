import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Shipment } from '@/components/admin/imports/types';

export default function ShipmentForm({ shipment, action, method = 'post' }: { shipment?: Shipment; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save shipment"
      className="max-w-4xl"
    >
      <FormSection title="Shipment Details" gridCols={3}>
        <FormField
          name="import_request_id"
          label="Import request ID"
          type="number"
          value={String(shipment?.import_request_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="tracking_number"
          label="Tracking number"
          value={shipment?.tracking_number ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="carrier"
          label="Carrier"
          value={shipment?.carrier ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="origin"
          label="Origin"
          value={shipment?.origin ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="destination"
          label="Destination"
          value={shipment?.destination ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={shipment?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="estimated_arrival"
          label="Estimated arrival"
          type="datetime-local"
          value={shipment?.estimated_arrival ? new Date(shipment.estimated_arrival).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
        <FormField
          name="actual_arrival"
          label="Actual arrival"
          type="datetime-local"
          value={shipment?.actual_arrival ? new Date(shipment.actual_arrival).toISOString().slice(0, 16) : ''}
          onChange={() => {}}
        />
        <FormField
          name="shipping_cost"
          label="Shipping cost"
          type="number"
          step="0.01"
          value={String(shipment?.shipping_cost ?? '')}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={shipment?.notes ?? ''}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
