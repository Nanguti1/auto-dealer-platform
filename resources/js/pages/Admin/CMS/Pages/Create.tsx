import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import PageForm from '@/components/admin/cms/page-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Static Page"
      description="Create a new static content page with SEO metadata."
      actions={<CmsBackButton />}
    >
      <PageForm action="/admin/cms-pages" method="post" />
    </CmsShell>
  );
}
