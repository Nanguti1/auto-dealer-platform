import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest/guest-layout';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';
import { H1, H2, P } from '@/components/design-system/typography';
import TestimonialCard from '@/components/shared/testimonial-card';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'First-time Buyer',
      rating: 5,
      content: 'Amazing experience! The team made my first car purchase stress-free. They were patient, knowledgeable, and helped me find the perfect car within my budget.',
      avatar: '',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      rating: 5,
      content: 'I\'ve purchased multiple vehicles for my business here. The service is consistently excellent, and the finance team always gets us great rates.',
      avatar: '',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Family of Four',
      rating: 5,
      content: 'We needed a reliable family SUV, and they delivered. The staff listened to our needs and recommended the perfect vehicle. The whole family loves it!',
      avatar: '',
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Repeat Customer',
      rating: 5,
      content: 'This is my third purchase from Dealership. I keep coming back because of their honesty and fair pricing. No pressure, just great service.',
      avatar: '',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Luxury Buyer',
      rating: 5,
      content: 'Found my dream luxury car here. The selection was impressive, and the staff really knew their stuff. The buying process was smooth from start to finish.',
      avatar: '',
    },
    {
      id: 6,
      name: 'Robert Martinez',
      role: 'Trade-in Customer',
      rating: 5,
      content: 'Got a great trade-in value for my old truck and found an even better replacement. The appraisal was fair and the process was quick.',
      avatar: '',
    },
  ];

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
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
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
