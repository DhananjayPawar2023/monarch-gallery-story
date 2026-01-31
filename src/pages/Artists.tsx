import { useState, useMemo } from "react";
import { useArtists } from "@/hooks/useArtists";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SearchFilter } from "@/components/SearchFilter";
import { ArtistSkeleton } from "@/components/LoadingSkeleton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Pagination } from "@/components/Pagination";

const Artists = () => {
  const { data: artists, isLoading } = useArtists();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const sortOptions = [
    { value: "name", label: "Name A-Z" },
    { value: "newest", label: "Newest First" },
  ];

  const filteredAndSortedArtists = useMemo(() => {
    if (!artists) return [];
    
    let filtered = artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (artist.short_bio?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    );

    switch (sortBy) {
      case "newest":
        return [...filtered].reverse();
      case "name":
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [artists, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedArtists.length / itemsPerPage);
  const paginatedArtists = filteredAndSortedArtists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <SEO 
        title="Featured Artists - Digital Art Pioneers"
        description="Meet the visionary artists at Monarch - storytellers, pioneers, and digital art creators bridging technology and emotion through exceptional artworks."
        keywords={["digital artists", "contemporary artists", "art pioneers", "visual artists", "creative professionals"]}
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto">
          <Breadcrumb />
          <header className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Artists
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              The artists at Monarch are not just creators—they're storytellers, philosophers, and pioneers. 
              Each has found their own way to bridge the gap between technology and emotion, creating works that feel 
              deeply human in a digital age.
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
            <div className="space-y-24">
              {[...Array(3)].map((_, i) => (
                <ArtistSkeleton key={i} />
              ))}
            </div>
          ) : filteredAndSortedArtists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm ? "No artists match your search." : "No artists available yet."}
              </p>
            </div>
          ) : (
            <>
            <section className="space-y-24">
              {paginatedArtists.map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artists/${artist.id}`}
              id={artist.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up scroll-mt-24 group ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="aspect-square bg-secondary overflow-hidden rounded-lg">
                  <img
                    src={artist.image_url}
                    alt={`${artist.name} - Digital artist profile`}
                    loading="lazy"
                    className="w-full h-full object-cover hover-lift"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                {artist.specialization && (
                  <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
                    {artist.specialization}
                  </div>
                )}
                <h2 className="font-display text-4xl md:text-5xl mb-3 group-hover:text-accent transition-colors">
                  {artist.name}
                </h2>
                {artist.location && (
                  <p className="text-muted-foreground text-sm mb-6">
                    {artist.location}
                  </p>
                )}
                {artist.short_bio && (
                  <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                    {artist.short_bio}
                  </p>
                )}
                
                {artist.quote && (
                  <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/70 mb-8 leading-relaxed">
                    "{artist.quote}"
                  </blockquote>
                )}
                
                <p className="text-accent font-semibold">View Full Profile →</p>
              </div>
              </Link>
              ))}
            </section>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Artists;
