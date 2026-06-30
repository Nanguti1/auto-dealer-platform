import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import FaqForm from '@/components/admin/cms/faq-form';
import type { Faq } from '@/components/admin/cms/types';

export default function Edit({ faq }: { faq: Faq }) {
  return (
    <CmsShell
      title="Edit FAQ"
      description="Update FAQ details, category, and visibility."
      actions={<CmsBackButton href={`/admin/faqs/${faq.id}`} />}
    >
      <FaqForm faq={faq} action={`/admin/faqs/${faq.id}`} method="put" />
    </CmsShell>
  );
}
