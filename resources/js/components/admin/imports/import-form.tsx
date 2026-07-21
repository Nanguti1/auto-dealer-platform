import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import type { ImportRequest } from './types';
import * as React from 'react';

interface Props {
  vehicleImport?: ImportRequest;
  action: string;
  method?: 'post' | 'put';
  vehicles?: Array<{ id: number; title: string; stock_number: string }>;
  customers?: Array<{ id: number; first_name: string; last_name: string; email: string; user_id?: number | null }>;
  suppliers?: Array<{ id: number; company_name: string }>;
}

export default function ImportForm({ vehicleImport, action, method = 'post', vehicles = [], customers = [], suppliers = [] }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    reference_number: vehicleImport?.reference_number ?? '',
    origin_country: vehicleImport?.origin_country ?? '',
    destination_port: vehicleImport?.destination_port ?? '',
    port_of_loading: vehicleImport?.port_of_loading ?? '',
    shipping_method: vehicleImport?.shipping_method ?? '',
    estimated_cost: String(vehicleImport?.estimated_cost ?? ''),
    status: vehicleImport?.status ?? 'pending',
    supplier_id: String(vehicleImport?.supplier_id ?? ''),
    vehicle_id: String(vehicleImport?.vehicle_id ?? ''),
    customer_id: String(vehicleImport?.customer_id ?? ''),
    user_id: String(vehicleImport?.customer_id ? customers.find(c => c.id === vehicleImport.customer_id)?.user_id : vehicleImport?.user_id ?? ''),
    insurance_value: String(vehicleImport?.insurance_value ?? ''),
    special_instructions: vehicleImport?.special_instructions ?? '',
    notes: vehicleImport?.notes ?? '',
  });

  const handleCustomerChange = (customerId: string) => {
    setData('customer_id', customerId);
    const selectedCustomer = customers.find(c => c.id === Number(customerId));
    if (selectedCustomer?.user_id) {
      setData('user_id', String(selectedCustomer.user_id));
    } else {
      setData('user_id', '');
    }
  };

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
      
      <FormSection title="Basic Information" gridCols={3}>
        <FormField
          name="reference_number"
          label="Reference number"
          value={data.reference_number}
          error={errors.reference_number}
          onChange={(value) => setData('reference_number', value)}
        />
        <FormField
          name="origin_country"
          label="Origin country"
          value={data.origin_country}
          error={errors.origin_country}
          onChange={(value) => setData('origin_country', value)}
        />
        <FormField
          name="destination_port"
          label="Destination port"
          value={data.destination_port}
          error={errors.destination_port}
          onChange={(value) => setData('destination_port', value)}
        />
        <FormField
          name="port_of_loading"
          label="Port of loading"
          value={data.port_of_loading}
          error={errors.port_of_loading}
          onChange={(value) => setData('port_of_loading', value)}
        />
        <FormField
          name="shipping_method"
          label="Shipping method"
          value={data.shipping_method}
          error={errors.shipping_method}
          onChange={(value) => setData('shipping_method', value)}
        />
        <FormField
          name="estimated_cost"
          label="Estimated cost"
          type="number"
          step="0.01"
          value={data.estimated_cost}
          error={errors.estimated_cost}
          onChange={(value) => setData('estimated_cost', value)}
        />
        <FormField
          name="insurance_value"
          label="Insurance value"
          type="number"
          step="0.01"
          value={data.insurance_value}
          error={errors.insurance_value}
          onChange={(value) => setData('insurance_value', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={data.status}
          error={errors.status}
          onChange={(value) => setData('status', value)}
        />
        <div className="space-y-2">
          <label htmlFor="supplier_id" className="text-sm font-medium">Supplier</label>
          <Select
            value={data.supplier_id}
            onValueChange={(value) => setData('supplier_id', value)}
          >
            <SelectTrigger id="supplier_id">
              <SelectValue placeholder="Select a supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={String(supplier.id)}>
                  {supplier.company_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.supplier_id && <p className="text-sm text-destructive">{errors.supplier_id}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="vehicle_id" className="text-sm font-medium">Vehicle</label>
          <Select
            value={data.vehicle_id}
            onValueChange={(value) => setData('vehicle_id', value)}
          >
            <SelectTrigger id="vehicle_id">
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={String(vehicle.id)}>
                  {vehicle.title} ({vehicle.stock_number})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.vehicle_id && <p className="text-sm text-destructive">{errors.vehicle_id}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="customer_id" className="text-sm font-medium">Customer</label>
          <Select
            value={data.customer_id}
            onValueChange={handleCustomerChange}
          >
            <SelectTrigger id="customer_id">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={String(customer.id)}>
                  {customer.first_name} {customer.last_name} ({customer.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.customer_id && <p className="text-sm text-destructive">{errors.customer_id}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="user_id" className="text-sm font-medium">Import Officer (Admin)</label>
          <FormField
            name="user_id"
            label="User ID"
            type="number"
            value={data.user_id}
            error={errors.user_id}
            onChange={(value) => setData('user_id', value)}
            disabled
            placeholder="Auto-populated from customer selection"
          />
          <p className="text-xs text-muted-foreground">Automatically populated when a customer is selected</p>
        </div>
      </FormSection>

      <FormSection title="Shipping Details" gridCols={1} fullWidth>
        <FormField
          name="special_instructions"
          label="Special instructions"
          type="textarea"
          value={data.special_instructions}
          error={errors.special_instructions}
          onChange={(value) => setData('special_instructions', value)}
          placeholder="Any special handling instructions or requirements..."
        />
        <FormField
          name="notes"
          label="Additional notes"
          type="textarea"
          value={data.notes}
          error={errors.notes}
          onChange={(value) => setData('notes', value)}
          placeholder="Any additional information about this import..."
        />
      </FormSection>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save import request'}
        </Button>
      </div>
    </form>
  );
}
