import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import PageForm from '@/components/admin/cms/page-form';
import type { CmsPage } from '@/components/admin/cms/types';

export default function Edit({ dynamicCmsPage }: { dynamicCmsPage: CmsPage }) {
  return (
    <CmsShell
      title="Edit Static Page"
      description="Update page content, SEO, and visibility settings."
      actions={<CmsBackButton href={adminRoutes.cmsPages.show(dynamicCmsPage.id).url} />}
    >
      <PageForm cmsPage={dynamicCmsPage} action={adminRoutes.cmsPages.update(dynamicCmsPage.id).url} method="put" />
    </CmsShell>
  );
}
