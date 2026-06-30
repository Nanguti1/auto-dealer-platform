import { Link } from '@inertiajs/react';
import { Pencil, Calendar, Globe, FileText, Hash } from 'lucide-react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { BlogCategory } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ blogCategory }: { blogCategory: BlogCategory }) {
  return (
    <CmsShell
      title={blogCategory.name ?? 'Untitled Category'}
      description={blogCategory.slug ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/blog-categories/${blogCategory.id}/edit`}>
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
            <CardTitle>Category details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Description:</span>
              <p className="text-sm font-medium">{blogCategory.description ?? 'No description provided.'}</p>
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
                <span className="text-sm font-medium">{blogCategory.slug ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Order:</span>
                <span className="text-sm font-medium">{blogCategory.order ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Posts:</span>
                <span className="text-sm font-medium">{blogCategory.posts_count ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={blogCategory.is_active ? 'default' : 'secondary'}>
                  {blogCategory.is_active ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant={blogCategory.is_visible ? 'default' : 'outline'}>
                  {blogCategory.is_visible ? 'Visible' : 'Hidden'}
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
                  {blogCategory.created_at ? new Date(blogCategory.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium">
                  {blogCategory.updated_at ? new Date(blogCategory.updated_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CmsShell>
  );
}
