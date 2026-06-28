import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { H1, P } from '@/components/design-system/typography';

export default function NotFound() {
  return (
    <>
      <Head title="Page Not Found" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary">404</h1>
          </div>
          <H1 className="mb-4">Page Not Found</H1>
          <P className="mb-8 text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
          </P>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="default">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" onClick={() => window.history.back()}>
              <button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </button>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
