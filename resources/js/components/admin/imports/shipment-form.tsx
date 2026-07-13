import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Shipment } from '@/components/admin/imports/types';
import * as React from 'react';

export default function ShipmentForm({ shipment, action, method = 'post' }: { shipment?: Shipment; action: string; method?: 'post' | 'put' }) {
  const [importRequestId, setImportRequestId] = React.useState(String(shipment?.import_request_id ?? ''));
  const [trackingNumber, setTrackingNumber] = React.useState(shipment?.tracking_number ?? '');
  const [carrier, setCarrier] = React.useState(shipment?.carrier ?? '');
  const [origin, setOrigin] = React.useState(shipment?.origin ?? '');
  const [destination, setDestination] = React.useState(shipment?.destination ?? '');
  const [status, setStatus] = React.useState(shipment?.status ?? 'pending');
  const [estimatedArrival, setEstimatedArrival] = React.useState(shipment?.estimated_arrival ? new Date(shipment.estimated_arrival).toISOString().slice(0, 16) : '');
  const [actualArrival, setActualArrival] = React.useState(shipment?.actual_arrival ? new Date(shipment.actual_arrival).toISOString().slice(0, 16) : '');
  const [shippingCost, setShippingCost] = React.useState(String(shipment?.shipping_cost ?? ''));
  const [notes, setNotes] = React.useState(shipment?.notes ?? '');

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
          value={importRequestId}
          onChange={setImportRequestId}
        />
        <FormField
          name="tracking_number"
          label="Tracking number"
          value={trackingNumber}
          onChange={setTrackingNumber}
        />
        <FormField
          name="carrier"
          label="Carrier"
          value={carrier}
          onChange={setCarrier}
        />
        <FormField
          name="origin"
          label="Origin"
          value={origin}
          onChange={setOrigin}
        />
        <FormField
          name="destination"
          label="Destination"
          value={destination}
          onChange={setDestination}
        />
        <FormField
          name="status"
          label="Status"
          value={status}
          onChange={setStatus}
        />
        <FormField
          name="estimated_arrival"
          label="Estimated arrival"
          type="datetime-local"
          value={estimatedArrival}
          onChange={setEstimatedArrival}
        />
        <FormField
          name="actual_arrival"
          label="Actual arrival"
          type="datetime-local"
          value={actualArrival}
          onChange={setActualArrival}
        />
        <FormField
          name="shipping_cost"
          label="Shipping cost"
          type="number"
          step="0.01"
          value={shippingCost}
          onChange={setShippingCost}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={notes}
          onChange={setNotes}
        />
      </FormSection>
    </FormShell>
  );
}
