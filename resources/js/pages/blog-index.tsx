import { Head } from '@inertiajs/react';
import { H1, H2, Lead } from '@/components/design-system/typography';
import BlogCard from '@/components/shared/blog-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PublicLayout from '@/layouts/public/public-layout';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: { name: string };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogIndexProps {
  posts: BlogPost[];
  categories: Category[];
  currentCategory: string | null;
}

export default function BlogIndex({ posts, categories, currentCategory }: BlogIndexProps) {
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
                                    <a
                                        key={category.id}
                                        href={`/blog?category=${encodeURIComponent(category.slug)}`}
                                        className={`rounded-full border px-4 py-2 text-sm transition-colors hover:bg-muted ${
                                            currentCategory === category.slug ? 'bg-primary text-primary-foreground' : ''
                                        }`}
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.length > 0 ? posts.map((post) => (
                            <BlogCard key={post.id} blog={post} />
                        )) : (
                            <p className="col-span-full text-center text-muted-foreground">No blog posts available at this time.</p>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
