import { Link } from "react-router-dom";
import { useArtworks } from "@/hooks/useArtworks";

const Collections = () => {
  const { data: artworks, isLoading } = useArtworks();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading artworks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
            Collections
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Curated exhibitions showcasing the finest limited-edition digital artworks. Each piece tells a story, 
            bridging the gap between traditional fine art and contemporary digital creation.
          </p>
        </div>

        {!artworks || artworks.length === 0 ? (
          <p className="text-center text-muted-foreground">No artworks available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {artworks.map((artwork, index) => (
              <Link
                key={artwork.id}
                to={`/artwork/${artwork.id}`}
                className="group hover-lift animate-fade-in-up block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square bg-secondary mb-6 overflow-hidden rounded-lg">
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {artwork.year} • Edition of {artwork.edition}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                    {artwork.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
