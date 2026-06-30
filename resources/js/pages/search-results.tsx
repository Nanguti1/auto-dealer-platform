import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/public-layout';
import VehicleCard from '@/components/shared/vehicle-card';
import BlogCard from '@/components/shared/blog-card';
import { EmptyState } from '@/components/design-system/empty-state';
import { H1, H2, Lead } from '@/components/design-system/typography';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockVehicles, toSummary } from '@/data/mock-vehicles';
import { Search } from 'lucide-react';

const articles = [
    {
        id: 'top-electric-vehicles-2024',
        title: 'Top Electric Vehicles Defining Premium Mobility',
        excerpt: 'A curated look at silent performance, long-range battery platforms, and luxury interiors shaping the next generation of EVs.',
        image: 'https://picsum.photos/seed/blog-ev/1200/800',
        category: 'Electric Vehicles',
        publishedAt: '2024-01-15',
        readTime: '5 min read',
        author: { name: 'Avery Stone' },
    },
];

export default function SearchResults() {
    const vehicles = mockVehicles.map(toSummary).slice(0, 3);

    return (
        <PublicLayout title="Search Results" description="Search Dealership inventory, articles, services, and ownership tools from one premium discovery experience.">
            <Head title="Search Results" />
            <section className="bg-gradient-to-b from-muted/60 to-background py-16 md:py-24">
                <div className="container max-w-4xl text-center">
                    <Badge className="mb-4">Search</Badge>
                    <H1 className="mb-6">Find vehicles, services, and insights</H1>
                    <Lead className="mb-8">Search across inventory, editorial content, and customer resources.</Lead>
                    <form className="mx-auto flex max-w-2xl gap-3" action="/search">
                        <Input name="q" aria-label="Search site" placeholder="Search by model, feature, article, or service" className="h-12" />
                        <Button type="submit" size="lg"><Search className="mr-2 h-4 w-4" /> Search</Button>
                    </form>
                </div>
            </section>

            <section className="py-12">
                <div className="container space-y-12">
                    <div>
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <H2>Inventory matches</H2>
                            <Button variant="outline" asChild><Link href="/inventory">View inventory</Link></Button>
                        </div>
                        {vehicles.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {vehicles.map((vehicle) => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState title="No vehicle matches" description="Try adjusting your search terms or browse all inventory." icon={Search} />
                        )}
                    </div>

                    <div>
                        <H2 className="mb-6">Article matches</H2>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {articles.map((article) => (
                                <BlogCard key={article.id} blog={article} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
