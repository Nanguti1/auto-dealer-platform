import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { LeadRecord } from './types';

export default function LeadForm({ lead, action, method = 'post' }: { lead?: LeadRecord; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save lead"
      className="space-y-6"
    >
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
            value={lead?.first_name ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="last_name"
            label="Last name"
            value={lead?.last_name ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            value={lead?.email ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="phone"
            label="Phone"
            value={lead?.phone ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="budget"
            label="Budget"
            type="number"
            value={String(lead?.budget ?? '')}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="source" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="source"
            label="Lead source"
            value={lead?.source ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="status"
            label="Lead status"
            value={lead?.status ?? 'new'}
            onChange={() => {}}
          />
          <FormField
            name="priority"
            label="Priority"
            value={lead?.priority ?? 'normal'}
            onChange={() => {}}
          />
          <FormField
            name="score"
            label="Score"
            type="number"
            value={String(lead?.score ?? 0)}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="vehicle" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="vehicle_id"
            label="Primary vehicle ID"
            type="number"
            value={String(lead?.vehicle_id ?? '')}
            onChange={() => {}}
          />
          <FormField
            name="metadata[vehicle_interest]"
            label="Vehicle interest"
            value={lead?.vehicle?.title ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="metadata[finance_interest]"
            label="Finance interest"
            value={lead?.finance_interest ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="metadata[trade_in_interest]"
            label="Trade-in interest"
            value={lead?.trade_in_interest ?? ''}
            onChange={() => {}}
          />
          <FormField
            name="metadata[import_interest]"
            label="Import interest"
            value={lead?.import_interest ?? ''}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="owner" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <FormField
            name="assigned_user_id"
            label="Assigned representative ID"
            type="number"
            value={String(lead?.assigned_user_id ?? '')}
            onChange={() => {}}
          />
          <FormField
            name="crm_stage_id"
            label="Pipeline stage ID"
            type="number"
            value={String(lead?.crm_stage_id ?? '')}
            onChange={() => {}}
          />
          <FormField
            name="last_contacted_at"
            label="Last contacted at"
            type="datetime-local"
            value={lead?.last_contacted_at ?? ''}
            onChange={() => {}}
          />
        </TabsContent>
        <TabsContent value="notes" className="rounded-xl border bg-card p-4">
          <FormField
            name="notes"
            label="Notes"
            type="textarea"
            value={String(lead?.notes_text ?? '')}
            onChange={() => {}}
          />
        </TabsContent>
      </Tabs>
    </FormShell>
  );
}
