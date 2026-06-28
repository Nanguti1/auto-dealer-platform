import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest/guest-layout';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';
import { H1, H2, P, Lead, H3 } from '@/components/design-system/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Shield, Clock, Zap, Heart } from 'lucide-react';

export default function About() {
  return (
    <GuestLayout>
      <Head title="About Us" />
      <StickyNav />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">About Us</Badge>
              <H1 className="mb-6">Your Trusted Automotive Partner</H1>
              <Lead className="mb-8">
                For over 20 years, we've been helping families find their perfect vehicles with honesty, integrity, and exceptional service.
              </Lead>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <H2 className="mb-6">Our Story</H2>
                <P className="mb-4">
                  Founded in 2004, Dealership began with a simple mission: to provide a better car buying experience. What started as a small lot with a handful of vehicles has grown into one of the region's most trusted automotive destinations.
                </P>
                <P className="mb-4">
                  Our founder, John Smith, believed that buying a car should be exciting, not stressful. He built our company on the principles of transparency, fair pricing, and putting customers first. These values continue to guide everything we do today.
                </P>
                <P>
                  Over the years, we've expanded our inventory, upgraded our facilities, and grown our team, but our commitment to exceptional service has never wavered. We're proud to have helped thousands of families find vehicles they love.
                </P>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span className="text-lg">Our dealership location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Our Values</H2>
              <P className="max-w-2xl mx-auto">
                The principles that guide every decision we make and every interaction we have.
              </P>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="mb-2">Integrity</H3>
                  <P className="text-sm text-muted-foreground">
                    We believe in honest pricing, transparent processes, and doing what's right for our customers.
                  </P>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="mb-2">Customer First</H3>
                  <P className="text-sm text-muted-foreground">
                    Your satisfaction is our top priority. We go above and beyond to ensure you drive away happy.
                  </P>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="mb-2">Excellence</H3>
                  <P className="text-sm text-muted-foreground">
                    From our vehicle selection to our service department, we strive for excellence in everything we do.
                  </P>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Why Choose Us</H2>
              <P className="max-w-2xl mx-auto">
                Experience the difference that sets us apart from other dealerships.
              </P>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <H3 className="mb-2">Quick & Easy Process</H3>
                  <P className="text-sm text-muted-foreground">
                    Our streamlined process gets you on the road faster without the hassle.
                  </P>
                </div>
              </div>

              <div className="flex gap-4">
                <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <H3 className="mb-2">Competitive Pricing</H3>
                  <P className="text-sm text-muted-foreground">
                    We offer fair market prices and regularly review our pricing to stay competitive.
                  </P>
                </div>
              </div>

              <div className="flex gap-4">
                <Heart className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <H3 className="mb-2">Quality Vehicles</H3>
                  <P className="text-sm text-muted-foreground">
                    Every vehicle undergoes a rigorous inspection before hitting our lot.
                  </P>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <H3 className="mb-2">Expert Team</H3>
                  <P className="text-sm text-muted-foreground">
                    Our knowledgeable staff is here to help you make the right decision.
                  </P>
                </div>
              </div>

              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <H3 className="mb-2">Flexible Financing</H3>
                  <P className="text-sm text-muted-foreground">
                    Multiple financing options to fit your budget and credit situation.
                  </P>
                </div>
              </div>

              <div className="flex gap-4">
                <Award className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <H3 className="mb-2">After-Sale Support</H3>
                  <P className="text-sm text-muted-foreground">
                    Our relationship doesn't end at the sale. We're here for the long haul.
                  </P>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                <P className="text-muted-foreground">Years in Business</P>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                <P className="text-muted-foreground">Vehicles Sold</P>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <P className="text-muted-foreground">Customer Satisfaction</P>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <P className="text-muted-foreground">Team Members</P>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </GuestLayout>
  );
}
