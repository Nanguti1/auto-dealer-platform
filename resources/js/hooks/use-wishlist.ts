import * as React from 'react';

const STORAGE_KEY = 'dealership:wishlist';

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

export function useWishlist(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(() => {
        const stored = readIds();
        return stored.length > 0 ? stored : initialIds;
    });

    const toggle = React.useCallback((vehicleId: number) => {
        setIds((current) => {
            const next = current.includes(vehicleId)
                ? current.filter((id) => id !== vehicleId)
                : [...current, vehicleId];
            writeIds(next);
            return next;
        });
    }, []);

    const isWishlisted = React.useCallback((vehicleId: number) => ids.includes(vehicleId), [ids]);

    const remove = React.useCallback((vehicleId: number) => {
        setIds((current) => {
            const next = current.filter((id) => id !== vehicleId);
            writeIds(next);
            return next;
        });
    }, []);

    return { ids, toggle, isWishlisted, remove };
}
