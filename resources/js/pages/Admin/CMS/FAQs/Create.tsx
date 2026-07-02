import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import FaqForm from '@/components/admin/cms/faq-form';

export default function Create() {
  return (
    <CmsShell
      title="Create FAQ"
      description="Create a new frequently asked question."
      actions={<CmsBackButton />}
    >
      <FaqForm action={adminRoutes.faqs.store().url} method="post" />
    </CmsShell>
  );
}
