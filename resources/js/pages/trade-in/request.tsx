import PublicLayout from '@/layouts/public/public-layout';
import { Head, Form } from '@inertiajs/react';
import { H1, P } from '@/components/design-system/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';

export default function TradeInRequestPage() {
    return (
        <PublicLayout title="Trade-In Request" description="Start a trade-in valuation for your current vehicle and connect it to your next premium purchase.">
            <Head title="Trade-In Your Vehicle" />

            <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
                <div className="container max-w-3xl text-center">
                    <Badge className="mb-3">Trade-In</Badge>
                    <H1 className="mb-4">Trade-In Your Vehicle</H1>
                    <P>Get an instant estimate for your current vehicle and apply it toward your next purchase.</P>
                </div>
            </section>

            <section className="py-14">
                <div className="container max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form action="/trade-in" method="post" className="space-y-4">
                                {({ errors, processing, wasSuccessful }) => (
                                    <>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="make">Make</Label>
                                                <Input id="make" name="make" required placeholder="Toyota" />
                                                <InputError message={errors.make} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="model">Model</Label>
                                                <Input id="model" name="model" required placeholder="Camry" />
                                                <InputError message={errors.model} />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="year">Year</Label>
                                                <Input id="year" name="year" type="number" required placeholder="2020" />
                                                <InputError message={errors.year} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="mileage">Mileage</Label>
                                                <Input id="mileage" name="mileage" type="number" placeholder="45000" />
                                                <InputError message={errors.mileage} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vin">VIN (optional)</Label>
                                            <Input id="vin" name="vin" placeholder="1HGBH41JXMN109186" />
                                            <InputError message={errors.vin} />
                                        </div>
                                        <Button type="submit" className="w-full" size="lg" disabled={processing}>
                                            {processing ? 'Submitting...' : 'Get Trade-In Estimate'}
                                        </Button>
                                        {wasSuccessful && (
                                            <p className="text-center text-sm text-green-600">
                                                Your trade-in request has been submitted. We will contact you shortly.
                                            </p>
                                        )}
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </PublicLayout>
    );
}
