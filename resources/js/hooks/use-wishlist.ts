import * as React from 'react';
import { router, usePage } from '@inertiajs/react';

export function useWishlist(initialIds: number[] = []) {
    const [ids, setIds] = React.useState<number[]>(initialIds);
    const { props } = usePage();
    const isAuthenticated = !!props.auth?.user;

    const toggle = React.useCallback((vehicleId: number) => {
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            router.visit('/login', { data: { redirect: window.location.href } });
            return;
        }

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
    }, [ids, isAuthenticated]);

    const isWishlisted = React.useCallback((vehicleId: number) => ids.includes(vehicleId), [ids]);

    const remove = React.useCallback((vehicleId: number) => {
        if (!isAuthenticated) {
            return;
        }

        router.delete('/customer/wishlist', {
            data: { vehicle_id: vehicleId },
            preserveScroll: true,
            onSuccess: () => {
                setIds((current) => current.filter((id) => id !== vehicleId));
            },
        });
    }, [isAuthenticated]);

    return { ids, toggle, isWishlisted, remove };
}
