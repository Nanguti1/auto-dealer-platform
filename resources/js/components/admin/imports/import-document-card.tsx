import { Link, router } from '@inertiajs/react';
import { FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ImportStatusBadge from './import-status-badge';
import type { ImportDocument } from './types';

export default function ImportDocumentCard({ document, detailsHref, onDeleteUrl }: { document: ImportDocument; detailsHref: string; onDeleteUrl: string }) {
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="size-4" />{document.title ?? document.document_type ?? document.file_name}</CardTitle></CardHeader>
      <CardContent className="space-y-2"><p className="text-sm text-muted-foreground">{document.file_name}</p><p className="text-sm text-muted-foreground">{(document.file_size ?? 0) / 1024} KB</p><ImportStatusBadge status={document.approval_status} /></CardContent>
      <CardFooter className="flex justify-between"><Button variant="outline" size="sm" asChild><Link href={detailsHref}>View</Link></Button><Button variant="ghost" size="sm" onClick={() => router.delete(onDeleteUrl)}><Trash2 className="size-4" /></Button></CardFooter>
    </Card>
  );
}
