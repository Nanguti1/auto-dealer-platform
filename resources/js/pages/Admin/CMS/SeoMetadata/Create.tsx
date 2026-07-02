import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import SeoMetadataForm from '@/components/admin/cms/seo-metadata-form';
import type { SeoSettings } from '@/components/admin/cms/types';

export default function Create() {
  return (
    <CmsShell
      title="Create SEO Metadata"
      description="Configure global SEO settings, Open Graph, and structured data."
      actions={<CmsBackButton />}
    >
      <SeoMetadataForm seoSettings={{} as SeoSettings} action={adminRoutes.seoMetadata.store().url} method="post" />
    </CmsShell>
  );
}
