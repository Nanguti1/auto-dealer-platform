import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { ImportRequest } from './types';
import * as React from 'react';

export default function ImportForm({ vehicleImport, action, method = 'post' }: { vehicleImport?: ImportRequest; action: string; method?: 'post' | 'put' }) {
  const [referenceNumber, setReferenceNumber] = React.useState(vehicleImport?.reference_number ?? '');
  const [originCountry, setOriginCountry] = React.useState(vehicleImport?.origin_country ?? '');
  const [destinationPort, setDestinationPort] = React.useState(vehicleImport?.destination_port ?? '');
  const [estimatedCost, setEstimatedCost] = React.useState(String(vehicleImport?.estimated_cost ?? ''));
  const [status, setStatus] = React.useState(vehicleImport?.status ?? 'pending');
  const [supplierId, setSupplierId] = React.useState(String(vehicleImport?.supplier_id ?? ''));
  const [vehicleId, setVehicleId] = React.useState(String(vehicleImport?.vehicle_id ?? ''));
  const [userId, setUserId] = React.useState(String(vehicleImport?.user_id ?? ''));
  const [requestData, setRequestData] = React.useState(JSON.stringify(vehicleImport?.request_data ?? {}, null, 2));

  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save import request"
      className="max-w-4xl"
    >
      <FormSection title="Basic Information" gridCols={3}>
        <FormField
          name="reference_number"
          label="Reference number"
          value={referenceNumber}
          onChange={setReferenceNumber}
        />
        <FormField
          name="origin_country"
          label="Origin country"
          value={originCountry}
          onChange={setOriginCountry}
        />
        <FormField
          name="destination_port"
          label="Destination port"
          value={destinationPort}
          onChange={setDestinationPort}
        />
        <FormField
          name="estimated_cost"
          label="Estimated cost"
          type="number"
          step="0.01"
          value={estimatedCost}
          onChange={setEstimatedCost}
        />
        <FormField
          name="status"
          label="Status"
          value={status}
          onChange={setStatus}
        />
        <FormField
          name="supplier_id"
          label="Supplier ID"
          type="number"
          value={supplierId}
          onChange={setSupplierId}
        />
        <FormField
          name="vehicle_id"
          label="Vehicle ID"
          type="number"
          value={vehicleId}
          onChange={setVehicleId}
        />
        <FormField
          name="user_id"
          label="User ID"
          type="number"
          value={userId}
          onChange={setUserId}
        />
      </FormSection>

      <FormSection title="Request Data" gridCols={1} fullWidth>
        <FormField
          name="request_data"
          label="Request data (JSON)"
          type="textarea"
          value={requestData}
          onChange={setRequestData}
          className="font-mono text-xs"
        />
      </FormSection>
    </FormShell>
  );
}
