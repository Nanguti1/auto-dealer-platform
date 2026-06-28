import * as React from 'react';

const STORAGE_KEY = 'dealership:recently-viewed';
const MAX_ITEMS = 12;

function readIds(): number[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as number[];
    } catch {
        return [];
    }
}

function writeIds(ids: number[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useRecentlyViewed(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(() => {
        const stored = readIds();
        return stored.length > 0 ? stored : initialIds;
    });

    const record = React.useCallback((vehicleId: number) => {
        setIds((current) => {
            const next = [vehicleId, ...current.filter((id) => id !== vehicleId)].slice(0, MAX_ITEMS);
            writeIds(next);
            return next;
        });
    }, []);

    const clear = React.useCallback(() => {
        writeIds([]);
        setIds([]);
    }, []);

    return { ids, record, clear };
}
