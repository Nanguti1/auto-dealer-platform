import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import SeoMetadataForm from '@/components/admin/cms/seo-metadata-form';
import type { SeoSettings } from '@/components/admin/cms/types';

export default function Edit({ seoSettings }: { seoSettings: SeoSettings }) {
  return (
    <CmsShell
      title="Edit SEO Metadata"
      description="Update global SEO settings, Open Graph, and structured data."
      actions={<CmsBackButton href={`/admin/seo-metadata/${seoSettings.id}`} />}
    >
      <SeoMetadataForm seoSettings={seoSettings} action={`/admin/seo-metadata/${seoSettings.id}`} method="put" />
    </CmsShell>
  );
}
