import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Gauge, Fuel, ArrowLeft, Share2, Phone, CheckCircle2, TrendingDown, Loader2 } from 'lucide-react';
import * as React from 'react';
import VehicleCard from '@/components/shared/vehicle-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
    VehicleGallery,
    VehicleVideoSection,
    VehicleSpecsPanel,
    FinanceCalculator,
    VehicleInquiryForm,
    WishlistButton,
    CompareButton,
} from '@/components/vehicles';

import { useCompare } from '@/hooks/use-compare';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { useWishlist } from '@/hooks/use-wishlist';
import PublicLayout from '@/layouts/public/public-layout';
import type { VehicleDetail } from '@/types/vehicle';

interface InventoryShowProps {
    vehicle?: VehicleDetail;
    related?: VehicleDetail[];
}

export default function InventoryShow({ vehicle: serverVehicle, related: serverRelated }: InventoryShowProps) {
    const vehicle = serverVehicle;
    const related = serverRelated ?? [];

    const { toggle: toggleWishlist, isWishlisted } = useWishlist();
    const { toggle: toggleCompare, isInCompare, maxReached } = useCompare();
    const { record } = useRecentlyViewed();
    const [shareCopied, setShareCopied] = React.useState(false);
    const shouldReduceMotion = useReducedMotion();

    const reservationForm = useForm({
        type: 'reservation',
        vehicle_id: vehicle?.id,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        notes: '',
    });

    const testDriveForm = useForm({
        type: 'test-drive',
        vehicle_id: vehicle?.id,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        preferred_date: '',
        notes: '',
    });

    React.useEffect(() => {
        if (vehicle) {
            record(vehicle.id);
        }
    }, [vehicle?.id, record]);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

    const formatMileage = (mileage: number) => new Intl.NumberFormat('en-US').format(mileage);

    const toSummary = (vehicle: VehicleDetail) => {
        const { galleries, videos, specifications, features, description, stockNumber, vin, msrp, color, interiorColor, driveType, engineType, trim, listedAt, ...summary } = vehicle;
        return summary;
    };

    if (!vehicle) {
        return (
            <PublicLayout title="Vehicle Not Found" description="The requested vehicle could not be found.">
                <Head title="Vehicle Not Found" />
                <div className="container py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
                    <p className="text-muted-foreground mb-6">The vehicle you're looking for is not available or has been sold.</p>
                    <Button asChild>
                        <Link href="/inventory">Back to Inventory</Link>
                    </Button>
                </div>
            </PublicLayout>
        );
    }

    const shareVehicle = async () => {
        const shareUrl = typeof window !== 'undefined' ? window.location.href : `/inventory/${vehicle.slug}`;

        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            await navigator.share({ title: vehicle.name, url: shareUrl });

            return;
        }

        await navigator.clipboard?.writeText(shareUrl);
        setShareCopied(true);
        window.setTimeout(() => setShareCopied(false), 2000);
    };

    const priceHistory = [
        { label: 'Listed', value: vehicle.msrp && vehicle.msrp > vehicle.price ? vehicle.msrp : Math.round(vehicle.price * 1.04) },
        { label: 'Market', value: Math.round(vehicle.price * 1.02) },
        { label: 'Today', value: vehicle.price },
    ];
    const maxPrice = Math.max(...priceHistory.map((point) => point.value));

    return (
        <PublicLayout
            title={vehicle.name}
            description={`${vehicle.year} ${vehicle.name} with ${formatMileage(vehicle.mileage)} miles, ${vehicle.fuelType} powertrain, and premium Dealership purchase support.`}
            image={vehicle.galleries[0]?.url}
            structuredData={{
                '@context': 'https://schema.org',
                '@type': 'Vehicle',
                name: vehicle.name,
                brand: vehicle.brand,
                model: vehicle.model,
                vehicleModelDate: String(vehicle.year),
                mileageFromOdometer: `${vehicle.mileage} miles`,
                offers: {
                    '@type': 'Offer',
                    price: vehicle.price,
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                },
            }}
        >
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
                        <Button variant="ghost" size="icon" aria-label="Share" onClick={() => void shareVehicle()}>
                            {shareCopied ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Gallery + sticky sidebar — Tesla/Porsche layout */}
            <section className="py-8 md:py-12">
                <div className="container">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="space-y-10 lg:col-span-2">
                            <VehicleGallery images={vehicle.galleries ?? []} />

                            <motion.div
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                                transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
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

                            <VehicleVideoSection videos={vehicle.videos ?? []} />

                            {/* Features */}
                            {vehicle.features && vehicle.features.length > 0 && (
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

                            <VehicleSpecsPanel specifications={vehicle.specifications ?? []} sticky={false} />
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
                                    <div className="mt-5 rounded-xl border bg-primary/5 p-3 text-sm text-primary">
                                        <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4" /> Available now — reserve online or book a private viewing.</span>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <Dialog>
                                            <DialogTrigger asChild><Button className="w-full" size="lg">Reserve Vehicle</Button></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader><DialogTitle>Reserve {vehicle.name}</DialogTitle></DialogHeader>
                                                <form className="space-y-4" onSubmit={(event) => {
                                                    event.preventDefault();
                                                    reservationForm.post('/leads/public', {
                                                        onSuccess: () => {
                                                            reservationForm.reset();
                                                        },
                                                    });
                                                }}>
                                                    <input type="hidden" name="type" value="reservation" />
                                                    <input type="hidden" name="vehicle_id" value={vehicle.id} />
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="reserve-first-name">First Name</Label>
                                                        <Input
                                                            id="reserve-first-name"
                                                            value={reservationForm.data.first_name}
                                                            onChange={e => reservationForm.setData('first_name', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={reservationForm.errors.first_name} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="reserve-last-name">Last Name</Label>
                                                        <Input
                                                            id="reserve-last-name"
                                                            value={reservationForm.data.last_name}
                                                            onChange={e => reservationForm.setData('last_name', e.target.value)}
                                                        />
                                                        <InputError message={reservationForm.errors.last_name} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="reserve-email">Email</Label>
                                                        <Input
                                                            id="reserve-email"
                                                            type="email"
                                                            value={reservationForm.data.email}
                                                            onChange={e => reservationForm.setData('email', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={reservationForm.errors.email} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="reserve-phone">Phone</Label>
                                                        <Input
                                                            id="reserve-phone"
                                                            type="tel"
                                                            value={reservationForm.data.phone}
                                                            onChange={e => reservationForm.setData('phone', e.target.value)}
                                                        />
                                                        <InputError message={reservationForm.errors.phone} />
                                                    </div>
                                                    <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">A specialist will confirm availability and deposit details.</div>
                                                    <Button type="submit" className="w-full" disabled={reservationForm.processing}>
                                                        {reservationForm.processing ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            'Submit Reservation'
                                                        )}
                                                    </Button>
                                                    {reservationForm.recentlySuccessful && (
                                                        <p className="text-center text-sm text-green-600">Your reservation request has been submitted successfully.</p>
                                                    )}
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild><Button className="w-full" size="lg" variant="outline">Book Test Drive</Button></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader><DialogTitle>Book a private test drive</DialogTitle></DialogHeader>
                                                <form className="space-y-4" onSubmit={(event) => {
                                                    event.preventDefault();
                                                    testDriveForm.post('/leads/public', {
                                                        onSuccess: () => {
                                                            testDriveForm.reset();
                                                        },
                                                    });
                                                }}>
                                                    <input type="hidden" name="type" value="test-drive" />
                                                    <input type="hidden" name="vehicle_id" value={vehicle.id} />
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="drive-first-name">First Name</Label>
                                                        <Input
                                                            id="drive-first-name"
                                                            value={testDriveForm.data.first_name}
                                                            onChange={e => testDriveForm.setData('first_name', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={testDriveForm.errors.first_name} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="drive-last-name">Last Name</Label>
                                                        <Input
                                                            id="drive-last-name"
                                                            value={testDriveForm.data.last_name}
                                                            onChange={e => testDriveForm.setData('last_name', e.target.value)}
                                                        />
                                                        <InputError message={testDriveForm.errors.last_name} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="drive-email">Email</Label>
                                                        <Input
                                                            id="drive-email"
                                                            type="email"
                                                            value={testDriveForm.data.email}
                                                            onChange={e => testDriveForm.setData('email', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={testDriveForm.errors.email} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="drive-phone">Phone</Label>
                                                        <Input
                                                            id="drive-phone"
                                                            type="tel"
                                                            value={testDriveForm.data.phone}
                                                            onChange={e => testDriveForm.setData('phone', e.target.value)}
                                                        />
                                                        <InputError message={testDriveForm.errors.phone} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="drive-date">Preferred date</Label>
                                                        <Input
                                                            id="drive-date"
                                                            type="date"
                                                            value={testDriveForm.data.preferred_date}
                                                            onChange={e => testDriveForm.setData('preferred_date', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={testDriveForm.errors.preferred_date} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="drive-notes">Notes</Label>
                                                        <Textarea
                                                            id="drive-notes"
                                                            placeholder="Preferred time, questions, or trade-in details"
                                                            value={testDriveForm.data.notes}
                                                            onChange={e => testDriveForm.setData('notes', e.target.value)}
                                                        />
                                                        <InputError message={testDriveForm.errors.notes} />
                                                    </div>
                                                    <Button type="submit" className="w-full" disabled={testDriveForm.processing}>
                                                        {testDriveForm.processing ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            'Request Test Drive'
                                                        )}
                                                    </Button>
                                                    {testDriveForm.recentlySuccessful && (
                                                        <p className="text-center text-sm text-green-600">Your test drive request has been submitted successfully.</p>
                                                    )}
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        <Button className="w-full" size="lg" variant="outline" asChild>
                                            <Link href="/finance/calculator">Get Pre-Approved</Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-2"><TrendingDown className="size-5 text-primary" /><h3 className="font-semibold">Price history</h3></div>
                                    <div className="space-y-3">
                                        {priceHistory.map((point) => (
                                            <div key={point.label}>
                                                <div className="mb-1 flex justify-between text-sm"><span className="text-muted-foreground">{point.label}</span><span className="font-medium">{formatPrice(point.value)}</span></div>
                                                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${(point.value / maxPrice) * 100}%` }} /></div>
                                            </div>
                                        ))}
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
