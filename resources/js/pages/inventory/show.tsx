import * as React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '@/layouts/public/public-layout';
import {
    VehicleGallery,
    VehicleVideoSection,
    Vehicle360Viewer,
    VehicleSpecsPanel,
    FinanceCalculator,
    VehicleInquiryForm,
    WishlistButton,
    CompareButton,
} from '@/components/vehicles';
import VehicleCard from '@/components/shared/vehicle-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCompare } from '@/hooks/use-compare';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { findVehicleBySlug, mockVehicles, toSummary } from '@/data/mock-vehicles';
import type { VehicleDetail } from '@/types/vehicle';
import { Calendar, Gauge, Fuel, ArrowLeft, Share2, Phone } from 'lucide-react';

interface InventoryShowProps {
    vehicle?: VehicleDetail;
    related?: VehicleDetail[];
}

export default function InventoryShow({ vehicle: serverVehicle, related: serverRelated }: InventoryShowProps) {
    const { url } = usePage();
    const slug = url.split('/inventory/')[1]?.split('?')[0] ?? '';
    const vehicle = serverVehicle ?? findVehicleBySlug(slug) ?? mockVehicles[0];
    const related = serverRelated ?? mockVehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

    const { toggle: toggleWishlist, isWishlisted } = useWishlist();
    const { toggle: toggleCompare, isInCompare, maxReached } = useCompare();
    const { record } = useRecentlyViewed();

    React.useEffect(() => {
        record(vehicle.id);
    }, [vehicle.id, record]);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

    const formatMileage = (mileage: number) => new Intl.NumberFormat('en-US').format(mileage);

    return (
        <PublicLayout title={vehicle.name}>
            <Head title={vehicle.name} />

            {/* Breadcrumb bar */}
            <div className="border-b">
                <div className="container flex items-center justify-between py-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/inventory">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Inventory
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <WishlistButton active={isWishlisted(vehicle.id)} onToggle={() => toggleWishlist(vehicle.id)} />
                        <CompareButton
                            active={isInCompare(vehicle.id)}
                            disabled={maxReached && !isInCompare(vehicle.id)}
                            onToggle={() => toggleCompare(vehicle.id)}
                        />
                        <Button variant="ghost" size="icon" aria-label="Share">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Gallery + sticky sidebar — Tesla/Porsche layout */}
            <section className="py-8 md:py-12">
                <div className="container">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="space-y-10 lg:col-span-2">
                            <VehicleGallery images={vehicle.galleries} />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {vehicle.condition && (
                                        <Badge variant="secondary" className="capitalize">{vehicle.condition}</Badge>
                                    )}
                                    {vehicle.featured && <Badge>Featured</Badge>}
                                    {vehicle.condition === 'certified' && <Badge variant="outline">Certified</Badge>}
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{vehicle.name}</h1>
                                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{vehicle.description}</p>
                            </motion.div>

                            {/* Quick specs row */}
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {[
                                    { icon: Gauge, label: 'Mileage', value: `${formatMileage(vehicle.mileage)} mi` },
                                    { icon: Fuel, label: 'Fuel', value: vehicle.fuelType },
                                    { icon: Calendar, label: 'Year', value: String(vehicle.year) },
                                    { icon: Phone, label: 'Transmission', value: vehicle.transmission },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="rounded-xl border bg-card p-4 text-center">
                                        <Icon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground">{label}</p>
                                        <p className="font-semibold">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {vehicle.has360 && (
                                <div>
                                    <h2 className="mb-4 text-2xl font-bold">360° View</h2>
                                    <Vehicle360Viewer imageUrl={vehicle.image} />
                                </div>
                            )}

                            <VehicleVideoSection videos={vehicle.videos} />

                            {/* Features */}
                            {vehicle.features.length > 0 && (
                                <div>
                                    <h2 className="mb-4 text-2xl font-bold">Features & Equipment</h2>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {vehicle.features.map((f) => (
                                            <div key={f.id} className="flex items-center gap-3 rounded-lg border p-3">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <div>
                                                    <p className="font-medium">{f.name}</p>
                                                    <p className="text-xs text-muted-foreground">{f.category}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <VehicleSpecsPanel specifications={vehicle.specifications} sticky={false} />
                        </div>

                        {/* Sticky purchase panel */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                    <p className="text-sm text-muted-foreground">Price</p>
                                    <p className="text-3xl font-bold tracking-tight">{formatPrice(vehicle.price)}</p>
                                    {vehicle.msrp && vehicle.msrp > vehicle.price && (
                                        <p className="mt-1 text-sm text-muted-foreground line-through">
                                            MSRP {formatPrice(vehicle.msrp)}
                                        </p>
                                    )}
                                    <Separator className="my-5" />
                                    <dl className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">Stock #</dt>
                                            <dd className="font-medium">{vehicle.stockNumber}</dd>
                                        </div>
                                        {vehicle.color && (
                                            <div className="flex justify-between">
                                                <dt className="text-muted-foreground">Exterior</dt>
                                                <dd className="font-medium">{vehicle.color}</dd>
                                            </div>
                                        )}
                                        {vehicle.interiorColor && (
                                            <div className="flex justify-between">
                                                <dt className="text-muted-foreground">Interior</dt>
                                                <dd className="font-medium">{vehicle.interiorColor}</dd>
                                            </div>
                                        )}
                                        {vehicle.driveType && (
                                            <div className="flex justify-between">
                                                <dt className="text-muted-foreground">Drive</dt>
                                                <dd className="font-medium">{vehicle.driveType}</dd>
                                            </div>
                                        )}
                                    </dl>
                                    <div className="mt-6 space-y-3">
                                        <Button className="w-full" size="lg" asChild>
                                            <Link href="/contact">Schedule Test Drive</Link>
                                        </Button>
                                        <Button className="w-full" size="lg" variant="outline" asChild>
                                            <Link href="/finance/calculator">Get Pre-Approved</Link>
                                        </Button>
                                    </div>
                                </div>

                                <FinanceCalculator defaultPrice={vehicle.price} />
                                <VehicleInquiryForm vehicleId={vehicle.id} vehicleName={vehicle.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related */}
            {related.length > 0 && (
                <section className="border-t bg-muted/30 py-14">
                    <div className="container">
                        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((v) => (
                                <VehicleCard key={v.id} vehicle={toSummary(v)} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
