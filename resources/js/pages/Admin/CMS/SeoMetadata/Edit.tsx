import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import SeoMetadataForm from '@/components/admin/cms/seo-metadata-form';
import type { SeoSettings } from '@/components/admin/cms/types';

export default function Edit({ seoSettings }: { seoSettings?: SeoSettings }) {
  if (!seoSettings) {
    return (
      <CmsShell
        title="Edit SEO Metadata"
        description="Update global SEO settings, Open Graph, and structured data."
        actions={<CmsBackButton />}
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">SEO metadata not found.</p>
        </div>
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="Edit SEO Metadata"
      description="Update global SEO settings, Open Graph, and structured data."
      actions={<CmsBackButton href={adminRoutes.seoMetadata.show(seoSettings.id).url} />}
    >
      <SeoMetadataForm seoSettings={seoSettings} action={adminRoutes.seoMetadata.update(seoSettings.id).url} method="put" />
    </CmsShell>
  );
}
