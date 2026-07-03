import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Bookmark, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';

interface SavedSearch {
    id: number;
    name: string;
    filters: Record<string, unknown>;
    notifyOnMatch: boolean;
    createdAt: string;
}

interface SavedSearchesProps {
    searches: SavedSearch[];
}

export default function SavedSearchesPage({ searches }: SavedSearchesProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    const applySearch = (filters: Record<string, unknown>) => {
        router.get('/inventory', filters as Record<string, string | number>);
    };

    const removeSearch = (id: number) => {
        router.delete(`/customer/saved-searches/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout title="Saved Searches" user={auth?.user}>
            <Head title="Saved Searches" />
            <H2 className="mb-6">Saved Searches</H2>

            {searches.length === 0 ? (
                <EmptyState
                    icon={Bookmark}
                    title="No saved searches"
                    description="Save your filter combinations from the inventory page."
                    action={<Button asChild><Link href="/inventory">Browse Inventory</Link></Button>}
                />
            ) : (
                <div className="space-y-4">
                    {searches.map((search) => (
                        <Card key={search.id}>
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <p className="font-semibold">{search.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Saved {new Date(search.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {Object.entries(search.filters).map(([key, val]) =>
                                            val ? (
                                                <Badge key={key} variant="secondary" className="text-xs capitalize">
                                                    {key}: {String(val)}
                                                </Badge>
                                            ) : null,
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={() => applySearch(search.filters)}>Apply</Button>
                                    <Button size="sm" variant="ghost" onClick={() => removeSearch(search.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
