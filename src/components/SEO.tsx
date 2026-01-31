import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  type?: "website" | "article" | "profile" | "product";
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  structuredData?: object;
  noIndex?: boolean;
}

export function SEO({ 
  title = "Monarch - Curated Digital Art Gallery",
  description = "Discover exceptional limited-edition digital artworks. Monarch bridges artists and collectors through thoughtfully curated exhibitions.",
  image = "/og-image.jpg",
  article = false,
  type = "website",
  keywords = ["digital art", "art gallery", "contemporary art", "curated exhibitions", "art collectors"],
  author,
  publishedTime,
  modifiedTime,
  section,
  structuredData,
  noIndex = false,
}: SEOProps) {
  const siteTitle = title.includes("Monarch") ? title : `${title} | Monarch`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Monarch Gallery",
    description: "Curated digital art gallery bridging artists and collectors through thoughtfully curated exhibitions.",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    sameAs: [],
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Monarch Gallery",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/collections?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      {author && <meta name="author" content={author} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#111111" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Monarch Gallery" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}
      {article && section && (
        <meta property="article:section" content={section} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
    </Helmet>
  );
}

// Helper function to generate artwork structured data
export function generateArtworkStructuredData(artwork: {
  title: string;
  description?: string;
  image_url: string;
  artist_name?: string;
  created_at?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    description: artwork.description,
    image: artwork.image_url,
    creator: artwork.artist_name ? {
      "@type": "Person",
      name: artwork.artist_name,
    } : undefined,
    dateCreated: artwork.created_at,
  };
}

// Helper function to generate artist structured data
export function generateArtistStructuredData(artist: {
  name: string;
  short_bio?: string;
  image_url?: string;
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artist.short_bio,
    image: artist.image_url,
    address: artist.location ? {
      "@type": "PostalAddress",
      addressLocality: artist.location,
    } : undefined,
    jobTitle: "Artist",
  };
}

// Helper function to generate article structured data
export function generateArticleStructuredData(article: {
  title: string;
  excerpt?: string;
  cover_image?: string;
  author?: string;
  published_at?: string;
  updated_at?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image,
    author: article.author ? {
      "@type": "Person",
      name: article.author,
    } : undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    publisher: {
      "@type": "Organization",
      name: "Monarch Gallery",
    },
  };
}

// Helper function to generate collection/exhibition structured data
export function generateExhibitionStructuredData(exhibition: {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: exhibition.name,
    description: exhibition.description,
    startDate: exhibition.start_date,
    endDate: exhibition.end_date,
    image: exhibition.image,
    organizer: {
      "@type": "Organization",
      name: "Monarch Gallery",
    },
  };
}
