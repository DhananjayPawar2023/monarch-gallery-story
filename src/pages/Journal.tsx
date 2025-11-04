import { useState, useMemo } from "react";
import { useJournalEntries } from "@/hooks/useJournal";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SearchFilter } from "@/components/SearchFilter";
import { JournalSkeleton } from "@/components/LoadingSkeleton";

const Journal = () => {
  const { data: journalEntries, isLoading } = useJournalEntries();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  const filteredAndSortedEntries = useMemo(() => {
    if (!journalEntries) return [];
    
    let filtered = journalEntries.filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => new Date(a.published_date).getTime() - new Date(b.published_date).getTime());
      case "newest":
      default:
        return filtered.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
    }
  }, [journalEntries, searchTerm, sortBy]);

  return (
    <>
      <SEO 
        title="Journal - Essays & Reflections on Digital Art"
        description="Essays, conversations, and reflections on the intersection of art, technology, and meaning. Deeper thinking about what digital creation can become."
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Journal
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Essays, conversations, and reflections on the intersection of art, technology, and meaning. 
              A space for deeper thinking about what digital creation can become.
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
            <div className="space-y-12">
              {[...Array(3)].map((_, i) => (
                <JournalSkeleton key={i} />
              ))}
            </div>
          ) : filteredAndSortedEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm ? "No journal entries match your search." : "No journal entries available yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredAndSortedEntries.map((entry, index) => (
              <article
                key={entry.id}
                className="border-b border-border pb-12 last:border-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
                  {entry.category}
                </div>
                <Link to={`/journal/${entry.slug}`} className="group">
                  <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors">
                    {entry.title}
                  </h2>
                </Link>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>{entry.author}</span>
                  <span>•</span>
                  <span>{new Date(entry.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{entry.read_time}</span>
                </div>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  {entry.excerpt}
                </p>
                <Link
                  to={`/journal/${entry.slug}`}
                  className="text-accent hover:underline"
                >
                  Read More →
                </Link>
              </article>
              ))}
            </div>
          )}

          <aside className="mt-16 p-8 bg-secondary/30 border border-border rounded-lg text-center">
            <h3 className="font-display text-2xl mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-6">
              Receive occasional insights, artist features, and collection announcements.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Journal;
