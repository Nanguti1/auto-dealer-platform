import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ImportRequest } from './types';

export default function ImportForm({ vehicleImport, action }: { vehicleImport?: ImportRequest; action: string }) {
  return (
    <Form action={action} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={vehicleImport ? 'put' : 'post'} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="reference_number">Reference number</Label>
              <Input id="reference_number" name="reference_number" defaultValue={vehicleImport?.reference_number ?? ''} />
              <InputError message={errors.reference_number} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin_country">Origin country</Label>
              <Input id="origin_country" name="origin_country" defaultValue={vehicleImport?.origin_country ?? ''} />
              <InputError message={errors.origin_country} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination_port">Destination port</Label>
              <Input id="destination_port" name="destination_port" defaultValue={vehicleImport?.destination_port ?? ''} />
              <InputError message={errors.destination_port} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_cost">Estimated cost</Label>
              <Input id="estimated_cost" name="estimated_cost" type="number" step="0.01" defaultValue={vehicleImport?.estimated_cost ?? ''} />
              <InputError message={errors.estimated_cost} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" defaultValue={vehicleImport?.status ?? 'pending'} />
              <InputError message={errors.status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier_id">Supplier ID</Label>
              <Input id="supplier_id" name="supplier_id" type="number" defaultValue={String(vehicleImport?.supplier_id ?? '')} />
              <InputError message={errors.supplier_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle_id">Vehicle ID</Label>
              <Input id="vehicle_id" name="vehicle_id" type="number" defaultValue={String(vehicleImport?.vehicle_id ?? '')} />
              <InputError message={errors.vehicle_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_id">User ID</Label>
              <Input id="user_id" name="user_id" type="number" defaultValue={String(vehicleImport?.user_id ?? '')} />
              <InputError message={errors.user_id} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="request_data">Request data (JSON)</Label>
            <Textarea id="request_data" name="request_data" rows={6} defaultValue={JSON.stringify(vehicleImport?.request_data ?? {}, null, 2)} />
            <InputError message={errors.request_data} />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save import request'}</Button>
        </>
      )}
    </Form>
  );
}
