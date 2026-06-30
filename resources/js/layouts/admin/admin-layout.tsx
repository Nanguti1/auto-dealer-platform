import * as React from 'react';
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
} from 'lucide-react';
import { admin as adminRoutes } from '@/routes/admin';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AppearanceToggleTab } from '@/components/appearance-tabs';
import CommandPalette from '@/components/navigation/command-palette';
import NotificationDropdown from '@/components/navigation/notification-dropdown';
import SearchOverlay from '@/components/navigation/search-overlay';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types/navigation';

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
    content: false,
    operations: false,
  });

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

  const getInitials = (name?: string) => {
    if (!name) return 'A';
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
        { name: 'Settings', href: adminRoutes.settings.index().url, icon: Settings },
      ],
    },
    {
      id: 'sales',
      label: 'Sales',
      items: [
        { name: 'CRM/Leads', href: adminRoutes.leads.index().url, icon: Phone },
        { name: 'Trade-Ins', href: adminRoutes.tradeIns.index().url, icon: MessageSquare },
        { name: 'Finance', href: adminRoutes.financeApplications.index().url, icon: DollarSign },
        { name: 'Reservations', href: adminRoutes.reservations.index().url, icon: Calendar },
        { name: 'Payments', href: adminRoutes.payments.index().url, icon: CreditCard },
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
        { name: 'Imports', href: adminRoutes.imports.index().url, icon: Download },
        { name: 'Analytics', href: adminRoutes.analytics.index().url, icon: BarChart3 },
      ],
    },
  ];

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Head title={title} />

      <div className="flex h-screen overflow-hidden">
        {/* Mobile backdrop */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
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
        >
          <div className="flex h-16 items-center justify-between border-b px-4">
            {sidebarOpen ? (
              <Link href={adminRoutes.dashboard.index().url} className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">AD</span>
                </div>
                <span className="font-bold">Admin</span>
              </Link>
            ) : (
              <Link href={adminRoutes.dashboard.index().url} className="flex items-center justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">AD</span>
                </div>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {navigationGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                {sidebarOpen && (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <span>{group.label}</span>
                    {expandedGroups[group.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
                {(!sidebarOpen || expandedGroups[group.id]) && (
                  <div className="space-y-1">
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
                            >
                              <item.icon className="h-5 w-5 shrink-0" />
                              {sidebarOpen && (
                                <>
                                  <span>{item.name}</span>
                                  {expandedGroups[item.name] ? (
                                    <ChevronUp className="ml-auto h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="ml-auto h-4 w-4" />
                                  )}
                                </>
                              )}
                            </button>
                            {sidebarOpen && expandedGroups[item.name] && (
                              <div className="ml-6 space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                  >
                                    <child.icon className="h-4 w-4 shrink-0" />
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
                            <item.icon className="h-5 w-5 shrink-0" />
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
            >
              <ChevronLeft className="h-5 w-5 shrink-0" />
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
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setCommandOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Open command palette</span>
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
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>

              <NotificationDropdown />

              <AppearanceToggleTab />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout" method="post">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto w-full max-w-[1600px] space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
