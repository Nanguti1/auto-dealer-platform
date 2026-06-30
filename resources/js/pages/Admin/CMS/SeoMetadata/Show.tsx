import { Link } from '@inertiajs/react';
import { Pencil, Globe, Share2, Search, FileJson } from 'lucide-react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { SeoSettings } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ seoSettings }: { seoSettings: SeoSettings }) {
  return (
    <CmsShell
      title="SEO Metadata"
      description="Global SEO settings and metadata configuration"
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/seo-metadata/${seoSettings.id}/edit`}>
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
            <CardTitle>Basic SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Site Name:</span>
              <p className="text-sm font-medium">{seoSettings.site_name ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Site Description:</span>
              <p className="text-sm font-medium">{seoSettings.site_description ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Default Meta Title:</span>
              <p className="text-sm font-medium">{seoSettings.default_meta_title ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Default Meta Description:</span>
              <p className="text-sm font-medium">{seoSettings.default_meta_description ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Canonical URL:</span>
              <p className="text-sm font-medium">{seoSettings.canonical_url ?? '—'}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Share2 className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Twitter Handle:</span>
                <span className="text-sm font-medium">{seoSettings.twitter_handle ?? '—'}</span>
              </div>
              {seoSettings.og_image && (
                <div>
                  <span className="text-sm text-muted-foreground">OG Image:</span>
                  <p className="text-xs text-muted-foreground mt-1">{seoSettings.og_image}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Engine Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Search className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Robots:</span>
                <Badge variant="outline">{seoSettings.robots_directive ?? 'index,follow'}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sitemap:</span>
                <Badge variant={seoSettings.sitemap_enabled ? 'default' : 'secondary'}>
                  {seoSettings.sitemap_enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {seoSettings.structured_data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="size-4" />
                  Structured Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(seoSettings.structured_data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CmsShell>
  );
}
