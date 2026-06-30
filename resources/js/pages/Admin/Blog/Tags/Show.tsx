import { Link } from '@inertiajs/react';
import { Pencil, Calendar, Globe, Tag as TagIcon } from 'lucide-react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { BlogTag } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ blogTag }: { blogTag: BlogTag }) {
  return (
    <CmsShell
      title={blogTag.name ?? 'Untitled Tag'}
      description={blogTag.slug ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/blog-tags/${blogTag.id}/edit`}>
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
            <CardTitle>Tag details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {blogTag.color && (
                <div className="h-12 w-12 rounded-lg border-2" style={{ backgroundColor: blogTag.color }} />
              )}
              <div>
                <span className="text-sm text-muted-foreground">Color:</span>
                <p className="text-sm font-medium">{blogTag.color ?? 'No color set'}</p>
              </div>
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
                <span className="text-sm font-medium">{blogTag.slug ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <TagIcon className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Usage:</span>
                <span className="text-sm font-medium">{blogTag.posts_count ?? 0} posts</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={blogTag.is_visible ? 'default' : 'outline'}>
                  {blogTag.is_visible ? 'Visible' : 'Hidden'}
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
                  {blogTag.created_at ? new Date(blogTag.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium">
                  {blogTag.updated_at ? new Date(blogTag.updated_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CmsShell>
  );
}
