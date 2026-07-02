import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import HeroSliderForm from '@/components/admin/cms/hero-slider-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Hero Slider"
      description="Create a new hero slider for the homepage."
      actions={<CmsBackButton />}
    >
      <HeroSliderForm action={adminRoutes.heroSliders.store().url} method="post" />
    </CmsShell>
  );
}
