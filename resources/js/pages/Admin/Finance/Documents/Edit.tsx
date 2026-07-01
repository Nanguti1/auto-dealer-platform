import { Form, Link } from '@inertiajs/react';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication, FinanceDocument } from '@/components/admin/finance/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ financeApplication, document }: { financeApplication?: FinanceApplication; document: FinanceDocument }) {
  const base = financeApplication ? `/admin/finance-applications/${financeApplication.id}/documents` : '/admin/finance-documents';

  return (
    <FinanceShell title="Edit Finance Document" description={financeApplication ? applicantName(financeApplication) : 'Update finance document details.'} actions={<FinanceBackButton href={base} />}>
      <Form action={`${base}/${document.id}`} method="post" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">
        <input type="hidden" name="_method" value="put" />
        {({ errors, processing }) => (
          <>
            {financeApplication ? <input type="hidden" name="finance_application_id" value={financeApplication.id} /> : null}
            <div className="space-y-2">
              <Label htmlFor="title">Document title</Label>
              <Input id="title" name="title" defaultValue={document.title} />
              <InputError message={errors.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document_type">Document type</Label>
              <Input id="document_type" name="document_type" defaultValue={document.document_type} placeholder="Credit application, proof of income, ID, lender approval…" />
              <InputError message={errors.document_type} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approval_status">Approval status</Label>
              <Input id="approval_status" name="approval_status" defaultValue={document.approval_status || 'pending'} />
              <InputError message={errors.approval_status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Metadata / notes</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={document.description} />
              <InputError message={errors.description} />
            </div>
            <Button className="w-fit" disabled={processing}>Update document</Button>
          </>
        )}
      </Form>
    </FinanceShell>
  );
}
