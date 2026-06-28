import * as React from 'react';
import type { InventoryFilters, SavedSearch } from '@/types/vehicle';

const STORAGE_KEY = 'dealership:saved-searches';

function readSearches(): SavedSearch[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as SavedSearch[];
    } catch {
        return [];
    }
}

function writeSearches(searches: SavedSearch[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

export function useSavedSearches(initial: SavedSearch[] = []) {
    const [searches, setSearches] = React.useState<SavedSearch[]>(() => {
        const stored = readSearches();
        return stored.length > 0 ? stored : initial;
    });

    const save = React.useCallback((name: string, filters: InventoryFilters, notifyOnMatch = false) => {
        setSearches((current) => {
            const next: SavedSearch[] = [
                {
                    id: Date.now(),
                    name,
                    filters,
                    notifyOnMatch,
                    createdAt: new Date().toISOString(),
                },
                ...current,
            ];
            writeSearches(next);
            return next;
        });
    }, []);

    const remove = React.useCallback((id: number) => {
        setSearches((current) => {
            const next = current.filter((s) => s.id !== id);
            writeSearches(next);
            return next;
        });
    }, []);

    return { searches, save, remove };
}
