import { Plus, Search, Inbox, FileText, Users, Car, Calendar, DollarSign, Package } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  };
  className?: string;
}

export function EmptyState({ 
  icon, 
  title = 'No data found', 
  description = 'There are no items to display.',
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[300px] p-8 text-center', className)}>
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant={action.variant || 'default'}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Pre-configured empty states for common use cases

export function EmptyCustomers({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="h-12 w-12" />}
      title="No customers yet"
      description="Get started by adding your first customer to the system."
      action={onCreate ? { label: 'Add customer', onClick: onCreate } : undefined}
    />
  );
}

export function EmptyVehicles({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Car className="h-12 w-12" />}
      title="No vehicles in inventory"
      description="Your inventory is empty. Add vehicles to start managing your stock."
      action={onCreate ? { label: 'Add vehicle', onClick: onCreate } : undefined}
    />
  );
}

export function EmptyLeads({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12" />}
      title="No leads yet"
      description="Capture potential sales by creating your first lead."
      action={onCreate ? { label: 'Create lead', onClick: onCreate } : undefined}
    />
  );
}

export function EmptyReservations({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12" />}
      title="No reservations"
      description="No vehicle reservations have been made yet."
      action={onCreate ? { label: 'Create reservation', onClick: onCreate } : undefined}
    />
  );
}

export function EmptyFinanceApplications({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<DollarSign className="h-12 w-12" />}
      title="No finance applications"
      description="No finance applications have been submitted yet."
      action={onCreate ? { label: 'Create application', onClick: onCreate } : undefined}
    />
  );
}

export function EmptySearchResults({ query, onClear }: { query?: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12" />}
      title="No results found"
      description={query ? `No results found for "${query}". Try a different search term.` : 'No results found. Try adjusting your filters.'}
      action={onClear ? { label: 'Clear search', onClick: onClear, variant: 'outline' } : undefined}
    />
  );
}

export function EmptyDocuments({ onUpload }: { onUpload?: () => void }) {
  return (
    <EmptyState
      icon={<Package className="h-12 w-12" />}
      title="No documents"
      description="No documents have been uploaded yet."
      action={onUpload ? { label: 'Upload document', onClick: onUpload } : undefined}
    />
  );
}

export function EmptyGeneric({ 
  title, 
  description, 
  action 
}: { 
  title?: string; 
  description?: string; 
  action?: { label: string; onClick: () => void } 
}) {
  return (
    <EmptyState
      icon={<Inbox className="h-12 w-12" />}
      title={title}
      description={description}
      action={action ? { label: action.label, onClick: action.onClick } : undefined}
    />
  );
}
