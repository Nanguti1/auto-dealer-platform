import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import adminRoutes from '@/routes/admin';

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const adminQuickLinks = [
  { label: 'Dashboard', href: adminRoutes.dashboard.index().url },
  { label: 'Vehicles', href: adminRoutes.vehicles.index().url },
  { label: 'Customers', href: adminRoutes.customers.index().url },
  { label: 'Leads', href: adminRoutes.leads.index().url },
  { label: 'Reservations', href: adminRoutes.reservations.index().url },
  { label: 'Finance Applications', href: adminRoutes.financeApplications.index().url },
  { label: 'Trade-Ins', href: adminRoutes.tradeIns.index().url },
  { label: 'Analytics', href: adminRoutes.analytics.index().url },
  { label: 'Reports', href: adminRoutes.reports.index().url },
  { label: 'Settings', href: adminRoutes.settings.index().url },
];

export default function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = React.useState('');

  const filteredLinks = adminQuickLinks.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase())
  );

  const submit = (term = query) => {
    if (!term.trim()) {
return;
}

    const matchingLink = adminQuickLinks.find((link) =>
      link.label.toLowerCase() === term.trim().toLowerCase()
    );

    if (matchingLink) {
      router.visit(matchingLink.href);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Search Admin</DialogTitle>
          <form className="flex items-center gap-2" onSubmit={(event) => {
 event.preventDefault(); submit(); 
}}>
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search admin modules..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 text-lg shadow-none focus-visible:ring-0"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="Close search"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </form>
        </DialogHeader>

        {query && filteredLinks.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Quick links matching "{query}"
            </p>
            <div className="space-y-2">
              {filteredLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.visit(link.href);
                    onOpenChange(false);
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {!query && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">Quick links</p>
            <div className="flex flex-wrap gap-2">
              {adminQuickLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    router.visit(link.href);
                    onOpenChange(false);
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
