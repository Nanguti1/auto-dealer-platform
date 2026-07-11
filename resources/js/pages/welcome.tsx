import { Head, Link } from '@inertiajs/react';
import {
  Car,
  Search,
  TrendingUp,
  Award,
  Shield,
  Clock,
  Fuel,
  Gauge,
  Users,
  Calendar,
  ArrowRight,
  Star
} from 'lucide-react';
import { H1, H2, P, H3 } from '@/components/design-system/typography';
import Footer from '@/components/navigation/footer';
import StickyNav from '@/components/navigation/sticky-nav';
import BlogCard from '@/components/shared/blog-card';
import BrandCard from '@/components/shared/brand-card';
import CTASection from '@/components/shared/cta-section';
import HeroSection from '@/components/shared/hero-section';
import StatisticCard from '@/components/shared/statistic-card';
import TestimonialCard from '@/components/shared/testimonial-card';
import VehicleCard from '@/components/shared/vehicle-card';
import PartnerCard from '@/components/shared/partner-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest/guest-layout';
import { useCurrency } from '@/hooks/use-currency';

interface WelcomeProps {
  featuredVehicles: Array<{
    id: number;
    slug: string;
    name: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType: string;
    image: string;
    condition: string;
    featured: boolean;
    stockNumber: string;
    vin: string;
    msrp: number | null;
    color: string;
    interiorColor: string;
  }>;
  latestArrivals: Array<{
    id: number;
    slug: string;
    name: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType: string;
    image: string;
    condition: string;
    featured: boolean;
    stockNumber: string;
    vin: string;
    msrp: number | null;
    color: string;
    interiorColor: string;
  }>;
  heroSliders: Array<{
    id: number;
    title: string;
    subtitle: string;
    image: string;
    ctaLabel: string;
    ctaUrl: string;
  }>;
  testimonials: Array<{
    id: number;
    name: string;
    role: string;
    rating: number;
    content: string;
    avatar: string;
  }>;
  latestBlogs: Array<{
    id: number;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    publishedAt: string;
    readTime: string;
    author: { name: string };
  }>;
}

export default function Welcome({ featuredVehicles, latestArrivals, heroSliders, testimonials, latestBlogs }: WelcomeProps) {
  const { getSymbol, getCurrencyCode } = useCurrency();
  const currencySymbol = getSymbol();
  const currencyCode = getCurrencyCode();

  // Only get currency symbol on client side to avoid build issues
  const displayCurrencySymbol = typeof window !== 'undefined' ? currencySymbol : '$';

  const brands = [
    { id: 1, name: 'Tesla', logo: '/images/brands/2025-Tesla-Model-Y-001-1080.jpg', vehicleCount: 45 },
    { id: 2, name: 'BMW', logo: '/images/brands/2025-BMW-M135-xDrive-005-1080.jpg', vehicleCount: 38 },
    { id: 3, name: 'Mercedes-Benz', logo: '/images/brands/2023-Mercedes-AMG-A45-S-005-1080.jpg', vehicleCount: 52 },
    { id: 4, name: 'Audi', logo: '/images/brands/2025-Audi-RS3-Sedan-005-1080.jpg', vehicleCount: 41 },
    { id: 5, name: 'Porsche', logo: '/images/brands/2025-Porsche-911-GT3-005-1080.jpg', vehicleCount: 23 },
    { id: 6, name: 'Land Rover', logo: '/images/brands/2025-Land-Rover-Defender-Octa-003-1080.jpg', vehicleCount: 31 },
  ];

  const bodyTypes = [
    { id: 1, name: 'SUV', icon: Car, count: 125 },
    { id: 2, name: 'Sedan', icon: Car, count: 98 },
    { id: 3, name: 'Truck', icon: Car, count: 67 },
    { id: 4, name: 'Coupe', icon: Car, count: 45 },
    { id: 5, name: 'Convertible', icon: Car, count: 32 },
    { id: 6, name: 'Electric', icon: Car, count: 28 },
  ];

  const partners = [
    { id: 1, name: 'Toyota Financial', logo: '/images/partners/Toyota_Financial_Services_Logo.jpg' },
    { id: 2, name: 'BMW Financial', logo: '/images/partners/BMW_Bank.png' },
    { id: 3, name: 'Mercedes-Benz Financial', logo: '/images/partners/Mercedes-benz.jpg' },
    { id: 4, name: 'Standard Bank', logo: '/images/partners/Standard-Bank-Logo-1024x538.jpg' },
    { id: 5, name: 'Chase Auto Finance', logo: '/images/partners/Toyota_Financial_Services_Logo.jpg' },
  ];

  const heroSlider = heroSliders?.[0] || {
    title: 'Find Your Dream Vehicle',
    subtitle: 'Browse our premium selection of quality vehicles',
    image: '/images/hero/2027-Mercedes-AMG-CLA45.jpg',
    ctaLabel: 'Browse Inventory',
    ctaUrl: '/inventory',
  };

  return (
    <GuestLayout title="Home" description="Shop premium vehicles with luxury browsing, search, finance, trade-in, import, and customer ownership tools.">
      <Head title="Home" />
      <StickyNav />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          title={heroSlider.title}
          subtitle={heroSlider.subtitle}
          image={heroSlider.image}
          ctaLabel={heroSlider.ctaLabel}
          ctaUrl={heroSlider.ctaUrl}
        />

        {/* Vehicle Search */}
        <section className="relative z-20 pt-12 pb-20 md:pt-16">
          <div className="container">
            <Card className="max-w-4xl mx-auto shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <H2 className="mb-6 text-center">Find Your Vehicle</H2>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">All Makes</option>
                      <option value="tesla">Tesla</option>
                      <option value="bmw">BMW</option>
                      <option value="mercedes">Mercedes-Benz</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">All Models</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price Range</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Any Price</option>
                      <option value="0-30000">Under {currencySymbol}30,000</option>
                      <option value="30000-50000">{currencySymbol}30,000 - {currencySymbol}50,000</option>
                      <option value="50000-75000">{currencySymbol}50,000 - {currencySymbol}75,000</option>
                      <option value="75000+">{currencySymbol}75,000+</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full" size="lg">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Inventory */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Featured</Badge>
              <H2 className="mb-4">Featured Vehicles</H2>
              <P className="max-w-2xl mx-auto">
                Hand-picked selection of our finest vehicles, carefully inspected and ready for you.
              </P>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/inventory">
                  View All Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Arrivals */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">New Arrivals</Badge>
              <H2 className="mb-4">Just Arrived</H2>
              <P className="max-w-2xl mx-auto">
                Be the first to see our latest additions to the inventory.
              </P>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArrivals.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/inventory?sort=newest">
                  View All Arrivals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Shop by Brand</H2>
              <P className="max-w-2xl mx-auto">
                Explore vehicles from your favorite manufacturers.
              </P>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </section>

        {/* Body Types */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Shop by Body Type</H2>
              <P className="max-w-2xl mx-auto">
                Find the perfect vehicle for your lifestyle.
              </P>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {bodyTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/inventory?type=${type.id}`}
                  className="group"
                >
                  <Card className="transition-all hover:shadow-lg hover:border-primary cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <type.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                      <H3 className="mb-1">{type.name}</H3>
                      <P className="text-sm text-muted-foreground">{type.count} vehicles</P>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services CTA */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-3">
              <CTASection
                title="Get Pre-Approved Today"
                description="Secure financing before you shop. Get pre-approved in minutes with our simple online application."
                buttonText="Apply for Financing"
                buttonLink="/finance"
                variant="finance"
              />
              <CTASection
                title="Trade-In Your Vehicle"
                description="Get the best value for your current vehicle. Use our online tool to get an instant estimate."
                buttonText="Get Trade-In Value"
                buttonLink="/trade-in"
                variant="trade-in"
              />
              <CTASection
                title="Import Your Dream Car"
                description="Can't find what you're looking for? We can help you import your dream vehicle from anywhere in the world."
                buttonText="Start Import Process"
                buttonLink="/import"
                variant="import"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Testimonials</Badge>
              <H2 className="mb-4">What Our Customers Say</H2>
              <P className="max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say.
              </P>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.length > 0 ? testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              )) : (
                <p className="col-span-3 text-center text-muted-foreground">No testimonials available at this time.</p>
              )}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/testimonials">
                  View All Testimonials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Blogs */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Blog</Badge>
              <H2 className="mb-4">Latest from Our Blog</H2>
              <P className="max-w-2xl mx-auto">
                Stay informed with the latest automotive news, tips, and insights.
              </P>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {latestBlogs.length > 0 ? latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              )) : (
                <p className="col-span-3 text-center text-muted-foreground">No blog posts available at this time.</p>
              )}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8">
              <StatisticCard
                icon={Car}
                value="500+"
                label="Vehicles in Stock"
                description="Quality inspected vehicles"
              />
              <StatisticCard
                icon={Users}
                value="10K+"
                label="Happy Customers"
                description="And counting"
              />
              <StatisticCard
                icon={Award}
                value="20+"
                label="Years Experience"
                description="Serving the community"
              />
              <StatisticCard
                icon={Star}
                value="4.9"
                label="Average Rating"
                description="Based on 500+ reviews"
              />
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <H2 className="mb-4">Our Trusted Partners</H2>
              <P className="max-w-2xl mx-auto">
                We work with leading financial institutions and manufacturers.
              </P>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {partners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <H2 className="mb-4">Stay Updated</H2>
                <P className="mb-6">
                  Subscribe to our newsletter for exclusive deals and updates.
                </P>
                <form className="flex gap-2">
                  <Input placeholder="Enter your email" className="flex-1" />
                  <Button>Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </GuestLayout>
  );
}
