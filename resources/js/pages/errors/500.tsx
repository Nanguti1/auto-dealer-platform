import { Head, Link } from '@inertiajs/react';
import { Home, RefreshCw } from 'lucide-react';
import { H1, P } from '@/components/design-system/typography';
import { Button } from '@/components/ui/button';

export default function ServerError() {
  return (
    <>
      <Head title="Server Error" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-destructive">500</h1>
          </div>
          <H1 className="mb-4">Server Error</H1>
          <P className="mb-8 text-muted-foreground">
            Something went wrong on our end. Our team has been notified and we're working to fix the issue.
          </P>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="default">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
