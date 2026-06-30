import { Link } from '@inertiajs/react';
import { Pencil, Eye, Calendar, User, Folder, MessageCircle, Star } from 'lucide-react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { BlogPost } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ blogPost }: { blogPost: BlogPost }) {
  const panels = ['SEO Metadata', 'Tags', 'Comments', 'Analytics', 'Revision History'];

  return (
    <CmsShell
      title={blogPost.title ?? 'Untitled Post'}
      description={blogPost.excerpt ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/blog-posts/${blogPost.id}/edit`}>
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
            <CardTitle>Post overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {blogPost.body ? (
                <div dangerouslySetInnerHTML={{ __html: blogPost.body }} />
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
                <Folder className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium">{blogPost.category?.name ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Author:</span>
                <span className="text-sm font-medium">{blogPost.author?.name ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Published:</span>
                <span className="text-sm font-medium">
                  {blogPost.published_at ? new Date(blogPost.published_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={blogPost.status === 'published' ? 'default' : 'secondary'}>
                  {blogPost.status ?? 'draft'}
                </Badge>
                {blogPost.is_featured && (
                  <Badge variant="outline">
                    <Star className="mr-1 size-3" />
                    Featured
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Views:</span>
                <span className="text-sm font-medium">{blogPost.views_count ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Comments:</span>
                <span className="text-sm font-medium">{blogPost.comments_count ?? 0}</span>
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
