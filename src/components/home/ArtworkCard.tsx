import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ArtworkCardProps {
  artwork: {
    id: string;
    title: string;
    image_url: string;
    year: number;
  };
  artistName?: string;
  index?: number;
}

export function ArtworkCard({ artwork, artistName, index = 0 }: ArtworkCardProps) {
  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="group block"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="relative aspect-square bg-secondary mb-4 overflow-hidden rounded-sm">
          <motion.img
            src={artwork.image_url}
            alt={`${artwork.title} by ${artistName}`}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
          />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <motion.h3 
          className="font-display text-xl md:text-2xl mb-2 transition-colors duration-300 group-hover:text-accent"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {artwork.title}
        </motion.h3>
        <p className="text-muted-foreground text-sm">
          {artistName} • {artwork.year}
        </p>
      </motion.div>
    </Link>
  );
}
