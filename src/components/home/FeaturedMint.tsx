import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useArtworks } from "@/hooks/useArtworks";
import { useArtists } from "@/hooks/useArtists";

export const FeaturedMint = () => {
  const { data: artworks } = useArtworks();
  const { data: artists } = useArtists();

  // Get the first featured artwork
  const featuredArtwork = artworks?.find((art) => art.featured);
  const artist = artists?.find((a) => a.id === featuredArtwork?.artist_id);

  if (!featuredArtwork || !artist) return null;

  return (
    <motion.div
      className="mt-12 md:mt-16 mb-8 md:mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-md mx-auto px-4">
        {/* Featured artwork card */}
        <div className="relative group">
          {/* Image container */}
          <Link to={`/artworks/${featuredArtwork.id}`} className="block">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary/30 mb-6">
              <motion.img
                src={featuredArtwork.image_url}
                alt={featuredArtwork.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </Link>

          {/* Content */}
          <div className="text-center space-y-3">
            {/* Artist name */}
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">
              {artist.name}
            </p>

            {/* Artwork title - italicized */}
            <h3 className="font-display text-xl md:text-2xl italic text-foreground/90">
              {featuredArtwork.title}
            </h3>

            {/* Metadata row */}
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              {featuredArtwork.edition && (
                <span className="font-light">{featuredArtwork.edition}</span>
              )}
              {featuredArtwork.edition && featuredArtwork.price && (
                <span className="w-px h-3 bg-border" />
              )}
              {featuredArtwork.price && (
                <span className="font-light">{featuredArtwork.price}</span>
              )}
            </div>

            {/* Collect button */}
            <div className="pt-4">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="border-foreground/20 hover:bg-foreground/5 text-foreground/80 hover:text-foreground px-6 text-xs uppercase tracking-[0.15em] font-light transition-all duration-300"
              >
                <Link to={`/artworks/${featuredArtwork.id}`}>Collect</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
