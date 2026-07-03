import * as React from 'react';
import { router } from '@inertiajs/react';

const MAX_ITEMS = 12;

export function useRecentlyViewed(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(initialIds);

    const record = React.useCallback((vehicleId: number) => {
        router.post('/customer/recently-viewed', { vehicle_id: vehicleId }, {
            preserveScroll: true,
        });
    }, []);

    const clear = React.useCallback(() => {
        router.delete('/customer/recently-viewed', {
            preserveScroll: true,
            onSuccess: () => {
                setIds([]);
            },
        });
    }, []);

    return { ids, record, clear };
}
