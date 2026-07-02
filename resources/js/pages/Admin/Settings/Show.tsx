import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import SettingShell from '@/components/admin/settings/setting-shell';
import SettingStatusBadge from '@/components/admin/settings/setting-status-badge';
import type { AdminSetting } from '@/components/admin/settings/types';
import adminRoutes from '@/routes/admin';

export default function Show({ setting }: { setting: AdminSetting }) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    router.delete(adminRoutes.settings.destroy(setting.id).url, {
      onSuccess: () => {
        setIsDeleting(false);
      },
      onError: () => {
        setIsDeleting(false);
      },
    });
  };

  return (
    <SettingShell
      title="Setting Details"
      description="View setting configuration details"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={adminRoutes.settings.index().url}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Settings
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{setting.key}</CardTitle>
                <CardDescription className="mt-2">{setting.group ?? 'No group'}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={adminRoutes.settings.edit(setting.id).url}>
                    <Edit className="mr-2 size-4" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      <Trash2 className="mr-2 size-4" />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Setting</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this setting? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Key</label>
                <p className="mt-1 font-mono text-sm">{setting.key}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <p className="mt-1">{setting.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Group</label>
                <p className="mt-1">{setting.group ?? '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Visibility</label>
                <p className="mt-1">
                  <SettingStatusBadge isPublic={setting.is_public} />
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Value</label>
              <div className="mt-1 rounded-md bg-muted p-3">
                <pre className="text-sm overflow-x-auto">{JSON.stringify(setting.value, null, 2)}</pre>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created At</label>
                <p className="mt-1">{new Date(setting.created_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                <p className="mt-1">{new Date(setting.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingShell>
  );
}
