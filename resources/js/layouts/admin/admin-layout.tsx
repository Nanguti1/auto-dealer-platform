import { Head, Link } from '@inertiajs/react';
import {
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  Users,
  Phone,
  DollarSign,
  Calendar,
  CreditCard,
  FileQuestion,
  Image as ImageIcon,
  Layout,
  PenTool,
  Tag,
  Megaphone,
  Star,
  Download,
  BarChart3,
  BookOpen,
  Layers,
  Columns3,
  Shield,
  Home,
  MessageSquare,
  Building2,
  FileCheck,
  ClipboardList,
  Truck,
  Wrench,
  CheckCircle,
  UserCheck,
  Receipt,
  FileClock,
} from 'lucide-react';
import * as React from 'react';
import { ErrorBoundary, LoadingState } from '@/components/admin/shared';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import adminRoutes from '@/routes/admin';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types/navigation';

// Lazy load heavy navigation components
const CommandPalette = React.lazy(() => import('@/components/navigation/command-palette'));
const NotificationDropdown = React.lazy(() => import('@/components/navigation/notification-dropdown'));
const SearchOverlay = React.lazy(() => import('@/components/navigation/search-overlay'));

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  user?: {
    name?: string;
    email?: string;
    avatar_url?: string;
  };
  breadcrumbs?: BreadcrumbItemType[];
}

export default function AdminLayout({
  children,
  className,
  title = 'Admin Dashboard',
  user,
  breadcrumbs = [],
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    main: true,
    sales: false,
    crm: false,
    content: false,
    operations: false,
    admin: false,
  });
  const sidebarRef = React.useRef<HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);

      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus management for mobile menu
  React.useEffect(() => {
    if (isMobile && sidebarOpen && sidebarRef.current) {
      const firstFocusable = sidebarRef.current.querySelector('button, a, input') as HTMLElement;
      firstFocusable?.focus();
    } else if (isMobile && !sidebarOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [sidebarOpen, isMobile]);

  // Keyboard trap for mobile menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isMobile && sidebarOpen && event.key === 'Escape') {
      setSidebarOpen(false);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) {
return 'A';
}

    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const navigationGroups = [
    {
      id: 'main',
      label: 'Main',
      items: [
        { name: 'Dashboard', href: adminRoutes.dashboard.index().url, icon: LayoutDashboard },
        {
          name: 'Inventory',
          icon: Car,
          children: [
            { name: 'Vehicles', href: adminRoutes.vehicles.index().url, icon: Car },
            { name: 'Features', href: adminRoutes.vehicleFeatures.index().url, icon: Sparkles },
            { name: 'Gallery', href: adminRoutes.vehicleGalleries.index().url, icon: ImageIcon },
          ],
        },
        { name: 'Customers', href: adminRoutes.customers.index().url, icon: Users },
        { name: 'Branches', href: adminRoutes.branches.index().url, icon: Building2 },
        { name: 'Settings', href: adminRoutes.settings.index().url, icon: Settings },
      ],
    },
    {
      id: 'sales',
      label: 'Sales',
      items: [
        { name: 'Trade-Ins', href: adminRoutes.tradeIns.index().url, icon: MessageSquare },
        { name: 'Finance', href: adminRoutes.financeApplications.index().url, icon: DollarSign },
        { name: 'Reservations', href: adminRoutes.reservations.index().url, icon: Calendar },
        { name: 'Payments', href: adminRoutes.payments.index().url, icon: CreditCard },
      ],
    },
    {
      id: 'crm',
      label: 'CRM',
      items: [
        { name: 'Leads', href: adminRoutes.leads.index().url, icon: Phone },
        { name: 'Activities', href: adminRoutes.activities.index().url, icon: ClipboardList },
        { name: 'Tasks', href: adminRoutes.tasks.index().url, icon: CheckCircle },
        { name: 'Pipeline', href: adminRoutes.pipeline.index().url, icon: Columns3 },
      ],
    },
    {
      id: 'content',
      label: 'Content',
      items: [
        {
          name: 'CMS',
          icon: Layout,
          children: [
            { name: 'Pages', href: adminRoutes.cmsPages.index().url, icon: FileText },
            { name: 'FAQs', href: adminRoutes.faqs.index().url, icon: FileQuestion },
            { name: 'Hero Sliders', href: adminRoutes.heroSliders.index().url, icon: Layers },
            { name: 'Home Sections', href: adminRoutes.homePageSections.index().url, icon: Home },
            { name: 'Media', href: adminRoutes.media.index().url, icon: ImageIcon },
            { name: 'SEO', href: adminRoutes.seoMetadata.index().url, icon: Shield },
          ],
        },
        {
          name: 'Blog',
          icon: BookOpen,
          children: [
            { name: 'Posts', href: adminRoutes.blogPosts.index().url, icon: PenTool },
            { name: 'Categories', href: adminRoutes.blogCategories.index().url, icon: Tag },
            { name: 'Tags', href: adminRoutes.blogTags.index().url, icon: Tag },
          ],
        },
        {
          name: 'Marketing',
          icon: Megaphone,
          children: [
            { name: 'Promotions', href: adminRoutes.promotions.index().url, icon: Megaphone },
            { name: 'Reviews', href: adminRoutes.reviews.index().url, icon: Star },
          ],
        },
      ],
    },
    {
      id: 'operations',
      label: 'Operations',
      items: [
        {
          name: 'Imports',
          icon: Download,
          children: [
            { name: 'Requests', href: adminRoutes.imports.index().url, icon: FileCheck },
            { name: 'Shipments', href: adminRoutes.shipments.index().url, icon: Truck },
            { name: 'Documents', href: adminRoutes.importDocuments.index().url, icon: FileText },
            { name: 'Payments', href: adminRoutes.importPayments.index().url, icon: CreditCard },
          ],
        },
        {
          name: 'Trade-Ins Workflow',
          icon: Wrench,
          children: [
            { name: 'Inspections', href: adminRoutes.inspections.index().url, icon: CheckCircle },
            { name: 'Valuations', href: adminRoutes.valuations.index().url, icon: DollarSign },
            { name: 'Offers', href: adminRoutes.offers.index().url, icon: FileCheck },
          ],
        },
        { name: 'Analytics', href: adminRoutes.analytics.index().url, icon: BarChart3 },
      ],
    },
    {
      id: 'admin',
      label: 'Admin',
      items: [
        {
          name: 'Users',
          icon: UserCheck,
          children: [
            { name: 'Users', href: adminRoutes.users.index().url, icon: Users },
            { name: 'Roles', href: adminRoutes.roles.index().url, icon: Shield },
            { name: 'Permissions', href: adminRoutes.permissions.index().url, icon: FileCheck },
          ],
        },
        {
          name: 'Financial',
          icon: Receipt,
          children: [
            { name: 'Invoices', href: adminRoutes.invoices.index().url, icon: FileText },
            { name: 'Receipts', href: adminRoutes.receipts.index().url, icon: Receipt },
            { name: 'Refunds', href: adminRoutes.refunds.index().url, icon: FileClock },
          ],
        },
        { name: 'Reports', href: adminRoutes.reports.index().url, icon: BarChart3 },
        { name: 'Audit Logs', href: adminRoutes.auditLogs.index().url, icon: FileClock },
      ],
    },
  ];

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Head title={title} />

      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="flex h-screen overflow-hidden">
        {/* Mobile backdrop */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={cn(
            'flex flex-col border-r bg-card transition-all duration-300 z-50',
            isMobile
              ? sidebarOpen
                ? 'fixed inset-y-0 left-0 w-64'
                : 'hidden'
              : sidebarOpen
              ? 'w-64'
              : 'w-16'
          )}
          aria-label="Main navigation"
          onKeyDown={handleKeyDown}
        >
          <div className="flex h-16 items-center justify-between border-b px-4">
            {sidebarOpen ? (
              <Link href={adminRoutes.dashboard.index().url} className="flex items-center space-x-2" aria-label="Go to Admin Dashboard">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">AD</span>
                </div>
                <span className="font-bold">Admin</span>
              </Link>
            ) : (
              <Link href={adminRoutes.dashboard.index().url} className="flex items-center justify-center" aria-label="Go to Admin Dashboard">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">AD</span>
                </div>
              </Link>
            )}
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Navigation menu">
            {navigationGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                {sidebarOpen && (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    aria-expanded={expandedGroups[group.id]}
                    aria-controls={`nav-group-${group.id}`}
                  >
                    <span>{group.label}</span>
                    {expandedGroups[group.id] ? (
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                )}
                {(!sidebarOpen || expandedGroups[group.id]) && (
                  <div id={`nav-group-${group.id}`} className="space-y-1" role="group">
                    {group.items.map((item) => (
                      <div key={item.name}>
                        {item.children ? (
                          <div className="space-y-1">
                            <button
                              onClick={() => toggleGroup(item.name)}
                              className={cn(
                                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                sidebarOpen ? 'justify-start' : 'justify-center'
                              )}
                              aria-expanded={expandedGroups[item.name]}
                              aria-controls={`nav-subgroup-${item.name.replace(/\s+/g, '-')}`}
                            >
                              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                              {sidebarOpen && (
                                <>
                                  <span>{item.name}</span>
                                  {expandedGroups[item.name] ? (
                                    <ChevronUp className="ml-auto h-4 w-4" aria-hidden="true" />
                                  ) : (
                                    <ChevronDown className="ml-auto h-4 w-4" aria-hidden="true" />
                                  )}
                                </>
                              )}
                            </button>
                            {sidebarOpen && expandedGroups[item.name] && (
                              <div id={`nav-subgroup-${item.name.replace(/\s+/g, '-')}`} className="ml-6 space-y-1" role="group">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                  >
                                    <child.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span>{child.name}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                              sidebarOpen ? 'justify-start' : 'justify-center'
                            )}
                          >
                            <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                            {sidebarOpen && <span>{item.name}</span>}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t p-2">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                sidebarOpen ? 'justify-start' : 'justify-center'
              )}
              aria-label="Return to main website"
            >
              <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
              {sidebarOpen && <span>Back to Site</span>}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex flex-1 items-center gap-4">
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setCommandOpen(true)} aria-label="Open command palette">
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{title}</h1>
                {breadcrumbs.length > 0 && (
                  <div className="hidden sm:block text-sm text-muted-foreground">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Open search">
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>

              <React.Suspense fallback={<div className="h-8 w-8 rounded-full bg-muted" aria-hidden="true" />}>
                <NotificationDropdown />
              </React.Suspense>

              <AppearanceToggleTab />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar_url} alt={user?.name} />
                      <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={adminRoutes.settings.index().url}>
                      <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout" method="post">
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main id="main-content" className="flex-1 overflow-y-auto p-6" tabIndex={-1}>
            <div className="mx-auto w-full max-w-[1600px] space-y-6">
              <ErrorBoundary>
                <React.Suspense fallback={<LoadingState message="Loading page..." />}>
                  {children}
                </React.Suspense>
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>

      <React.Suspense fallback={null}>
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      </React.Suspense>
    </div>
  );
}
