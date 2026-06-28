import * as React from 'react';
import { Form } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface VehicleInquiryFormProps {
    vehicleId?: number;
    vehicleName?: string;
    action?: string;
    className?: string;
}

export default function VehicleInquiryForm({
    vehicleId,
    vehicleName,
    action = '/inquiries',
    className,
}: VehicleInquiryFormProps) {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>{vehicleName ? `Inquire About ${vehicleName}` : 'Vehicle Inquiry'}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form action={action} method="post" className="space-y-4">
                    {({ errors, processing, wasSuccessful }) => (
                        <>
                            {vehicleId && <input type="hidden" name="vehicle_id" value={vehicleId} />}

                            <div className="space-y-2">
                                <Label htmlFor="inquiry-name">Full Name</Label>
                                <Input id="inquiry-name" name="name" required placeholder="John Smith" />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="inquiry-email">Email</Label>
                                    <Input id="inquiry-email" name="email" type="email" required placeholder="john@example.com" />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="inquiry-phone">Phone</Label>
                                    <Input id="inquiry-phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="inquiry-message">Message</Label>
                                <textarea
                                    id="inquiry-message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="I'm interested in this vehicle. Please contact me with more details."
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                <InputError message={errors.message} />
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? 'Sending...' : 'Send Inquiry'}
                            </Button>

                            {wasSuccessful && (
                                <p className="text-center text-sm text-green-600">Your inquiry has been sent successfully.</p>
                            )}
                        </>
                    )}
                </Form>
            </CardContent>
        </Card>
    );
}
