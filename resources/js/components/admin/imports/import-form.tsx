import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { ImportRequest } from './types';

export default function ImportForm({ vehicleImport, action, method = 'post' }: { vehicleImport?: ImportRequest; action: string; method?: 'post' | 'put' }) {
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
          value={vehicleImport?.reference_number ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="origin_country"
          label="Origin country"
          value={vehicleImport?.origin_country ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="destination_port"
          label="Destination port"
          value={vehicleImport?.destination_port ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="estimated_cost"
          label="Estimated cost"
          type="number"
          step="0.01"
          value={String(vehicleImport?.estimated_cost ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={vehicleImport?.status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="supplier_id"
          label="Supplier ID"
          type="number"
          value={String(vehicleImport?.supplier_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="vehicle_id"
          label="Vehicle ID"
          type="number"
          value={String(vehicleImport?.vehicle_id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="user_id"
          label="User ID"
          type="number"
          value={String(vehicleImport?.user_id ?? '')}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Request Data" gridCols={1} fullWidth>
        <FormField
          name="request_data"
          label="Request data (JSON)"
          type="textarea"
          value={JSON.stringify(vehicleImport?.request_data ?? {}, null, 2)}
          onChange={() => {}}
          className="font-mono text-xs"
        />
      </FormSection>
    </FormShell>
  );
}
