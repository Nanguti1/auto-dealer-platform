import { Link } from '@inertiajs/react';
import { Pencil, Share2, FileJson } from 'lucide-react';
import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { SeoSettings } from '@/components/admin/cms/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ seoSettings }: { seoSettings?: SeoSettings }) {
  if (!seoSettings) {
    return (
      <CmsShell
        title="SEO Metadata"
        description="Global SEO settings and metadata configuration"
        actions={<CmsBackButton href={adminRoutes.seoMetadata.index().url} />}
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">SEO metadata not found.</p>
        </div>
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="SEO Metadata"
      description="Global SEO settings and metadata configuration"
      actions={
        <>
          <CmsBackButton href={adminRoutes.seoMetadata.index().url} />
          <Button asChild>
            <Link href={adminRoutes.seoMetadata.edit(seoSettings.id).url}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Polymorphic Relation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Content Type:</span>
              <p className="text-sm font-medium">{seoSettings.seoable_type ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Content ID:</span>
              <p className="text-sm font-medium">{seoSettings.seoable_id ?? '—'}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Meta Title:</span>
              <p className="text-sm font-medium">{seoSettings.meta_title ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Meta Description:</span>
              <p className="text-sm font-medium">{seoSettings.meta_description ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Canonical URL:</span>
              <p className="text-sm font-medium">{seoSettings.canonical_url ?? '—'}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {seoSettings.open_graph && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="size-4" />
                  Open Graph Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(seoSettings.open_graph, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          {seoSettings.schema_markup && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="size-4" />
                  Schema Markup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(seoSettings.schema_markup, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CmsShell>
  );
}
