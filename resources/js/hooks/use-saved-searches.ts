import * as React from 'react';
import { router } from '@inertiajs/react';
import type { InventoryFilters, SavedSearch } from '@/types/vehicle';

export function useSavedSearches(initial: SavedSearch[] = []) {
    const [searches, setSearches] = React.useState<SavedSearch[]>(initial);

    const save = React.useCallback((name: string, filters: InventoryFilters, notifyOnMatch = false) => {
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
    }, []);

    const remove = React.useCallback((id: number) => {
        router.delete(`/customer/saved-searches/${id}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                setSearches(page.props.searches);
            },
        });
    }, []);

    return { searches, save, remove };
}
