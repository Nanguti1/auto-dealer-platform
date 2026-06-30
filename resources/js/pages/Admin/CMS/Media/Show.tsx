import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, Trash2, Calendar, File, Image as ImageIcon, Copy } from 'lucide-react';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { MediaFile } from '@/components/admin/cms/types';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ mediaFile }: { mediaFile: MediaFile }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) {
return '—';
}

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage = mediaFile.mime_type?.startsWith('image/');

  const handleDownload = () => {
    if (mediaFile.file_path) {
      window.open(mediaFile.file_path, '_blank');
    }
  };

  const handleCopyUrl = () => {
    if (mediaFile.file_path) {
      navigator.clipboard.writeText(mediaFile.file_path);
    }
  };

  return (
    <CmsShell
      title={mediaFile.file_name ?? 'Media File'}
      description={mediaFile.mime_type ?? ''}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/admin/media">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Link>
          </Button>
          <Button variant="outline" onClick={handleCopyUrl}>
            <Copy className="mr-2 size-4" />
            Copy URL
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 size-4" />
            Download
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {isImage && mediaFile.file_path ? (
                <img
                  src={mediaFile.file_path}
                  alt={mediaFile.alt_text ?? mediaFile.file_name ?? 'Media file'}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <File className="size-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">File Name:</span>
                <p className="text-sm font-medium">{mediaFile.file_name ?? '—'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">File Size:</span>
                <p className="text-sm font-medium">{formatFileSize(mediaFile.file_size)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">MIME Type:</span>
                <p className="text-sm font-medium">{mediaFile.mime_type ?? '—'}</p>
              </div>
              {mediaFile.category && (
                <div>
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="outline" className="ml-2">{mediaFile.category}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Alt Text:</span>
                <p className="text-sm font-medium">{mediaFile.alt_text ?? '—'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Caption:</span>
                <p className="text-sm font-medium">{mediaFile.caption ?? '—'}</p>
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
                  {mediaFile.created_at ? new Date(mediaFile.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium">
                  {mediaFile.updated_at ? new Date(mediaFile.updated_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete media file?"
        description="This will permanently delete the media file."
        trigger={<span />}
        confirmLabel="Delete"
        onConfirm={() => router.delete(`/admin/media/${mediaFile.id}`, { onSuccess: () => router.visit('/admin/media') })}
      />
    </CmsShell>
  );
}
