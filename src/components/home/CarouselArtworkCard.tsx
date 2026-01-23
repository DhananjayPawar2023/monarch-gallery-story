import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CarouselArtworkCardProps {
  artwork: {
    id: string;
    title: string;
    image_url: string;
    year: number;
    edition: string;
  };
}

export function CarouselArtworkCard({ artwork }: CarouselArtworkCardProps) {
  return (
    <Link to={`/artwork/${artwork.id}`} className="group block">
      <div className="relative aspect-square bg-secondary mb-4 overflow-hidden rounded-sm">
        <motion.img
          src={artwork.image_url}
          alt={`${artwork.title} artwork`}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
        />
      </div>
      <motion.h4 
        className="font-display text-lg md:text-xl mb-1.5 transition-colors duration-300 group-hover:text-accent"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {artwork.title}
      </motion.h4>
      <p className="text-muted-foreground text-sm">
        {artwork.year} • Edition of {artwork.edition}
      </p>
    </Link>
  );
}
