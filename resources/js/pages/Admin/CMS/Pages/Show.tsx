import { Link } from '@inertiajs/react';
import { Pencil, Eye, Calendar, Globe, FileText } from 'lucide-react';
import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { CmsPage } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ dynamicCmsPage }: { dynamicCmsPage: CmsPage }) {
  const panels = ['SEO Metadata', 'Page Templates', 'Revision History', 'Analytics'];

  return (
    <CmsShell
      title={dynamicCmsPage.title ?? 'Untitled Page'}
      description={dynamicCmsPage.slug ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={adminRoutes.cmsPages.edit(dynamicCmsPage.id).url}>
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
            <CardTitle>Page content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {dynamicCmsPage.content || dynamicCmsPage.body ? (
                <div dangerouslySetInnerHTML={{ __html: dynamicCmsPage.content || dynamicCmsPage.body || '' }} />
              ) : (
                <p className="text-muted-foreground">No content provided.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publication details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Slug:</span>
                <span className="text-sm font-medium">{dynamicCmsPage.slug ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Published:</span>
                <span className="text-sm font-medium">
                  {dynamicCmsPage.published_at ? new Date(dynamicCmsPage.published_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={dynamicCmsPage.status === 'published' ? 'default' : 'secondary'}>
                  {dynamicCmsPage.status ?? 'draft'}
                </Badge>
                <Badge variant={dynamicCmsPage.is_visible ? 'default' : 'outline'}>
                  {dynamicCmsPage.is_visible ? 'Visible' : 'Hidden'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Meta title:</span>
                <p className="text-sm font-medium">{dynamicCmsPage.meta_title ?? '—'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Meta description:</span>
                <p className="text-sm font-medium">{dynamicCmsPage.meta_description ?? '—'}</p>
              </div>
            </CardContent>
          </Card>

          {panels.map((panel) => (
            <Card key={panel}>
              <CardHeader>
                <CardTitle>{panel}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Connected backend data will appear here when included in Inertia props.
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CmsShell>
  );
}
