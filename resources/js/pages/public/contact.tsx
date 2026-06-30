import { Head } from '@inertiajs/react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { H1, H2, P } from '@/components/design-system/typography';
import Footer from '@/components/navigation/footer';
import StickyNav from '@/components/navigation/sticky-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest/guest-layout';

export default function Contact() {
  return (
    <GuestLayout title="Contact Us" description="Contact Dealership for vehicle questions, appointments, finance support, trade-ins, and concierge automotive help.">
      <Head title="Contact Us" />
      <StickyNav />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <H1 className="mb-6">Get in Touch</H1>
              <P className="mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </P>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        rows={5}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your message..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <H2 className="mb-6">Contact Information</H2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <H3 className="mb-1">Address</H3>
                        <P className="text-muted-foreground">
                          123 Dealership Drive<br />
                          City, State 12345
                        </P>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <H3 className="mb-1">Phone</H3>
                        <P className="text-muted-foreground">
                          (555) 123-4567
                        </P>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <H3 className="mb-1">Email</H3>
                        <P className="text-muted-foreground">
                          info@dealership.com
                        </P>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <H3 className="mb-1">Business Hours</H3>
                        <P className="text-muted-foreground">
                          Monday - Friday: 9AM - 7PM<br />
                          Saturday: 10AM - 5PM<br />
                          Sunday: Closed
                        </P>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Map integration</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </GuestLayout>
  );
}
