import { useForm } from '@inertiajs/react';
import { FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { LeadRecord } from './types';

interface LeadFormProps {
  lead?: LeadRecord;
  action: string;
  method?: 'post' | 'put';
  vehicles?: Array<{ id: number; name: string; make: string; model: string; year: number; price: number }>;
  users?: Array<{ id: number; name: string; email?: string }>;
  crmStages?: Array<{ id: number; name: string }>;
  cancelUrl?: string;
}

const sourceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'other', label: 'Other' },
];

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export default function LeadForm({ lead, action, method = 'post', vehicles = [], users = [], crmStages = [], cancelUrl }: LeadFormProps) {
  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.name || `Vehicle #${vehicle.id}`,
  }));

  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  const crmStageOptions = crmStages.map(stage => ({
    value: stage.id,
    label: stage.name || `Stage #${stage.id}`,
  }));

  const { data, setData, post, put, processing, errors } = useForm({
    first_name: lead?.first_name ?? '',
    last_name: lead?.last_name ?? '',
    email: lead?.email ?? '',
    phone: lead?.phone ?? '',
    budget: lead?.budget ?? '',
    source: lead?.source ?? '',
    status: lead?.status ?? 'new',
    priority: lead?.priority ?? 'normal',
    score: lead?.score ?? 0,
    vehicle_id: lead?.vehicle_id ?? '',
    'metadata[vehicle_interest]': lead?.vehicle?.title ?? '',
    'metadata[finance_interest]': lead?.finance_interest ?? '',
    'metadata[trade_in_interest]': lead?.trade_in_interest ?? '',
    'metadata[import_interest]': lead?.import_interest ?? '',
    assigned_user_id: lead?.assigned_user_id ?? '',
    crm_stage_id: lead?.crm_stage_id ?? '',
    last_contacted_at: lead?.last_contacted_at ?? '',
    notes: lead?.notes_text ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'post') {
      post(action);
    } else {
      put(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(method === 'put' || method === 'patch') && (
        <input type="hidden" name="_method" value={method} />
      )}

      <Tabs defaultValue="contact">
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="contact">Contact information</TabsTrigger>
          <TabsTrigger value="source">Lead source</TabsTrigger>
          <TabsTrigger value="vehicle">Interested vehicle(s)</TabsTrigger>
          <TabsTrigger value="owner">Assignment</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="first_name"
            label="First name"
            value={data.first_name}
            error={errors.first_name}
            onChange={(value) => setData('first_name', value)}
          />
          <FormField
            name="last_name"
            label="Last name"
            value={data.last_name}
            error={errors.last_name}
            onChange={(value) => setData('last_name', value)}
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            value={data.email}
            error={errors.email}
            onChange={(value) => setData('email', value)}
          />
          <FormField
            name="phone"
            label="Phone"
            value={data.phone}
            error={errors.phone}
            onChange={(value) => setData('phone', value)}
          />
          <FormField
            name="budget"
            label="Budget"
            type="number"
            value={data.budget}
            error={errors.budget}
            onChange={(value) => setData('budget', value)}
          />
        </TabsContent>
        <TabsContent value="source" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="source"
            label="Lead source"
            type="select"
            value={data.source}
            error={errors.source}
            options={sourceOptions}
            onChange={(value) => setData('source', value)}
          />
          <FormField
            name="status"
            label="Lead status"
            type="select"
            value={data.status}
            error={errors.status}
            options={statusOptions}
            onChange={(value) => setData('status', value)}
          />
          <FormField
            name="priority"
            label="Priority"
            type="select"
            value={data.priority}
            error={errors.priority}
            options={priorityOptions}
            onChange={(value) => setData('priority', value)}
          />
          <FormField
            name="score"
            label="Score"
            type="number"
            value={data.score}
            error={errors.score}
            onChange={(value) => setData('score', value)}
          />
        </TabsContent>
        <TabsContent value="vehicle" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <ForeignSelector
            name="vehicle_id"
            label="Primary vehicle"
            value={data.vehicle_id}
            error={errors.vehicle_id}
            options={vehicleOptions}
            placeholder="Select a vehicle"
            searchable
            onChange={(value) => setData('vehicle_id', value)}
          />
          <FormField
            name="metadata[vehicle_interest]"
            label="Vehicle interest"
            value={data['metadata[vehicle_interest]']}
            error={errors['metadata[vehicle_interest]']}
            onChange={(value) => setData('metadata[vehicle_interest]', value)}
          />
          <FormField
            name="metadata[finance_interest]"
            label="Finance interest"
            value={data['metadata[finance_interest]']}
            error={errors['metadata[finance_interest]']}
            onChange={(value) => setData('metadata[finance_interest]', value)}
          />
          <FormField
            name="metadata[trade_in_interest]"
            label="Trade-in interest"
            value={data['metadata[trade_in_interest]']}
            error={errors['metadata[trade_in_interest]']}
            onChange={(value) => setData('metadata[trade_in_interest]', value)}
          />
          <FormField
            name="metadata[import_interest]"
            label="Import interest"
            value={data['metadata[import_interest]']}
            error={errors['metadata[import_interest]']}
            onChange={(value) => setData('metadata[import_interest]', value)}
          />
        </TabsContent>
        <TabsContent value="owner" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <ForeignSelector
            name="assigned_user_id"
            label="Assigned representative"
            value={data.assigned_user_id}
            error={errors.assigned_user_id}
            options={userOptions}
            placeholder="Select a representative"
            searchable
            onChange={(value) => setData('assigned_user_id', value)}
          />
          <ForeignSelector
            name="crm_stage_id"
            label="Pipeline stage"
            value={data.crm_stage_id}
            error={errors.crm_stage_id}
            options={crmStageOptions}
            placeholder="Select a stage"
            searchable
            onChange={(value) => setData('crm_stage_id', value)}
          />
          <FormField
            name="last_contacted_at"
            label="Last contacted at"
            type="datetime-local"
            value={data.last_contacted_at}
            error={errors.last_contacted_at}
            onChange={(value) => setData('last_contacted_at', value)}
          />
        </TabsContent>
        <TabsContent value="notes" className="rounded-xl border bg-card p-4">
          <FormField
            name="notes"
            label="Notes"
            type="textarea"
            value={data.notes}
            error={errors.notes}
            onChange={(value) => setData('notes', value)}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        {cancelUrl && (
          <Button type="button" variant="outline" asChild>
            <a href={cancelUrl}>
              <X className="mr-2 size-4" />
              Cancel
            </a>
          </Button>
        )}
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save lead'}
        </Button>
      </div>
    </form>
  );
}
