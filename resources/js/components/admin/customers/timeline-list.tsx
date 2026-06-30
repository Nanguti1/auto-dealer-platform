import { Badge } from '@/components/ui/badge';
import { formatDate } from './helpers';
import type { TimelineEvent } from './types';

export default function TimelineList({ events = [] }: { events?: TimelineEvent[] }) {
  if (events.length === 0) {
    return <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No customer activity has been recorded yet.</div>;
  }

  return (
    <ol className="relative space-y-6 border-l pl-6">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute -left-[31px] top-1 size-3 rounded-full border bg-background ring-4 ring-background" />
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">{event.title ?? event.type ?? 'Activity event'}</h3>
                <p className="text-sm text-muted-foreground">{event.description ?? 'No additional details provided.'}</p>
              </div>
              <Badge variant="secondary">{event.status ?? event.type ?? 'activity'}</Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{formatDate(event.occurred_at ?? event.created_at)}{event.actor ? ` · ${event.actor}` : ''}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
