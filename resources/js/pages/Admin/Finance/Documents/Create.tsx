import { Link } from '@inertiajs/react';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication } from '@/components/admin/finance/types';
import { Button } from '@/components/ui/button';

export default function Create({ financeApplication }: { financeApplication?: FinanceApplication }) {
  const base = financeApplication ? `/admin/finance-applications/${financeApplication.id}/documents` : '/admin/finance-documents';

  return (
    <FinanceShell title="Upload Finance Document" description={financeApplication ? applicantName(financeApplication) : 'Attach application documents for finance review.'} actions={<FinanceBackButton href={base} />}>
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground mb-4">Please use the Upload page to add new finance documents.</p>
        <Button asChild>
          <Link href={`${base}/upload`}>Go to Upload Page</Link>
        </Button>
      </div>
    </FinanceShell>
  );
}
