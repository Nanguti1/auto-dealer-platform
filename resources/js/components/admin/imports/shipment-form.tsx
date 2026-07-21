import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import type { Shipment } from '@/components/admin/imports/types';
import * as React from 'react';

function formatDate(value?: string): string {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

interface Props {
  shipment?: Shipment;
  action: string;
  method?: 'post' | 'put';
  vehicleImports?: Array<{ id: number; reference_number: string }>;
}

export default function ShipmentForm({ shipment, action, method = 'post', vehicleImports = [] }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    vehicle_import_id: String(shipment?.vehicle_import_id ?? ''),
    tracking_number: shipment?.tracking_number ?? '',
    carrier: shipment?.carrier ?? '',
    origin: shipment?.origin ?? '',
    destination: shipment?.destination ?? '',
    status: shipment?.status ?? 'pending',
    current_location: shipment?.current_location ?? '',
    estimated_arrival: formatDate(shipment?.estimated_arrival),
    actual_arrival: formatDate(shipment?.actual_arrival),
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
        <div className="space-y-2">
          <label htmlFor="vehicle_import_id" className="text-sm font-medium">Import Request</label>
          <Select
            value={data.vehicle_import_id}
            onValueChange={(value) => setData('vehicle_import_id', value)}
          >
            <SelectTrigger id="vehicle_import_id">
              <SelectValue placeholder="Select an import request" />
            </SelectTrigger>
            <SelectContent>
              {vehicleImports.map((vehicleImport) => (
                <SelectItem key={vehicleImport.id} value={String(vehicleImport.id)}>
                  {vehicleImport.reference_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.vehicle_import_id && <p className="text-sm text-destructive">{errors.vehicle_import_id}</p>}
        </div>
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
          name="current_location"
          label="Current location"
          value={data.current_location}
          error={errors.current_location}
          onChange={(value) => setData('current_location', value)}
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
