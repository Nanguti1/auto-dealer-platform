import * as React from 'react';
import { router, usePage } from '@inertiajs/react';

const MAX_ITEMS = 12;

export function useRecentlyViewed(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(initialIds);
    const { props } = usePage();
    const isAuthenticated = !!props.auth?.user;

    const record = React.useCallback((vehicleId: number) => {
        if (!isAuthenticated) {
            return;
        }

        router.post('/customer/recently-viewed', { vehicle_id: vehicleId }, {
            preserveScroll: true,
        });
    }, [isAuthenticated]);

    const clear = React.useCallback(() => {
        if (!isAuthenticated) {
            return;
        }

        router.delete('/customer/recently-viewed', {
            preserveScroll: true,
            onSuccess: () => {
                setIds([]);
            },
        });
    }, [isAuthenticated]);

    return { ids, record, clear };
}
