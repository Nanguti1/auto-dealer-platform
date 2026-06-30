import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import HomeSectionForm from '@/components/admin/cms/home-section-form';
import type { HomePageSection } from '@/components/admin/cms/types';

export default function Edit({ homePageSection }: { homePageSection: HomePageSection }) {
  return (
    <CmsShell
      title="Edit Home Page Section"
      description="Update section configuration, ordering, and visibility."
      actions={<CmsBackButton href={`/admin/home-page-sections/${homePageSection.id}`} />}
    >
      <HomeSectionForm homeSection={homePageSection} action={`/admin/home-page-sections/${homePageSection.id}`} method="put" />
    </CmsShell>
  );
}
