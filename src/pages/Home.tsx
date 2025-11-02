import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";
import { useCollections } from "@/hooks/useCollections";
import { useArtworks } from "@/hooks/useArtworks";
import { useArtists } from "@/hooks/useArtists";
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

  const currentCollection = collections?.find(c => c.status === "published")?.[0];
  const featuredArtworks = artworks?.filter((art) => art.featured) || [];
  const spotlightArtist = artists?.[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="font-display text-6xl md:text-8xl mb-8 animate-fade-in-up">
            Where Art Meets Story
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in-up max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Monarch bridges the gap between digital artistry and human emotion—curating works that transcend pixels and speak to something deeper
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up w-full max-w-md mx-auto sm:max-w-none" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/collections">View Collection</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/artists">Meet the Artists</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      {currentCollection && (
        <section className="container mx-auto px-6 py-24">
          <div className="mb-12">
            <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
              Now Showing
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-6">
              {currentCollection.name}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              {currentCollection.description}
            </p>
          </div>

          <div className="bg-secondary/30 border border-border p-8 md:p-12 rounded-lg mb-12">
            <h3 className="font-display text-2xl mb-4">Curator's Note</h3>
            <div className="text-foreground/80 leading-relaxed space-y-4">
              {currentCollection.curatorStatement.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => {
              const artist = artists?.find(a => a.id === artwork.artist_id);
              return (
                <Link
                  key={artwork.id}
                  to={`/artwork/${artwork.id}`}
                  className="group"
                >
                  <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground">
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
        <section className="container mx-auto px-6 py-24 bg-secondary/20">
          <div className="mb-12">
            <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
              Artist Spotlight
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-6">
              {spotlightArtist.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-secondary overflow-hidden rounded-lg">
              <img
                src={spotlightArtist.image_url}
                alt={spotlightArtist.name}
                className="w-full h-full object-cover hover-lift"
              />
            </div>

            <div>
              {spotlightArtist.location && (
                <div className="text-muted-foreground mb-4">
                  {spotlightArtist.location}
                </div>
              )}
              {spotlightArtist.short_bio && (
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  {spotlightArtist.short_bio}
                </p>
              )}
              {spotlightArtist.quote && (
                <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/70 mb-8">
                  "{spotlightArtist.quote}"
                </blockquote>
              )}
              <Button asChild>
                <Link to={`/artists/${spotlightArtist.id}`}>View Profile</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="font-display text-3xl mb-8">Works by {spotlightArtist.name}</h3>
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
                        <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                          <img
                            src={artwork.image_url}
                            alt={artwork.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
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
        </section>
      )}

      {/* Discover More */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl mb-8">
            Discover the Collection
          </h2>
          <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
            Each piece in our gallery tells a story—of vision, process, and the quiet moments where art is born. 
            Explore our curated collection and find the work that speaks to you.
          </p>
          <Button size="lg" asChild>
            <Link to="/collections">Browse All Artworks</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
