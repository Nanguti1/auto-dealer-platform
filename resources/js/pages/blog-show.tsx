import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { H1, H2, Lead, P } from '@/components/design-system/typography';
import BlogCard from '@/components/shared/blog-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public/public-layout';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  category: string;
  publishedAt: string;
  author: { name: string };
  tags: string[];
}

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  author: { name: string };
}

interface BlogShowProps {
  post: BlogPost;
  relatedPosts: RelatedPost[];
}

export default function BlogShow({ post, relatedPosts }: BlogShowProps) {
    return (
        <PublicLayout title={post.title} description={post.excerpt}>
            <Head title={post.title} />
            <article>
                <section className="bg-gradient-to-b from-muted/60 to-background py-16 md:py-24">
                    <div className="container max-w-4xl">
                        <Button variant="ghost" asChild className="mb-6">
                            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to blog</Link>
                        </Button>
                        <Badge className="mb-4">{post.category}</Badge>
                        <H1 className="mb-6">{post.title}</H1>
                        <Lead>{post.excerpt}</Lead>
                        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.publishedAt}</span>
                            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container max-w-4xl space-y-8">
                        {post.image && (
                            <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-muted shadow-2xl shadow-primary/10">
                                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>
                </section>
            </article>

            {relatedPosts.length > 0 && (
                <section className="bg-muted/40 py-16">
                    <div className="container">
                        <H2 className="mb-8">Related articles</H2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.id} blog={{
                                    id: relatedPost.id,
                                    title: relatedPost.title,
                                    excerpt: relatedPost.excerpt,
                                    image: relatedPost.image,
                                    category: relatedPost.category,
                                    publishedAt: relatedPost.publishedAt,
                                    readTime: '5 min read',
                                    author: relatedPost.author,
                                }} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
