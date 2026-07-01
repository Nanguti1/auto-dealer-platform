import { Link } from '@inertiajs/react';
import CmsShell from '@/components/admin/cms/cms-shell';
import { Button } from '@/components/ui/button';

export default function Create() {
  return (
    <CmsShell title="Upload Media" description="Add new media files to the library.">
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground mb-4">Please use the Upload page to add new media files.</p>
        <Button asChild>
          <Link href="/admin/media/upload">Go to Upload Page</Link>
        </Button>
      </div>
    </CmsShell>
  );
}
