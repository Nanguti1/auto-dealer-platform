import * as React from 'react';
import { router, usePage } from '@inertiajs/react';
import type { InventoryFilters, SavedSearch } from '@/types/vehicle';

export function useSavedSearches(initial: SavedSearch[] = []) {
    const [searches, setSearches] = React.useState<SavedSearch[]>(initial);
    const { props } = usePage();
    const isAuthenticated = !!props.auth?.user;

    const save = React.useCallback((name: string, filters: InventoryFilters, notifyOnMatch = false) => {
        if (!isAuthenticated) {
            router.visit('/login', { data: { redirect: window.location.href } });
            return;
        }

        router.post('/customer/saved-searches', {
            name,
            filters,
            notify_on_match: notifyOnMatch,
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                setSearches(page.props.searches);
            },
        });
    }, [isAuthenticated]);

    const remove = React.useCallback((id: number) => {
        if (!isAuthenticated) {
            return;
        }

        router.delete(`/customer/saved-searches/${id}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                setSearches(page.props.searches);
            },
        });
    }, [isAuthenticated]);

    return { searches, save, remove };
}
