import * as React from 'react';

const STORAGE_KEY = 'dealership:compare';
const MAX_COMPARE = 4;

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

export function useCompare(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(() => {
        const stored = readIds();
        return stored.length > 0 ? stored : initialIds;
    });

    const toggle = React.useCallback((vehicleId: number) => {
        setIds((current) => {
            if (current.includes(vehicleId)) {
                const next = current.filter((id) => id !== vehicleId);
                writeIds(next);
                return next;
            }
            if (current.length >= MAX_COMPARE) return current;
            const next = [...current, vehicleId];
            writeIds(next);
            return next;
        });
    }, []);

    const isInCompare = React.useCallback((vehicleId: number) => ids.includes(vehicleId), [ids]);

    const remove = React.useCallback((vehicleId: number) => {
        setIds((current) => {
            const next = current.filter((id) => id !== vehicleId);
            writeIds(next);
            return next;
        });
    }, []);

    const clear = React.useCallback(() => {
        writeIds([]);
        setIds([]);
    }, []);

    return { ids, toggle, isInCompare, remove, clear, maxReached: ids.length >= MAX_COMPARE, max: MAX_COMPARE };
}
