import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/public-layout';
import BlogCard from '@/components/shared/blog-card';
import { H1, H2, Lead } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const posts = [
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
    {
        id: 'luxury-financing-guide',
        title: 'How to Structure Financing for a Luxury Vehicle',
        excerpt: 'Compare payment strategies, down-payment scenarios, and ownership costs before reserving your next premium vehicle.',
        image: 'https://picsum.photos/seed/blog-finance/1200/800',
        category: 'Finance',
        publishedAt: '2024-01-10',
        readTime: '7 min read',
        author: { name: 'Maya Chen' },
    },
    {
        id: 'performance-suv-buying-guide',
        title: 'Performance SUV Buying Guide',
        excerpt: 'What to evaluate when comparing high-output family SUVs, from adaptive suspension to connected driver assistance.',
        image: 'https://picsum.photos/seed/blog-suv/1200/800',
        category: 'Buying Guides',
        publishedAt: '2024-01-05',
        readTime: '6 min read',
        author: { name: 'Julian Reyes' },
    },
];

const categories = ['Electric Vehicles', 'Buying Guides', 'Finance', 'Ownership', 'Technology'];

export default function BlogIndex() {
    return (
        <PublicLayout title="Blog" description="Read premium automotive guides, finance insights, EV trends, maintenance tips, and buying advice from Dealership.">
            <Head title="Blog" />
            <section className="bg-gradient-to-b from-muted/60 to-background py-20 md:py-28">
                <div className="container text-center">
                    <Badge className="mb-4">Insights</Badge>
                    <H1 className="mb-6">Luxury automotive intelligence</H1>
                    <Lead className="mx-auto max-w-3xl">
                        Explore buying guides, financing strategies, technology explainers, and premium ownership advice from our automotive specialists.
                    </Lead>
                </div>
            </section>

            <section className="py-12">
                <div className="container grid gap-8 lg:grid-cols-[280px_1fr]">
                    <aside className="space-y-6 rounded-3xl border bg-card/80 p-6 shadow-sm backdrop-blur">
                        <div>
                            <H2 className="mb-3 text-2xl">Search</H2>
                            <form action="/search" className="flex gap-2">
                                <Input name="q" placeholder="Search articles" aria-label="Search articles" />
                                <Button type="submit">Go</Button>
                            </form>
                        </div>
                        <div>
                            <H2 className="mb-3 text-2xl">Categories</H2>
                            <div className="flex flex-wrap gap-2 lg:flex-col">
                                {categories.map((category) => (
                                    <a key={category} href={`/blog?category=${encodeURIComponent(category)}`} className="rounded-full border px-4 py-2 text-sm transition-colors hover:bg-muted">
                                        {category}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard key={post.id} blog={post} />
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
