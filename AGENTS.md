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
- `resources/js/pages/Admin/Reviews/Index.tsx`

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

---

# Accessibility Implementation Guide

## Overview
All admin components should follow WCAG 2.1 AA standards for accessibility, ensuring keyboard navigation, screen reader support, and proper ARIA attributes.

## Core Accessibility Principles

### 1. Keyboard Navigation
- All interactive elements must be keyboard accessible
- Use logical tab order (natural DOM order)
- Provide visible focus indicators
- Support standard keyboard shortcuts (Escape, Enter, Space)

### 2. ARIA Labels and Attributes
- Add descriptive `aria-label` to icon-only buttons
- Use `aria-hidden="true"` for decorative icons
- Implement `aria-expanded` for expandable content
- Use `aria-live` for dynamic content updates
- Add `role` attributes where semantic HTML isn't sufficient

### 3. Screen Reader Support
- Ensure proper heading hierarchy (h1-h6)
- Provide alt text for images
- Use semantic HTML elements
- Add descriptive text for icon buttons

### 4. Focus Management
- Manage focus for modal dialogs
- Return focus after closing modals/menus
- Implement focus traps for mobile menus
- Use `tabIndex={-1}` for non-interactive elements

## Implementation Patterns

### Icon-Only Buttons
```tsx
// ❌ Bad - no accessibility
<Button onClick={action}>
  <Search className="h-5 w-5" />
</Button>

// ✅ Good - with aria-label
<Button onClick={action} aria-label="Search">
  <Search className="h-5 w-5" aria-hidden="true" />
</Button>
```

### Dropdown Menus
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button aria-label="Open menu">
      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem asChild>
      <Link href="/edit" aria-label="Edit item">
        <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
        Edit
      </Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tables
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox aria-label="Select all rows" />
      </TableHead>
      <TableHead>
        {sortable ? (
          <button aria-label={`Sort by ${columnLabel}`}>
            {columnLabel}
          </button>
        ) : (
          columnLabel
        )}
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell>
          <Checkbox aria-label={`Select row ${row.id}`} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Loading States
```tsx
<div role="status" aria-live="polite" aria-label="Loading data">
  <Loader2 className="animate-spin" aria-hidden="true" />
  <span>Loading...</span>
</div>
```

### Error Messages
```tsx
<div role="alert" aria-live="assertive">
  <AlertCircle className="text-destructive" aria-hidden="true" />
  <p>Error message here</p>
  <Button onClick={retry} aria-label="Retry operation">
    <RefreshCw className="mr-2" aria-hidden="true" />
    Retry
  </Button>
</div>
```

### Expandable Content
```tsx
<button
  aria-expanded={isOpen}
  aria-controls="content-id"
  onClick={toggle}
>
  {isOpen ? 'Collapse' : 'Expand'}
  <ChevronDown className="ml-2" aria-hidden="true" />
</button>
<div id="content-id" role="region">
  {isOpen && <Content />}
</div>
```

### Navigation
```tsx
<nav aria-label="Main navigation">
  <ul>
    <li>
      <Link href="/dashboard" aria-label="Go to Dashboard">
        <LayoutDashboard className="mr-2" aria-hidden="true" />
        Dashboard
      </Link>
    </li>
  </ul>
</nav>
```

## Skip-to-Content Link

The AdminLayout includes a skip-to-content link for keyboard users:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Main content */}
</main>
```

## Focus Management Patterns

### Mobile Menu Focus
```tsx
const sidebarRef = useRef<HTMLElement>(null);
const menuButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (isMobile && sidebarOpen && sidebarRef.current) {
    const firstFocusable = sidebarRef.current.querySelector('button, a, input');
    firstFocusable?.focus();
  } else if (isMobile && !sidebarOpen && menuButtonRef.current) {
    menuButtonRef.current.focus();
  }
}, [sidebarOpen, isMobile]);
```

### Escape Key Handler
```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};

<div onKeyDown={handleKeyDown}>
  {/* Menu content */}
</div>
```

## Color Contrast Guidelines

- Text must have minimum 4.5:1 contrast ratio for normal text
- Large text (18pt+) must have minimum 3:1 contrast ratio
- Interactive elements must have minimum 3:1 contrast ratio
- Avoid using color alone to convey information

## Testing Checklist

### Keyboard Navigation
- [ ] Can navigate entire interface using Tab key
- [ ] All interactive elements receive visible focus
- [ ] Escape key closes modals/menus
- [ ] Enter/Space activate buttons
- [ ] Arrow keys work in dropdowns
- [ ] Tab order is logical

### Screen Reader
- [ ] All images have alt text
- [ ] Icon buttons have aria-label
- [ ] Form fields have associated labels
- [ ] Dynamic content announcements work
- [ ] Heading hierarchy is correct
- [ ] Links are descriptive

### Focus Management
- [ ] Focus moves to modal when opened
- [ ] Focus returns to trigger when closed
- [ ] Focus is trapped in modals
- [ ] Skip-to-content link works
- [ ] Mobile menu focus management works

### Visual Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Text is resizable (up to 200%)
- [ ] No seizure-inducing content
- [ ] Sufficient spacing between elements
- [ ] Clear visual hierarchy

## ARIA Live Regions

Use `aria-live` for dynamic content that should be announced:

```tsx
// For error messages
<div role="alert" aria-live="assertive">
  Error: Something went wrong
</div>

// For loading states
<div role="status" aria-live="polite">
  Loading...
</div>

// For success messages
<div role="status" aria-live="polite">
  Successfully saved
</div>
```

## Form Accessibility

```tsx
<form>
  <label htmlFor="email">Email address</label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-hint"
    required
  />
  <p id="email-hint" className="text-sm text-muted-foreground">
    We'll never share your email with anyone else.
  </p>
</form>
```

## Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Accessibility Checklist](https://webaim.org/standards/wcag/checklist)
- [React Accessibility Guide](https://react.dev/learn/accessibility)
