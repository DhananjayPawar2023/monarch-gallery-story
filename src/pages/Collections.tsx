import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useCollections } from "@/hooks/useCollections";
import { SEO } from "@/components/SEO";
import { SearchFilter } from "@/components/SearchFilter";
import { ArtworkSkeleton } from "@/components/LoadingSkeleton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Pagination } from "@/components/Pagination";

const Collections = () => {
  const { data: collections, isLoading } = useCollections();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name A-Z" },
  ];

  const filteredAndSortedCollections = useMemo(() => {
    if (!collections) return [];
    
    let filtered = collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
      default:
        return filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }
  }, [collections, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedCollections.length / itemsPerPage);
  const paginatedCollections = filteredAndSortedCollections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <SEO 
        title="Art Collections - Curated Digital Artworks"
        description="Explore our curated collection of limited-edition digital artworks from renowned artists. Each piece tells a unique story bridging traditional fine art and contemporary digital creation."
        keywords={["digital art collections", "curated artworks", "limited edition art", "contemporary digital art", "art exhibitions"]}
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto">
          <Breadcrumb />
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
          ) : filteredAndSortedCollections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm ? "No collections match your search." : "No collections available yet."}
              </p>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {paginatedCollections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group hover-lift animate-fade-in-up block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] bg-secondary mb-6 overflow-hidden rounded-lg">
                  {collection.cover_image_url && (
                    <img
                      src={collection.cover_image_url}
                      alt={`${collection.name} - Art collection`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                    {collection.description}
                  </p>
                </div>
              </Link>
              ))}
            </div>
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

export default Collections;
