import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import adminRoutes from '@/routes/admin';

const actions = [
    { label: 'Dashboard', href: adminRoutes.dashboard.index().url },
    { label: 'Vehicles', href: adminRoutes.vehicles.index().url },
    { label: 'Customers', href: adminRoutes.customers.index().url },
    { label: 'Leads', href: adminRoutes.leads.index().url },
    { label: 'Reservations', href: adminRoutes.reservations.index().url },
    { label: 'Finance Applications', href: adminRoutes.financeApplications.index().url },
    { label: 'Blog Posts', href: adminRoutes.blogPosts.index().url },
    { label: 'CMS Pages', href: adminRoutes.cmsPages.index().url },
    { label: 'Analytics', href: adminRoutes.analytics.index().url },
    { label: 'Reports', href: adminRoutes.reports.index().url },
    { label: 'Settings', href: adminRoutes.settings.index().url },
];

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const [query, setQuery] = React.useState('');
    const filtered = actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase()));

    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                onOpenChange(!open);
            }
        };
        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onOpenChange, open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader><DialogTitle>Command palette</DialogTitle></DialogHeader>
                <div className="flex items-center gap-2 rounded-xl border px-3">
                    <Search className="size-4 text-muted-foreground" />
                    <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search or jump to..." className="border-0 shadow-none focus-visible:ring-0" autoFocus />
                </div>
                <div className="space-y-2">
                    {filtered.map((action) => (
                        <Button key={action.href} variant="ghost" className="w-full justify-start" onClick={() => {
 router.visit(action.href); onOpenChange(false); 
}}>{action.label}</Button>
                    ))}
                    {query && <Button variant="outline" className="w-full justify-start" onClick={() => {
 router.visit(`/search?q=${encodeURIComponent(query)}`); onOpenChange(false); 
}}>Search site for “{query}”</Button>}
                </div>
            </DialogContent>
        </Dialog>
    );
}
