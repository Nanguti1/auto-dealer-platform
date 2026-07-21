import { Link, router } from '@inertiajs/react';
import { Eye, Trash2, Download, Image as ImageIcon, File, Filter } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { MediaFile, CmsFilters, Paginated } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Index({ mediaFiles, filters = {} }: { mediaFiles: Paginated<MediaFile>; filters?: CmsFilters }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState(String(filters.search ?? ''));
  const [categoryFilter, setCategoryFilter] = React.useState(String(filters.category ?? 'all'));
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const applyFilters = () => {
    router.get(adminRoutes.media.index().url, {
      search: searchQuery || undefined,
      category: categoryFilter !== 'all' ? categoryFilter : undefined,
    }, { preserveState: true, preserveScroll: true });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) {
return '—';
}

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage = (mimeType?: string) => mimeType?.startsWith('image/');

  if (isLoading) {
    return (
      <CmsShell
        title="Media Library"
        description="Manage and organize all media files."
        actions={<Button asChild><Link href={adminRoutes.media.create().url}>Upload Media</Link></Button>}
      >
        <LoadingState message="Loading media files..." variant="full-page" />
      </CmsShell>
    );
  }

  if (error) {
    return (
      <CmsShell
        title="Media Library"
        description="Manage and organize all media files."
        actions={<Button asChild><Link href={adminRoutes.media.create().url}>Upload Media</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(adminRoutes.media.index().url);
          }}
        />
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="Media Library"
      description="Manage and organize all media files."
      actions={<Button asChild><Link href={adminRoutes.media.create().url}>Upload Media</Link></Button>}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
          <form className="flex flex-1 gap-2" onSubmit={(e) => {
 e.preventDefault(); applyFilters(); 
}}>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media files..."
              className="flex-1"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Filter</Button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaFiles.data.map((media) => (
            <Card key={media.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted">
                  {isImage(media.mime_type) && media.file_path ? (
                    <img
                      src={media.file_path}
                      alt={media.alt_text ?? media.file_name ?? 'Media file'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <File className="size-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute right-2 top-2 flex gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                      asChild
                    >
                      <Link href={adminRoutes.media.show(media.id).url}>
                        <Eye className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                      onClick={() => setDeleteId(media.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-sm font-medium truncate">{media.file_name ?? 'Untitled'}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(media.file_size)}</span>
                    {media.category && <Badge variant="outline" className="text-xs">{media.category}</Badge>}
                  </div>
                </div>
              </CardContent>
              <ConfirmationDialog
                open={deleteId === media.id}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete media file?"
                description="This will permanently delete the media file."
                trigger={<span />}
                confirmLabel="Delete"
                onConfirm={() => router.delete(adminRoutes.media.destroy(media.id).url, { onFinish: () => setDeleteId(null) })}
              />
            </Card>
          ))}
        </div>

        {mediaFiles.data.length === 0 && (
          <EmptyGeneric
            title="No media files"
            description="Upload your first media file to get started."
            action={{ label: 'Upload Media', onClick: () => router.visit(adminRoutes.media.create().url) }}
          />
        )}
      </div>
    </CmsShell>
  );
}
