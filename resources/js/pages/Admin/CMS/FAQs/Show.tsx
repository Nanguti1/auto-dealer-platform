import { Link } from '@inertiajs/react';
import { Pencil, Calendar, ChevronDown, ChevronUp, FolderOpen } from 'lucide-react';
import * as React from 'react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { Faq } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ faq }: { faq: Faq }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <CmsShell
      title="FAQ Details"
      description={faq.category ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/faqs/${faq.id}/edit`}>
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
            <CardTitle>FAQ content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Question:</span>
              <p className="text-sm font-medium mt-1">{faq.question ?? 'No question provided.'}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Answer:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="h-6 text-xs"
                >
                  {expanded ? <ChevronUp className="size-3 mr-1" /> : <ChevronDown className="size-3 mr-1" />}
                  {expanded ? 'Collapse' : 'Expand'}
                </Button>
              </div>
              <div className={`text-sm ${expanded ? '' : 'line-clamp-3'}`}>
                {faq.answer ?? 'No answer provided.'}
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
                <FolderOpen className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium">{faq.category ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Order:</span>
                <span className="text-sm font-medium">{faq.order ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={faq.is_published ? 'default' : 'secondary'}>
                  {faq.is_published ? 'Published' : 'Draft'}
                </Badge>
                <Badge variant={faq.is_visible ? 'default' : 'outline'}>
                  {faq.is_visible ? 'Visible' : 'Hidden'}
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
                  {faq.created_at ? new Date(faq.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium">
                  {faq.updated_at ? new Date(faq.updated_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CmsShell>
  );
}
