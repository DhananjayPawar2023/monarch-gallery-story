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
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" 
          aria-label="Hero banner"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroBackground})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-8 leading-[1.1] tracking-tight">
              <span className="block animate-fade-in-up">Where Art</span>
              <span className="block animate-fade-in-up" style={{ animationDelay: "0.15s" }}>Meets Story</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 md:mb-12 animate-fade-in-up max-w-2xl mx-auto leading-relaxed font-light" style={{ animationDelay: "0.3s" }}>
              Monarch bridges digital artistry and human emotion—curating works that transcend pixels and speak to something deeper
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
              <Button 
                size="lg" 
                asChild 
                className="bg-foreground text-background hover:bg-foreground/90 px-8"
              >
                <Link to="/collections">View Collection</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-foreground/20 hover:bg-foreground/5 px-8"
              >
                <Link to="/artists">Meet the Artists</Link>
              </Button>
            </div>
            <div className="flex flex-col items-center gap-3 mt-16 md:mt-20 animate-fade-in-up animate-scroll-bounce" style={{ animationDelay: "0.6s" }}>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">Discover</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Now Showing Section */}
        {currentCollection && (
          <section className="container mx-auto px-6 py-24 md:py-32">
            <div className="mb-16 scroll-reveal">
              <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-6 rounded-sm">
                Now Showing
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight leading-[1.1]">
                {currentCollection.name}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
                {currentCollection.description}
              </p>
            </div>

            <div className="bg-secondary/30 border border-border/50 p-8 md:p-12 rounded-sm mb-14 scroll-reveal">
              <h3 className="font-display text-xl md:text-2xl mb-5">Curator's Note</h3>
              <div className="text-foreground/80 leading-relaxed space-y-4 text-base md:text-lg">
                {currentCollection.curator_statement.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {featuredArtworks.map((artwork, index) => {
                const artist = artists?.find(a => a.id === artwork.artist_id);
                return (
                  <Link
                    key={artwork.id}
                    to={`/artwork/${artwork.id}`}
                    className="group scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-sm hover:shadow-lg transition-all duration-500">
                      <img
                        src={artwork.image_url}
                        alt={`${artwork.title} by ${artist?.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
                      {artwork.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
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
          <section className="bg-secondary/20 py-24 md:py-32">
            <div className="container mx-auto px-6">
              <div className="mb-16 scroll-reveal">
                <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-6 rounded-sm">
                  Artist Spotlight
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight leading-[1.1]">
                  {spotlightArtist.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="aspect-square bg-secondary overflow-hidden rounded-sm shadow-md scroll-reveal">
                  <img
                    src={spotlightArtist.image_url}
                    alt={`${spotlightArtist.name} - Featured artist`}
                    loading="lazy"
                    className="w-full h-full object-cover hover-scale"
                  />
                </div>

                <div className="scroll-reveal">
                  {spotlightArtist.location && (
                    <div className="text-muted-foreground mb-5 text-sm uppercase tracking-wider">
                      {spotlightArtist.location}
                    </div>
                  )}
                  {spotlightArtist.short_bio && (
                    <p className="text-foreground/80 leading-relaxed text-lg md:text-xl mb-6">
                      {spotlightArtist.short_bio}
                    </p>
                  )}
                  {spotlightArtist.quote && (
                    <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/70 mb-8 text-lg leading-relaxed">
                      "{spotlightArtist.quote}"
                    </blockquote>
                  )}
                  <Button size="lg" asChild className="bg-foreground text-background hover:bg-foreground/90">
                    <Link to={`/artists/${spotlightArtist.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-16 scroll-reveal">
                <h3 className="font-display text-2xl md:text-3xl mb-8">Works by {spotlightArtist.name}</h3>
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
                            <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-sm hover:shadow-lg transition-all duration-500">
                              <img
                                src={artwork.image_url}
                                alt={`${artwork.title} artwork`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <h4 className="font-display text-lg md:text-xl mb-1.5 group-hover:text-accent transition-colors duration-300">
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
        <section className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8 tracking-tight leading-[1.1]">
              Discover the Collection
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Each piece in our gallery tells a story—of vision, process, and the quiet moments where art is born. 
              Explore our curated collection and find the work that speaks to you.
            </p>
            <Button size="lg" asChild className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/collections">Browse All Artworks</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
