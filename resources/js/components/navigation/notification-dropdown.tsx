import { Link } from '@inertiajs/react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const notifications = [
    { id: 1, title: 'Reservation update', body: 'Your Porsche 911 reservation is pending confirmation.', href: '/customer/reservations', unread: true },
    { id: 2, title: 'Saved search match', body: 'A new BMW X5 matched your saved search.', href: '/customer/saved-searches', unread: true },
    { id: 3, title: 'Finance status', body: 'Your finance application moved to lender review.', href: '/customer/finance-applications', unread: false },
];

export default function NotificationDropdown() {
    const unread = notifications.filter((notification) => notification.unread).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Open notifications">
                    <Bell className="size-5" />
                    {unread > 0 && <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">Notifications <Badge variant="secondary">{unread} new</Badge></DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} asChild>
                        <Link href={notification.href} className="flex items-start gap-3 p-3">
                            <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                            <span><span className="block font-medium">{notification.title}</span><span className="block text-xs text-muted-foreground">{notification.body}</span></span>
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/customer/notifications">View all notifications</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
