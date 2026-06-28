import PublicLayout from '@/layouts/public/public-layout';
import { Head, Form } from '@inertiajs/react';
import { H1, P } from '@/components/design-system/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function DealerContactPage() {
    return (
        <PublicLayout title="Contact Dealer">
            <Head title="Contact Dealer" />

            <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
                <div className="container max-w-3xl text-center">
                    <Badge className="mb-3">Contact</Badge>
                    <H1 className="mb-4">Contact Our Team</H1>
                    <P>Speak with our specialists about inventory, financing, trade-ins, or imports.</P>
                </div>
            </section>

            <section className="py-14">
                <div className="container">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Form action="/contact" method="post" className="space-y-4">
                                    {({ errors, processing, wasSuccessful }) => (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" name="name" required />
                                                <InputError message={errors.name} />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" name="email" type="email" required />
                                                    <InputError message={errors.email} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input id="phone" name="phone" type="tel" />
                                                    <InputError message={errors.phone} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Input id="subject" name="subject" required placeholder="General inquiry" />
                                                <InputError message={errors.subject} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message</Label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={5}
                                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                />
                                                <InputError message={errors.message} />
                                            </div>
                                            <Button type="submit" className="w-full" disabled={processing}>
                                                {processing ? 'Sending...' : 'Send Message'}
                                            </Button>
                                            {wasSuccessful && (
                                                <p className="text-sm text-green-600">Message sent successfully.</p>
                                            )}
                                        </>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            {[
                                { icon: Phone, title: 'Phone', lines: ['(555) 123-4567', 'Mon–Sat 9am–7pm'] },
                                { icon: Mail, title: 'Email', lines: ['info@dealership.com', 'sales@dealership.com'] },
                                { icon: MapPin, title: 'Location', lines: ['123 Dealership Drive', 'City, State 12345'] },
                                { icon: Clock, title: 'Hours', lines: ['Mon–Fri: 9am–8pm', 'Sat: 9am–6pm', 'Sun: 11am–5pm'] },
                            ].map(({ icon: Icon, title, lines }) => (
                                <div key={title} className="flex gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{title}</p>
                                        {lines.map((line) => (
                                            <p key={line} className="text-sm text-muted-foreground">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
