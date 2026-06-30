# Error Boundaries and Loading States Implementation Guide

## Overview
All admin pages should implement comprehensive error boundaries and loading states using the shared components in `resources/js/components/admin/shared/`.

## Available Components

### ErrorBoundary
- **Location**: `resources/js/components/admin/shared/ErrorBoundary.tsx`
- **Usage**: Wrap page content to catch React errors
- **Features**: 
  - User-friendly error messages
  - Retry functionality
  - Error logging for debugging
  - Custom fallback support

### LoadingState
- **Location**: `resources/js/components/admin/shared/LoadingState.tsx`
- **Variants**: `full-page`, `inline`, `skeleton`, `spinner`
- **Specialized Components**: `TableLoading`, `CardLoading`, `ChartLoading`

### EmptyState
- **Location**: `resources/js/components/admin/shared/EmptyState.tsx`
- **Pre-configured States**: 
  - `EmptyCustomers`
  - `EmptyVehicles`
  - `EmptyLeads`
  - `EmptyReservations`
  - `EmptyFinanceApplications`
  - `EmptySearchResults`
  - `EmptyDocuments`
  - `EmptyGeneric`

### InlineError
- **Location**: `resources/js/components/admin/shared/ErrorBoundary.tsx`
- **Usage**: For inline error display with retry functionality

## Implementation Pattern

### Basic Index Page Pattern

```tsx
import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { LoadingState, Empty[Module], InlineError } from '@/components/admin/shared';
import ModuleShell from '@/components/admin/[module]/[module]-shell';

export default function Index({ data, filters = {} }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // Loading state
  if (isLoading) {
    return (
      <ModuleShell title="[Module]" description="[Description]">
        <LoadingState message="Loading [module]..." variant="full-page" />
      </ModuleShell>
    );
  }

  // Error state
  if (error) {
    return (
      <ModuleShell title="[Module]" description="[Description]">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.[module].index().url);
          }}
        />
      </ModuleShell>
    );
  }

  // Empty state
  return (
    <ModuleShell title="[Module]" description="[Description]">
      {data.data.length === 0 ? (
        <Empty[Module] onCreate={() => router.visit(admin.[module].create().url)} />
      ) : (
        // Render your data table or content here
        <AdminDataTable rows={data} filters={filters} columns={columns} baseUrl={admin.[module].index().url} />
      )}
    </ModuleShell>
  );
}
```

### Show/Detail Page Pattern

```tsx
import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { LoadingState, InlineError } from '@/components/admin/shared';
import ModuleShell from '@/components/admin/[module]/[module]-shell';

export default function Show({ item }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  if (isLoading) {
    return (
      <ModuleShell title="[Module]" description="[Description]">
        <LoadingState message="Loading [module] details..." variant="full-page" />
      </ModuleShell>
    );
  }

  if (error) {
    return (
      <ModuleShell title="[Module]" description="[Description]">
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(admin.[module].show(item.id).url);
          }}
        />
      </ModuleShell>
    );
  }

  return (
    <ModuleShell title="[Module]" description="[Description]">
      {/* Render your content here */}
    </ModuleShell>
  );
}
```

### Create/Edit Page Pattern

```tsx
import * as React from 'react';
import { router } from '@inertiajs/react';
import { LoadingState, InlineError } from '@/components/admin/shared';
import ModuleShell from '@/components/admin/[module]/[module]-shell';

export default function Create({ /* props */ }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = (data: FormData) => {
    setIsLoading(true);
    router.post(admin.[module].store().url, data, {
      onSuccess: () => setIsLoading(false),
      onError: (errors) => {
        setError(new Error(Object.values(errors).join(', ')));
        setIsLoading(false);
      },
    });
  };

  if (isLoading) {
    return (
      <ModuleShell title="Create [Module]" description="[Description]">
        <LoadingState message="Creating [module]..." variant="full-page" />
      </ModuleShell>
    );
  }

  return (
    <ModuleShell title="Create [Module]" description="[Description]">
      {error && (
        <InlineError
          error={error}
          onRetry={() => setError(null)}
        />
      )}
      {/* Render your form here */}
    </ModuleShell>
  );
}
```

## ModuleShell Integration

The `ModuleShell` component already includes:
- AdminLayout wrapper
- PageHeader
- PageWrapper
- Breadcrumb generation

The AdminLayout already wraps children in:
- ErrorBoundary at the page level
- React.Suspense with LoadingState for lazy-loaded components

## Pages to Update

Apply this pattern to the following remaining admin pages:

### Blog Module
- `resources/js/pages/Admin/Blog/Categories/Index.tsx`
- `resources/js/pages/Admin/Blog/Posts/Index.tsx`
- `resources/js/pages/Admin/Blog/Tags/Index.tsx`

### CMS Module
- `resources/js/pages/Admin/CMS/Pages/Index.tsx`
- `resources/js/pages/Admin/CMS/FAQs/Index.tsx`
- `resources/js/pages/Admin/CMS/HeroSliders/Index.tsx`
- `resources/js/pages/Admin/CMS/HomePageSections/Index.tsx`
- `resources/js/pages/Admin/CMS/Media/Index.tsx`
- `resources/js/pages/Admin/CMS/SeoMetadata/Index.tsx`

### CRM Module
- `resources/js/pages/Admin/CRM/Activities/Index.tsx`
- `resources/js/pages/Admin/CRM/Tasks/Index.tsx`
- `resources/js/pages/Admin/CRM/Pipeline/Index.tsx`

### Finance Module
- `resources/js/pages/Admin/Finance/Applications/Index.tsx`
- `resources/js/pages/Admin/Finance/Documents/Index.tsx`

### Imports Module
- `resources/js/pages/Admin/Imports/Requests/Index.tsx`
- `resources/js/pages/Admin/Imports/Shipments/Index.tsx`
- `resources/js/pages/Admin/Imports/Documents/Index.tsx`
- `resources/js/pages/Admin/Imports/Payments/Index.tsx`

### Inventory Module
- `resources/js/pages/Admin/Inventory/Features/Index.tsx`
- `resources/js/pages/Admin/Inventory/Gallery/Index.tsx`

### Marketing Module
- `resources/js/pages/Admin/Marketing/Promotions/Index.tsx`
- `resources/js/pages/Admin/Reviews/Reviews/Index.tsx`

### Reservations Module
- `resources/js/pages/Admin/Reservations/Index.tsx`

### Customers Module
- `resources/js/pages/Admin/Customers/Documents/Index.tsx`
- `resources/js/pages/Admin/Customers/Notes/Index.tsx`
- `resources/js/pages/Admin/Customers/Timeline/Index.tsx`

## Testing Checklist

After implementing error boundaries and loading states:

1. **Loading States**: Verify loading spinners appear during data fetching
2. **Empty States**: Verify appropriate empty states appear when no data exists
3. **Error States**: Verify error messages appear and retry functionality works
4. **Retry Functionality**: Test that retry buttons reload the page or data
5. **Navigation**: Ensure back/refresh navigation works correctly
6. **Responsive Design**: Verify states look good on mobile and desktop

## Additional Notes

- Use `EmptyGeneric` for modules without specific empty state components
- For form submissions, show inline errors rather than full-page errors
- For delete operations, use ConfirmationDialog with loading state
- Lazy-loaded chart components should use React.Suspense with LoadingSkeleton
- The AdminLayout already provides top-level error boundary protection
