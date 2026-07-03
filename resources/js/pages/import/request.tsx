import { Head, Form } from '@inertiajs/react';
import { H1, P } from '@/components/design-system/typography';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public/public-layout';

export default function ImportRequestPage() {
    return (
        <PublicLayout title="Import Request" description="Request concierge import support for rare, luxury, performance, or specialty vehicles from global markets.">
            <Head title="Import Your Dream Car" />

            <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
                <div className="container max-w-3xl text-center">
                    <Badge className="mb-3">Import</Badge>
                    <H1 className="mb-4">Import Your Dream Car</H1>
                    <P>Can't find what you're looking for? We can help you import your dream vehicle from anywhere in the world.</P>
                </div>
            </section>

            <section className="py-14">
                <div className="container max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Import Request Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form action="/import" method="post" className="space-y-4">
                                {({ errors, processing, wasSuccessful }) => (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle_description">Desired Vehicle</Label>
                                            <Input
                                                id="vehicle_description"
                                                name="vehicle_description"
                                                required
                                                placeholder="e.g. 2023 Porsche 911 GT3"
                                            />
                                            <InputError message={errors.vehicle_description} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="origin_country">Origin Country</Label>
                                            <Input id="origin_country" name="origin_country" required placeholder="Germany" />
                                            <InputError message={errors.origin_country} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="budget">Budget (USD)</Label>
                                            <Input id="budget" name="budget" type="number" placeholder="150000" />
                                            <InputError message={errors.budget} />
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Your Name</Label>
                                                <Input id="name" name="name" required />
                                                <InputError message={errors.name} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" name="email" type="email" required />
                                                <InputError message={errors.email} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Additional Notes</Label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                rows={4}
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                placeholder="Color preferences, trim level, timeline..."
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" size="lg" disabled={processing}>
                                            {processing ? 'Submitting...' : 'Start Import Process'}
                                        </Button>
                                        {wasSuccessful && (
                                            <p className="text-center text-sm text-green-600">
                                                Your import request has been received. Our team will be in touch.
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
