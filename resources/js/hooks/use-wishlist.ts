import * as React from 'react';
import { router } from '@inertiajs/react';

export function useWishlist(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(initialIds);

    const toggle = React.useCallback((vehicleId: number) => {
        if (ids.includes(vehicleId)) {
            router.delete('/customer/wishlist', {
                data: { vehicle_id: vehicleId },
                preserveScroll: true,
                onSuccess: () => {
                    setIds((current) => current.filter((id) => id !== vehicleId));
                },
            });
        } else {
            router.post('/customer/wishlist', { vehicle_id: vehicleId }, {
                preserveScroll: true,
                onSuccess: () => {
                    setIds((current) => [...current, vehicleId]);
                },
            });
        }
    }, [ids]);

    const isWishlisted = React.useCallback((vehicleId: number) => ids.includes(vehicleId), [ids]);

    const remove = React.useCallback((vehicleId: number) => {
        router.delete('/customer/wishlist', {
            data: { vehicle_id: vehicleId },
            preserveScroll: true,
            onSuccess: () => {
                setIds((current) => current.filter((id) => id !== vehicleId));
            },
        });
    }, []);

    return { ids, toggle, isWishlisted, remove };
}
