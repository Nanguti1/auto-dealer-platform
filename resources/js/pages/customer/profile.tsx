import { Head, Link } from '@inertiajs/react';
import { Form, usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { H2 } from '@/components/design-system/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CustomerProfilePage() {
    const { auth } = usePage().props as {
        auth?: { user?: { name?: string; email?: string } };
    };

    return (
        <DashboardLayout title="Profile" user={auth?.user}>
            <Head title="Customer Profile" />

            <H2 className="mb-6">My Profile</H2>

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form action="/settings/profile" method="patch" className="space-y-4">
                        {({ errors, processing, wasSuccessful }) => (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" defaultValue={auth?.user?.name ?? ''} required />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" defaultValue={auth?.user?.email ?? ''} required />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/settings/security">Change Password</Link>
                                    </Button>
                                </div>
                                {wasSuccessful && (
                                    <p className="text-sm text-green-600">Profile updated successfully.</p>
                                )}
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
