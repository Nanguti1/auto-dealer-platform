import { Head } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { H1, H2, P } from '@/components/design-system/typography';
import Footer from '@/components/navigation/footer';
import StickyNav from '@/components/navigation/sticky-nav';
import TestimonialCard from '@/components/shared/testimonial-card';
import GuestLayout from '@/layouts/guest/guest-layout';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {

  return (
    <GuestLayout title="Testimonials" description="Read customer stories from drivers who found premium vehicles and concierge support through Dealership.">
      <Head title="Testimonials" />
      <StickyNav />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <H1 className="mb-6">What Our Customers Say</H1>
              <P className="mb-8">
                Don't just take our word for it. Here's what our customers have to say about their experience with us.
              </P>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <P className="text-lg font-semibold">4.9 out of 5 stars based on 500+ reviews</P>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.length > 0 ? testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              )) : (
                <p className="col-span-3 text-center text-muted-foreground">No testimonials available at this time.</p>
              )}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Trusted by Thousands</H2>
              <P className="max-w-2xl mx-auto">
                Our commitment to excellence has earned us the trust of customers throughout the region.
              </P>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <P className="text-muted-foreground">Customer Satisfaction</P>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <P className="text-muted-foreground">Happy Customers</P>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9</div>
                <P className="text-muted-foreground">Average Rating</P>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <P className="text-muted-foreground">Years of Service</P>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </GuestLayout>
  );
}
