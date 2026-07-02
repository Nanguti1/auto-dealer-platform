import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import HomeSectionForm from '@/components/admin/cms/home-section-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Home Page Section"
      description="Create a new section for the homepage layout."
      actions={<CmsBackButton />}
    >
      <HomeSectionForm action={adminRoutes.homePageSections.store().url} method="post" />
    </CmsShell>
  );
}
