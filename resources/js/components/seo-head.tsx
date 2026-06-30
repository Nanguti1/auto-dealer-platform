import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  canonical?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const appName = 'Dealership';
const defaultImage = '/images/og-default.jpg';

function absoluteUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }

  if (typeof window === 'undefined') {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}

function fallbackDescription(title?: string): string {
  if (!title) {
    return 'Shop premium new and pre-owned vehicles with transparent finance, trade-in, import, and ownership tools.';
  }

  return `Explore ${title.toLowerCase()} at ${appName}, with premium inventory tools, transparent next steps, and a concierge automotive experience.`;
}

export default function SeoHead({
  title,
  description,
  image = defaultImage,
  type = 'website',
  canonical,
  structuredData,
}: SeoHeadProps) {
  const page = usePage();
  const metaTitle = title ? `${title} | ${appName}` : appName;
  const metaDescription = description ?? fallbackDescription(title);
  const canonicalUrl = canonical ?? (typeof window !== 'undefined' ? new URL(page.url, window.location.origin).toString() : page.url);
  const imageUrl = absoluteUrl(image);
  const jsonLd = structuredData ? JSON.stringify(structuredData) : null;

  return (
    <Head title={title}>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={appName} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && <script type="application/ld+json">{jsonLd}</script>}
    </Head>
  );
}
