import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useArtworks } from "@/hooks/useArtworks";
import { SEO } from "@/components/SEO";
import { SearchFilter } from "@/components/SearchFilter";
import { ArtworkSkeleton } from "@/components/LoadingSkeleton";

const Collections = () => {
  const { data: artworks, isLoading } = useArtworks();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
  ];

  const filteredAndSortedArtworks = useMemo(() => {
    if (!artworks) return [];
    
    let filtered = artworks.filter((artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => a.year - b.year);
      case "title":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
      default:
        return filtered.sort((a, b) => b.year - a.year);
    }
  }, [artworks, searchTerm, sortBy]);

  return (
    <>
      <SEO 
        title="Art Collections - Curated Digital Artworks"
        description="Explore our curated collection of limited-edition digital artworks from renowned artists. Each piece tells a unique story bridging traditional fine art and contemporary digital creation."
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto">
          <header className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Collections
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Curated exhibitions showcasing the finest limited-edition digital artworks. Each piece tells a story, 
              bridging the gap between traditional fine art and contemporary digital creation.
            </p>
          </header>

          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={sortOptions}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(6)].map((_, i) => (
                <ArtworkSkeleton key={i} />
              ))}
            </div>
          ) : filteredAndSortedArtworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm ? "No artworks match your search." : "No artworks available yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredAndSortedArtworks.map((artwork, index) => (
              <Link
                key={artwork.id}
                to={`/artwork/${artwork.id}`}
                className="group hover-lift animate-fade-in-up block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square bg-secondary mb-6 overflow-hidden rounded-lg">
                  <img
                    src={artwork.image_url}
                    alt={`${artwork.title} - Digital artwork`}
                    loading="lazy"
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
      </main>
    </>
  );
};

export default Collections;
