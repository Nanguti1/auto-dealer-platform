import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest/guest-layout';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';
import { H1, H2, P, H3 } from '@/components/design-system/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Car, DollarSign, Bell } from 'lucide-react';

export default function Newsletter() {
  return (
    <GuestLayout title="Newsletter" description="Subscribe to Dealership updates for premium inventory alerts, market insights, finance tips, and ownership news.">
      <Head title="Newsletter" />
      <StickyNav />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <H1 className="mb-6">Stay in the Loop</H1>
              <P className="mb-8">
                Subscribe to our newsletter for exclusive deals, new arrivals, and automotive tips delivered straight to your inbox.
              </P>
            </div>
          </div>
        </section>

        {/* Newsletter Form */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <H2 className="mb-6 text-center">Subscribe to Our Newsletter</H2>
                  <form className="space-y-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">What would you like to receive?</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox id="deals" />
                          <Label htmlFor="deals" className="cursor-pointer">
                            Exclusive deals and promotions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox id="arrivals" />
                          <Label htmlFor="arrivals" className="cursor-pointer">
                            New vehicle arrivals
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox id="tips" />
                          <Label htmlFor="tips" className="cursor-pointer">
                            Automotive tips and advice
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox id="events" />
                          <Label htmlFor="events" className="cursor-pointer">
                            Events and special offers
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox id="consent" required />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to receive marketing communications and understand I can unsubscribe at any time.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full">
                      Subscribe Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Why Subscribe?</H2>
              <P className="max-w-2xl mx-auto">
                Get exclusive access to benefits that only our subscribers receive.
              </P>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="mb-2">First Access</H3>
                  <P className="text-sm text-muted-foreground">
                    Be the first to know about new arrivals and exclusive inventory before it hits the lot.
                  </P>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="mb-2">Exclusive Deals</H3>
                  <P className="text-sm text-muted-foreground">
                    Receive subscriber-only promotions and discounts on vehicles and services.
                  </P>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="mb-2">Expert Tips</H3>
                  <P className="text-sm text-muted-foreground">
                    Get valuable automotive advice, maintenance tips, and industry insights.
                  </P>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Note */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <P className="text-sm text-muted-foreground">
                We respect your privacy. Your email address will never be shared with third parties. 
                You can unsubscribe at any time by clicking the unsubscribe link in our emails or by contacting us at privacy@dealership.com.
              </P>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </GuestLayout>
  );
}
