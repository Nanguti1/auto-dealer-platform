import { Head } from '@inertiajs/react';
import { Wrench, Clock } from 'lucide-react';
import { H1, P } from '@/components/design-system/typography';

export default function Maintenance() {
  return (
    <>
      <Head title="Under Maintenance" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Wrench className="h-12 w-12 text-primary" />
            </div>
          </div>
          <H1 className="mb-4">Under Maintenance</H1>
          <P className="mb-8 text-muted-foreground">
            We're currently performing scheduled maintenance to improve your experience. We'll be back shortly.
          </P>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Expected to be back online soon</span>
          </div>
        </div>
      </div>
    </>
  );
}
