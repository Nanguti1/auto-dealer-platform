import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { LeadRecord } from './types';

function Field({ name, label, value, type = 'text', error }: { name: string; label: string; value?: string | number | null; type?: string; error?: string }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} defaultValue={String(value ?? '')} /><InputError message={error} /></div>;
}

export default function LeadForm({ lead, action, method = 'post' }: { lead?: LeadRecord; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method="post" className="space-y-6">
      {({ errors, processing }) => (
        <>
          <input type="hidden" name="_method" value={method} />
          <Tabs defaultValue="contact">
            <TabsList className="flex h-auto w-full flex-wrap justify-start">
              <TabsTrigger value="contact">Contact information</TabsTrigger>
              <TabsTrigger value="source">Lead source</TabsTrigger>
              <TabsTrigger value="vehicle">Interested vehicle(s)</TabsTrigger>
              <TabsTrigger value="owner">Assignment</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="contact" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="first_name" label="First name" value={lead?.first_name} error={errors.first_name} />
              <Field name="last_name" label="Last name" value={lead?.last_name} error={errors.last_name} />
              <Field name="email" label="Email" type="email" value={lead?.email} error={errors.email} />
              <Field name="phone" label="Phone" value={lead?.phone} error={errors.phone} />
              <Field name="budget" label="Budget" type="number" value={lead?.budget as string | number} error={errors.budget} />
            </TabsContent>
            <TabsContent value="source" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="source" label="Lead source" value={lead?.source} error={errors.source} />
              <Field name="status" label="Lead status" value={lead?.status ?? 'new'} error={errors.status} />
              <Field name="priority" label="Priority" value={lead?.priority ?? 'normal'} error={errors.priority} />
              <Field name="score" label="Score" type="number" value={lead?.score ?? 0} error={errors.score} />
            </TabsContent>
            <TabsContent value="vehicle" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="vehicle_id" label="Primary vehicle ID" type="number" value={lead?.vehicle_id} error={errors.vehicle_id} />
              <Field name="metadata[vehicle_interest]" label="Vehicle interest" value={lead?.vehicle?.title} />
              <Field name="metadata[finance_interest]" label="Finance interest" value={lead?.finance_interest as string} />
              <Field name="metadata[trade_in_interest]" label="Trade-in interest" value={lead?.trade_in_interest as string} />
              <Field name="metadata[import_interest]" label="Import interest" value={lead?.import_interest as string} />
            </TabsContent>
            <TabsContent value="owner" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
              <Field name="assigned_user_id" label="Assigned representative ID" type="number" value={lead?.assigned_user_id} error={errors.assigned_user_id} />
              <Field name="crm_stage_id" label="Pipeline stage ID" type="number" value={lead?.crm_stage_id} error={errors.crm_stage_id} />
              <Field name="last_contacted_at" label="Last contacted at" type="datetime-local" value={lead?.last_contacted_at} error={errors.last_contacted_at} />
            </TabsContent>
            <TabsContent value="notes" className="rounded-xl border bg-card p-4">
              <div className="space-y-2"><Label htmlFor="notes">Notes</Label><Textarea id="notes" name="notes" rows={8} defaultValue={String(lead?.notes_text ?? '')} /><InputError message={errors.notes} /></div>
            </TabsContent>
          </Tabs>
          <Button disabled={processing}><Save className="mr-2 size-4" />{processing ? 'Saving…' : 'Save lead'}</Button>
        </>
      )}
    </Form>
  );
}
