import * as React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, User, Calendar, Globe, Monitor, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import auditLogs from '@/routes/admin/audit-logs';

interface AuditLogUser {
  id: number;
  name: string;
  email: string;
}

interface AuditLog {
  id: number;
  user_id?: number;
  event: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
  user?: AuditLogUser;
}

export default function Show({ log }: { log: AuditLog }) {
  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">null</span>;
    }
    if (typeof value === 'object') {
      return (
        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    if (typeof value === 'boolean') {
      return <Badge variant={value ? 'default' : 'secondary'}>{value.toString()}</Badge>;
    }
    return <span>{String(value)}</span>;
  };

  const renderChanges = () => {
    if (!log.old_values && !log.new_values) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <FileText className="size-12 mx-auto mb-2 opacity-50" />
          <p>No changes recorded for this log entry.</p>
        </div>
      );
    }

    const allKeys = new Set([
      ...(log.old_values ? Object.keys(log.old_values) : []),
      ...(log.new_values ? Object.keys(log.new_values) : []),
    ]);

    const changes = Array.from(allKeys).map((key) => ({
      key,
      old: log.old_values?.[key],
      new: log.new_values?.[key],
    }));

    return (
      <div className="space-y-3">
        {changes.map((change) => (
          <div key={change.key} className="border rounded-lg p-4 space-y-2">
            <div className="font-medium text-sm">{change.key}</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Old Value</div>
                {renderValue(change.old)}
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">New Value</div>
                {renderValue(change.new)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Log Details</h1>
          <p className="text-muted-foreground">View detailed information about this audit log entry.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={auditLogs.index.url()}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Logs
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID</p>
              <p className="text-lg font-semibold">{log.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Event</p>
              <Badge variant="outline" className="font-mono text-sm">
                {log.event}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <User className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">User</p>
                <p>{log.user?.name ?? 'System'}</p>
                {log.user?.email && <p className="text-sm text-muted-foreground">{log.user.email}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                <p>{new Date(log.created_at).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-5" />
              Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                <p className="font-mono text-sm">{log.ip_address ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Monitor className="size-4 text-muted-foreground mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">User Agent</p>
                <p className="text-sm break-all">{log.user_agent ?? '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Changes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">{renderChanges()}</ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
