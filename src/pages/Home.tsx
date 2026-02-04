import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-bg.jpg";
import { useCollections } from "@/hooks/useCollections";
import { useArtworks } from "@/hooks/useArtworks";
import { useArtists } from "@/hooks/useArtists";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RecommendedArtworks } from "@/components/RecommendedArtworks";
import { ArtworkCard } from "@/components/home/ArtworkCard";
import { CarouselArtworkCard } from "@/components/home/CarouselArtworkCard";
import { HomePageSkeleton } from "@/components/home/HomeSkeleton";
import { FeaturedMint } from "@/components/home/FeaturedMint";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const { data: collections, isLoading: collectionsLoading } = useCollections();
  const { data: artworks, isLoading: artworksLoading } = useArtworks();
  const { data: artists, isLoading: artistsLoading } = useArtists();
  
  const nowShowingRef = useRef<HTMLElement>(null);

  const isLoading = collectionsLoading || artworksLoading || artistsLoading;
  const currentCollection = collections?.[0];
  const featuredArtworks = artworks?.filter((art) => art.featured).slice(0, 3) || [];
  const spotlightArtist = artists?.[0];

  const scrollToNowShowing = () => {
    nowShowingRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  if (isLoading) {
    return (
      <>
        <SEO />
        <div className="min-h-screen">
          <HomePageSkeleton />
        </div>
      </>
    );
  }

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
            <motion.h1 
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-8 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="block">Where Art</span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Meets Story
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Monarch bridges digital artistry and human emotion—curating works that transcend pixels and speak to something deeper
            </motion.p>

            {/* Featured Mint Section */}
            <FeaturedMint />

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-foreground text-background hover:bg-foreground/90 px-8 transition-all duration-300 hover:scale-105"
              >
                <Link to="/collections">View Collection</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-foreground/20 hover:bg-foreground/5 px-8 transition-all duration-300 hover:scale-105"
              >
                <Link to="/artists">Meet the Artists</Link>
              </Button>
            </motion.div>
            <motion.button
              onClick={scrollToNowShowing}
              className="flex flex-col items-center gap-3 mt-16 md:mt-20 mx-auto cursor-pointer group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              aria-label="Scroll to Now Showing section"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light group-hover:text-foreground transition-colors duration-300">
                Discover
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </motion.div>
            </motion.button>
          </div>
        </section>

        {/* Now Showing Section */}
        {currentCollection && (
          <section ref={nowShowingRef} className="container mx-auto px-6 py-24 md:py-32">
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-6 rounded-sm">
                Now Showing
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight leading-[1.1]">
                {currentCollection.name}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
                {currentCollection.description}
              </p>
            </motion.div>

            <motion.div 
              className="bg-secondary/30 border border-border/50 p-8 md:p-12 rounded-sm mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-display text-xl md:text-2xl mb-5">Curator's Note</h3>
              <div className="text-foreground/80 leading-relaxed space-y-4 text-base md:text-lg">
                {currentCollection.curator_statement.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {featuredArtworks.map((artwork, index) => {
                const artist = artists?.find(a => a.id === artwork.artist_id);
                return (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    artistName={artist?.name}
                    index={index}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Artist Spotlight */}
        {spotlightArtist && (
          <section className="bg-secondary/20 py-24 md:py-32">
            <div className="container mx-auto px-6">
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-6 rounded-sm">
                  Artist Spotlight
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight leading-[1.1]">
                  {spotlightArtist.name}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div 
                  className="aspect-square bg-secondary overflow-hidden rounded-sm shadow-md"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.img
                    src={spotlightArtist.image_url}
                    alt={`${spotlightArtist.name} - Featured artist`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
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
                  <Button 
                    size="lg" 
                    asChild 
                    className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
                  >
                    <Link to={`/artists/${spotlightArtist.id}`}>View Profile</Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div 
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
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
                          <CarouselArtworkCard artwork={artwork} />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </motion.div>
            </div>
          </section>
        )}

        {/* Recommendations */}
        <RecommendedArtworks />

        {/* Discover More */}
        <section className="container mx-auto px-6 py-24 md:py-32">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8 tracking-tight leading-[1.1]">
              Discover the Collection
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Each piece in our gallery tells a story—of vision, process, and the quiet moments where art is born. 
              Explore our curated collection and find the work that speaks to you.
            </p>
            <Button 
              size="lg" 
              asChild 
              className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
            >
              <Link to="/collections">Browse All Artworks</Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;
