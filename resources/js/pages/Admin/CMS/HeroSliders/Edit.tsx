import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import HeroSliderForm from '@/components/admin/cms/hero-slider-form';
import type { HeroSlider } from '@/components/admin/cms/types';

export default function Edit({ heroSlider }: { heroSlider: HeroSlider }) {
  return (
    <CmsShell
      title="Edit Hero Slider"
      description="Update slider content, image, and display settings."
      actions={<CmsBackButton href={`/admin/hero-sliders/${heroSlider.id}`} />}
    >
      <HeroSliderForm heroSlider={heroSlider} action={`/admin/hero-sliders/${heroSlider.id}`} method="put" />
    </CmsShell>
  );
}
