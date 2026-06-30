import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Bell, Bookmark, Shield, Palette } from 'lucide-react';
import { H2, P } from '@/components/design-system/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';

const settingsLinks = [
    { title: 'Notifications', description: 'Manage email and push notification preferences', href: '/customer/notifications', icon: Bell },
    { title: 'Saved Searches', description: 'View and manage your saved vehicle searches', href: '/customer/saved-searches', icon: Bookmark },
    { title: 'Security', description: 'Password, two-factor authentication, and passkeys', href: '/settings/security', icon: Shield },
    { title: 'Appearance', description: 'Theme and display preferences', href: '/settings/appearance', icon: Palette },
];

export default function CustomerSettingsPage() {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    return (
        <DashboardLayout title="Settings" user={auth?.user}>
            <Head title="Customer Settings" />

            <H2 className="mb-2">Settings</H2>
            <P className="mb-8">Manage your account preferences and notifications.</P>

            <div className="grid gap-4 sm:grid-cols-2">
                {settingsLinks.map(({ title, description, href, icon: Icon }) => (
                    <Link key={title} href={href}>
                        <Card className="h-full transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{description}</p>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </DashboardLayout>
    );
}
