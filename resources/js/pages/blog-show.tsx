import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/public-layout';
import BlogCard from '@/components/shared/blog-card';
import { H1, H2, Lead, P } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const relatedPosts = [
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

export default function BlogShow() {
    return (
        <PublicLayout title="Automotive Insight" description="Read an expert automotive insight on premium mobility, ownership strategy, buying considerations, and market trends.">
            <Head title="Automotive Insight" />
            <article>
                <section className="bg-gradient-to-b from-muted/60 to-background py-16 md:py-24">
                    <div className="container max-w-4xl">
                        <Button variant="ghost" asChild className="mb-6">
                            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to blog</Link>
                        </Button>
                        <Badge className="mb-4">Electric Vehicles</Badge>
                        <H1 className="mb-6">Top Electric Vehicles Defining Premium Mobility</H1>
                        <Lead>
                            A curated look at silent performance, long-range battery platforms, immersive cabins, and software-defined ownership experiences.
                        </Lead>
                        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Jan 15, 2024</span>
                            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container max-w-4xl space-y-8">
                        <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-muted shadow-2xl shadow-primary/10">
                            <img src="https://picsum.photos/seed/blog-ev/1600/900" alt="Premium electric vehicle on a cinematic road" className="h-full w-full object-cover" />
                        </div>
                        <P>
                            Premium electric vehicles are no longer defined by range alone. The best examples combine instant torque, quiet cabins, connected software, rapid charging confidence, and sustainable materials into a cohesive ownership experience.
                        </P>
                        <P>
                            Buyers should evaluate battery warranty, charging access, driver-assistance maturity, service availability, and cabin ergonomics alongside headline performance numbers.
                        </P>
                        <H2>What to compare</H2>
                        <ul className="grid gap-3 text-muted-foreground md:grid-cols-2">
                            <li className="rounded-2xl border bg-card p-4">Real-world range and charging curve</li>
                            <li className="rounded-2xl border bg-card p-4">Interior materials and noise isolation</li>
                            <li className="rounded-2xl border bg-card p-4">Driver assistance and safety systems</li>
                            <li className="rounded-2xl border bg-card p-4">Residual value and ownership costs</li>
                        </ul>
                    </div>
                </section>
            </article>

            <section className="bg-muted/40 py-16">
                <div className="container">
                    <H2 className="mb-8">Related articles</H2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {relatedPosts.map((post) => (
                            <BlogCard key={post.id} blog={post} />
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
