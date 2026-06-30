import { Link } from '@inertiajs/react';
import { Pencil, Calendar, Layout as LayoutIcon, Layers } from 'lucide-react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { HomePageSection } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ homePageSection }: { homePageSection: HomePageSection }) {
  return (
    <CmsShell
      title={homePageSection.title ?? 'Untitled Section'}
      description={homePageSection.section_type ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/home-page-sections/${homePageSection.id}/edit`}>
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
            <CardTitle>Section content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Title:</span>
              <p className="text-sm font-medium">{homePageSection.title ?? 'No title provided.'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Content Configuration:</span>
              <pre className="mt-2 rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                {homePageSection.content ? JSON.stringify(homePageSection.content, null, 2) : 'No content configured.'}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <LayoutIcon className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge variant="outline" className="capitalize">
                  {homePageSection.section_type?.replace('_', ' ') ?? '—'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Order:</span>
                <span className="text-sm font-medium">{homePageSection.display_order ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={homePageSection.is_visible ? 'default' : 'outline'}>
                  {homePageSection.is_visible ? 'Visible' : 'Hidden'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium">
                  {homePageSection.created_at ? new Date(homePageSection.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium">
                  {homePageSection.updated_at ? new Date(homePageSection.updated_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CmsShell>
  );
}
