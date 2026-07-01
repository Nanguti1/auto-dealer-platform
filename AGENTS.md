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

===

<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- larastan/larastan (LARASTAN) - v3
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available in `**/skills/**`. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Tools

- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use `database-query` to run read-only queries against the database instead of writing raw SQL in tinker.
- Use `database-schema` to inspect table structure before writing migrations or models.
- Use `get-absolute-url` to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
- Use `browser-logs` to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.

## Searching Documentation (IMPORTANT)

- Always use `search-docs` before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a `packages` array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: `['rate limiting', 'routing rate limiting', 'routing']`. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use `test resource table`, not `filament 4 test resource table`.

### Search Syntax

1. Use words for auto-stemmed AND logic: `rate limit` matches both "rate" AND "limit".
2. Use `"quoted phrases"` for exact position matching: `"infinite scroll"` requires adjacent words in order.
3. Combine words and phrases for mixed queries: `middleware "rate limit"`.
4. Use multiple queries for OR logic: `queries=["authentication", "middleware"]`.

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Do not leave empty zero-parameter `__construct()` methods unless the constructor is private.
- Use explicit return type declarations and type hints for all method parameters: `function isAccessible(User $user, ?string $path = null): bool`
- Use TitleCase for Enum keys: `FavoritePerson`, `BestLake`, `Monthly`.
- Prefer PHPDoc blocks over inline comments. Only add inline comments for exceptionally complex logic.
- Use array shape type definitions in PHPDoc blocks.

=== deployments rules ===

# Deployment

- Laravel can be deployed using [Laravel Cloud](https://cloud.laravel.com/), which is the fastest way to deploy and scale production Laravel applications.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-react-development` when working with Inertia client-side patterns.

# Inertia v3

- Use all Inertia features from v1, v2, and v3. Check the documentation before making changes to ensure the correct approach.
- New v3 features: standalone HTTP requests (`useHttp` hook), optimistic updates with automatic rollback, layout props (`useLayoutProps` hook), instant visits, simplified SSR via `@inertiajs/vite` plugin, custom exception handling for error pages.
- Carried over from v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- When using deferred props, add an empty state with a pulsing or animated skeleton.
- Axios has been removed. Use the built-in XHR client with interceptors, or install Axios separately if needed.
- `Inertia::lazy()` / `LazyProp` has been removed. Use `Inertia::optional()` instead.
- Prop types (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) work inside nested arrays with dot-notation paths.
- SSR works automatically in Vite dev mode with `@inertiajs/vite` - no separate Node.js server needed during development.
- Event renames: `invalid` is now `httpException`, `exception` is now `networkError`.
- `router.cancel()` replaced by `router.cancelAll()`.
- The `future` configuration namespace has been removed - all v2 future options are now always enabled.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using `php artisan list` and check their parameters with `php artisan [command] --help`.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `php artisan make:model --help` to check the available options.

## APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.

=== wayfinder/core rules ===

# Laravel Wayfinder

Use Wayfinder to generate TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

=== pint/core rules ===

# Laravel Pint Code Formatter

- If you have modified any PHP files, you must run `vendor/bin/pint --dirty --format agent` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test --format agent`, simply run `vendor/bin/pint --format agent` to fix any formatting issues.

=== phpunit/core rules ===

# PHPUnit

- This application uses PHPUnit for testing. All tests must be written as PHPUnit classes. Use `php artisan make:test --phpunit {name}` to create a new test.
- If you see a test using "Pest", convert it to PHPUnit.
- Every time a test has been updated, run that singular test.
- When the tests relating to your feature are passing, ask the user if they would like to also run the entire test suite to make sure everything is still passing.
- Tests should cover all happy paths, failure paths, and edge cases.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files; these are core to the application.

## Running Tests

- Run the minimal number of tests, using an appropriate filter, before finalizing.
- To run all tests: `php artisan test --compact`.
- To run all tests in a file: `php artisan test --compact tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --compact --filter=testName` (recommended after making a change to a related file).

=== inertia-react/core rules ===

# Inertia + React

- IMPORTANT: Activate `inertia-react-development` when working with Inertia React client-side patterns.

</laravel-boost-guidelines>
