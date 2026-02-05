import { useState, useMemo } from "react";
import { useArtists } from "@/hooks/useArtists";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SearchFilter } from "@/components/SearchFilter";
import { ArtistSkeleton } from "@/components/LoadingSkeleton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Pagination } from "@/components/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Quote, ArrowRight } from "lucide-react";

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
            <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wider">
              Featured Creators
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Artists
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              The artists at Monarch are not just creators—they're storytellers, philosophers, and pioneers. 
              Each has found their own way to bridge the gap between technology and emotion.
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
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? "No artists match your search." : "No artists available yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <section className="space-y-16">
                {paginatedArtists.map((artist, index) => (
                  <Card 
                    key={artist.id}
                    className="overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link
                      to={`/artists/${artist.id}`}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-0 group"
                    >
                      <div className={`aspect-square lg:aspect-auto lg:h-full bg-secondary overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                        <img
                          src={artist.image_url}
                          alt={`${artist.name} - Digital artist profile`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <CardContent className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="h-12 w-12 border-2 border-accent/20">
                            <AvatarImage src={artist.image_url} alt={artist.name} />
                            <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            {artist.specialization && (
                              <Badge className="bg-accent/10 text-accent border-accent/20 mb-1">
                                {artist.specialization}
                              </Badge>
                            )}
                            {artist.location && (
                              <p className="text-muted-foreground text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {artist.location}
                              </p>
                            )}
                          </div>
                        </div>

                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-accent transition-colors">
                          {artist.name}
                        </h2>

                        {artist.short_bio && (
                          <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                            {artist.short_bio}
                          </p>
                        )}
                        
                        {artist.quote && (
                          <>
                            <Separator className="my-6" />
                            <blockquote className="flex gap-3 text-foreground/70 italic leading-relaxed">
                              <Quote className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                              <span>"{artist.quote}"</span>
                            </blockquote>
                          </>
                        )}

                        <div className="mt-8">
                          <Button variant="outline" className="group/btn">
                            View Full Profile 
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
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