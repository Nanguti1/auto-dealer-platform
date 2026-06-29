import * as React from 'react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = React.useState('');

  const submit = (term = query) => {
    if (!term.trim()) return;
    router.visit(`/search?q=${encodeURIComponent(term.trim())}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
          <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); submit(); }}>
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search vehicles, brands, models..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 text-lg shadow-none focus-visible:ring-0"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        </DialogHeader>
        
        {query && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Search results for "{query}"
            </p>
            <div className="space-y-2">
              {/* Placeholder for search results */}
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer">
                <div className="h-16 w-24 bg-muted rounded-md" />
                <div>
                  <p className="font-medium">Vehicle Name</p>
                  <p className="text-sm text-muted-foreground">$XX,XXX</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!query && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['SUV', 'Sedan', 'Truck', 'Electric', 'Luxury'].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => submit(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
