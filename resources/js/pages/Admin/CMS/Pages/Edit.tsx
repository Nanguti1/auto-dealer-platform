import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import PageForm from '@/components/admin/cms/page-form';
import type { CmsPage } from '@/components/admin/cms/types';

export default function Edit({ dynamicCmsPage }: { dynamicCmsPage: CmsPage }) {
  return (
    <CmsShell
      title="Edit Static Page"
      description="Update page content, SEO, and visibility settings."
      actions={<CmsBackButton href={`/admin/cms-pages/${dynamicCmsPage.id}`} />}
    >
      <PageForm cmsPage={dynamicCmsPage} action={`/admin/cms-pages/${dynamicCmsPage.id}`} method="put" />
    </CmsShell>
  );
}
