import * as React from 'react';

const MAX_COMPARE = 4;

export function useCompare(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(initialIds);

    const toggle = React.useCallback((vehicleId: number) => {
        setIds((current) => {
            if (current.includes(vehicleId)) {
                return current.filter((id) => id !== vehicleId);
            }

            if (current.length >= MAX_COMPARE) {
                return current;
            }

            return [...current, vehicleId];
        });
    }, []);

    const isInCompare = React.useCallback((vehicleId: number) => ids.includes(vehicleId), [ids]);

    const remove = React.useCallback((vehicleId: number) => {
        setIds((current) => current.filter((id) => id !== vehicleId));
    }, []);

    const clear = React.useCallback(() => {
        setIds([]);
    }, []);

    return { ids, toggle, isInCompare, remove, clear, maxReached: ids.length >= MAX_COMPARE, max: MAX_COMPARE };
}
