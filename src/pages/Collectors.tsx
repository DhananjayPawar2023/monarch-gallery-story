import { useCollectorsData } from "@/hooks/useCollectors";
import { SEO } from "@/components/SEO";
import { ArtistSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Globe, Instagram } from "lucide-react";

const Collectors = () => {
  const { data: collectors, isLoading } = useCollectorsData();

  return (
    <>
      <SEO
        title="Collectors Showcase"
        description="Meet the passionate collectors who bring Monarch's digital art collection to life. Discover their stories and collecting philosophy."
      />
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Header */}
        <section className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-3xl scroll-reveal">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Community
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              Collectors Showcase
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-[1.8]">
              Meet the passionate collectors who bring our digital art collection to life—each with their own unique vision and collecting philosophy.
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="container mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <ArtistSkeleton key={i} />
              ))}
            </div>
          </section>
        ) : (
          <section className="container mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {collectors?.map((collector, index) => (
                <div
                  key={collector.id}
                  className="group scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square bg-secondary mb-5 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
                    <img
                      src={collector.image_url}
                      alt={`${collector.name} - Collector`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-2">
                    {collector.name}
                  </h3>
                  {collector.location && (
                    <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                      {collector.location}
                    </p>
                  )}
                  {collector.collection_focus && (
                    <p className="text-sm text-accent mb-4">
                      Focus: {collector.collection_focus}
                    </p>
                  )}
                  <p className="text-foreground/80 leading-[1.7] mb-4">
                    {collector.bio}
                  </p>
                  <div className="flex gap-3">
                    {collector.website && (
                      <a
                        href={collector.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                        aria-label={`Visit ${collector.name}'s website`}
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {collector.instagram && (
                      <a
                        href={`https://instagram.com/${collector.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                        aria-label={`Follow ${collector.name} on Instagram`}
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!collectors || collectors.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No collectors to showcase yet. Check back soon!
                </p>
              </div>
            )}
          </section>
        )}

        {/* CTA */}
        <section className="container mx-auto px-6 pb-24">
          <div className="max-w-3xl mx-auto bg-secondary/40 border border-border p-10 md:p-14 rounded-lg text-center scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Join Our Collecting Community
            </h2>
            <p className="text-foreground/80 mb-8 leading-[1.8]">
              Interested in building your own collection? Explore our curated artworks and start your journey with Monarch.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Collectors;
