import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface VehicleInquiryFormProps {
    vehicleId?: number;
    vehicleName?: string;
    className?: string;
}

export default function VehicleInquiryForm({
    vehicleId,
    vehicleName,
    className,
}: VehicleInquiryFormProps) {
    const form = useForm({
        type: 'inquiry',
        vehicle_id: vehicleId,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/leads/public', {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>{vehicleName ? `Inquire About ${vehicleName}` : 'Vehicle Inquiry'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="type" value="inquiry" />
                    {vehicleId && <input type="hidden" name="vehicle_id" value={vehicleId} />}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="inquiry-first-name">First Name</Label>
                            <Input
                                id="inquiry-first-name"
                                value={form.data.first_name}
                                onChange={e => form.setData('first_name', e.target.value)}
                                required
                                placeholder="John"
                            />
                            <InputError message={form.errors.first_name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inquiry-last-name">Last Name</Label>
                            <Input
                                id="inquiry-last-name"
                                value={form.data.last_name}
                                onChange={e => form.setData('last_name', e.target.value)}
                                placeholder="Smith"
                            />
                            <InputError message={form.errors.last_name} />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="inquiry-email">Email</Label>
                            <Input
                                id="inquiry-email"
                                type="email"
                                value={form.data.email}
                                onChange={e => form.setData('email', e.target.value)}
                                required
                                placeholder="john@example.com"
                            />
                            <InputError message={form.errors.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inquiry-phone">Phone</Label>
                            <Input
                                id="inquiry-phone"
                                type="tel"
                                value={form.data.phone}
                                onChange={e => form.setData('phone', e.target.value)}
                                placeholder="(555) 123-4567"
                            />
                            <InputError message={form.errors.phone} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="inquiry-message">Message</Label>
                        <textarea
                            id="inquiry-message"
                            value={form.data.message}
                            onChange={e => form.setData('message', e.target.value)}
                            required
                            rows={4}
                            placeholder="I'm interested in this vehicle. Please contact me with more details."
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        <InputError message={form.errors.message} />
                    </div>

                    <Button type="submit" className="w-full" disabled={form.processing}>
                        {form.processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Send Inquiry'
                        )}
                    </Button>

                    {form.recentlySuccessful && (
                        <p className="text-center text-sm text-green-600">Your inquiry has been sent successfully.</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
