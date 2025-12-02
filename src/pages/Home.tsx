import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import { useCollections } from "@/hooks/useCollections";
import { useArtworks } from "@/hooks/useArtworks";
import { useArtists } from "@/hooks/useArtists";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RecommendedArtworks } from "@/components/RecommendedArtworks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const { data: collections } = useCollections();
  const { data: artworks } = useArtworks();
  const { data: artists } = useArtists();

  const currentCollection = collections?.[0];
  const featuredArtworks = artworks?.filter((art) => art.featured).slice(0, 3) || [];
  const spotlightArtist = artists?.[0];

  return (
    <>
      <SEO />
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative h-screen flex items-center justify-center overflow-hidden gradient-bg gradient-bg-animated" 
          aria-label="Hero banner"
        >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-8 md:mb-10 leading-[1.05] tracking-tight">
            <span className="block animate-fade-in-up">Where Art</span>
            <span className="block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>Meets Story</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 md:mb-14 animate-fade-in-up max-w-3xl mx-auto leading-[1.7] font-light" style={{ animationDelay: "0.4s" }}>
            Monarch bridges digital artistry and human emotion—curating works that transcend pixels and speak to something deeper
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up w-full max-w-md mx-auto sm:max-w-none mb-20" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/collections">View Collection</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/artists">Meet the Artists</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center gap-3 animate-fade-in-up animate-scroll-bounce" style={{ animationDelay: "0.8s" }}>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-light">Discover the Works</span>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      {currentCollection && (
        <section className="container mx-auto px-6 py-24 md:py-36">
          <div className="mb-20 scroll-reveal">
            <div className="inline-block px-5 py-2 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-8 rounded">
              Now Showing
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight leading-[1.1]">
              {currentCollection.name}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-[1.8]">
              {currentCollection.description}
            </p>
          </div>

          <div className="bg-secondary/40 border border-border p-10 md:p-14 rounded-lg mb-16 scroll-reveal">
            <h3 className="font-display text-2xl md:text-3xl mb-6">Curator's Note</h3>
            <div className="text-foreground/80 leading-[1.8] space-y-5 text-base md:text-lg">
              {currentCollection.curator_statement.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {featuredArtworks.map((artwork, index) => {
              const artist = artists?.find(a => a.id === artwork.artist_id);
              return (
                <Link
                  key={artwork.id}
                  to={`/artwork/${artwork.id}`}
                  className="group scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square bg-secondary mb-5 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
                    <img
                      src={artwork.image_url}
                      alt={`${artwork.title} by ${artist?.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors duration-300">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {artist?.name} • {artwork.year}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Artist Spotlight */}
      {spotlightArtist && (
        <section className="bg-secondary/30 py-24 md:py-36">
          <div className="container mx-auto px-6">
            <div className="mb-20 scroll-reveal">
              <div className="inline-block px-5 py-2 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-8 rounded">
                Artist Spotlight
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
                {spotlightArtist.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="aspect-square bg-secondary overflow-hidden rounded-lg shadow-lg scroll-reveal">
                <img
                  src={spotlightArtist.image_url}
                  alt={`${spotlightArtist.name} - Featured artist`}
                  loading="lazy"
                  className="w-full h-full object-cover hover-scale"
                />
              </div>

              <div className="scroll-reveal">
                {spotlightArtist.location && (
                  <div className="text-muted-foreground mb-6 text-sm uppercase tracking-wider">
                    {spotlightArtist.location}
                  </div>
                )}
                {spotlightArtist.short_bio && (
                  <p className="text-foreground/80 leading-[1.8] text-lg md:text-xl mb-8">
                    {spotlightArtist.short_bio}
                  </p>
                )}
                {spotlightArtist.quote && (
                  <blockquote className="border-l-4 border-accent pl-8 italic text-foreground/70 mb-10 text-lg leading-[1.8]">
                    "{spotlightArtist.quote}"
                  </blockquote>
                )}
                <Button size="lg" asChild>
                  <Link to={`/artists/${spotlightArtist.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>

            <div className="mt-20 scroll-reveal">
              <h3 className="font-display text-3xl md:text-4xl mb-10">Works by {spotlightArtist.name}</h3>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {artworks
                    ?.filter((art) => art.artist_id === spotlightArtist.id)
                    .map((artwork) => (
                      <CarouselItem key={artwork.id} className="md:basis-1/2 lg:basis-1/3">
                        <Link to={`/artwork/${artwork.id}`} className="group block">
                          <div className="aspect-square bg-secondary mb-5 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
                            <img
                              src={artwork.image_url}
                              alt={`${artwork.title} artwork`}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <h4 className="font-display text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
                            {artwork.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {artwork.year} • Edition of {artwork.edition}
                          </p>
                        </Link>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* Recommendations */}
      <RecommendedArtworks />

      {/* Discover More */}
      <section className="container mx-auto px-6 py-24 md:py-36">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-10 tracking-tight leading-[1.1]">
            Discover the Collection
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-14 leading-[1.8] max-w-2xl mx-auto">
            Each piece in our gallery tells a story—of vision, process, and the quiet moments where art is born. 
            Explore our curated collection and find the work that speaks to you.
          </p>
          <Button size="lg" asChild>
            <Link to="/collections">Browse All Artworks</Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
