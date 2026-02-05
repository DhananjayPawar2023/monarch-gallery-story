import { useState, useMemo } from "react";
import { useJournalEntries } from "@/hooks/useJournal";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SearchFilter } from "@/components/SearchFilter";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpen, Calendar, Clock, ArrowRight, Mail, User } from "lucide-react";

const Journal = () => {
  const { data: journalEntries, isLoading } = useJournalEntries();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [email, setEmail] = useState("");

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

  const featuredEntry = filteredAndSortedEntries.find((entry) => entry.featured);
  const otherEntries = filteredAndSortedEntries.filter((entry) => !entry.featured);

  return (
    <>
      <SEO 
        title="Journal - Essays & Reflections on Digital Art"
        description="Essays, conversations, and reflections on the intersection of art, technology, and meaning. Deeper thinking about what digital creation can become."
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <BookOpen className="w-3 h-3 mr-1" />
              Essays & Reflections
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Journal
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed animate-fade-in-up max-w-3xl" style={{ animationDelay: "0.1s" }}>
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
            <Card className="text-center py-16">
              <CardContent>
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg mb-2">
                  {searchTerm ? "No journal entries match your search." : "No journal entries yet"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back soon for essays and reflections.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Featured Entry */}
              {featuredEntry && (
                <Link to={`/journal/${featuredEntry.slug}`} className="group block mb-12">
                  <Card className="overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {featuredEntry.cover_image_url && (
                        <div className="aspect-[16/10] lg:aspect-auto bg-secondary overflow-hidden">
                          <img
                            src={featuredEntry.cover_image_url}
                            alt={featuredEntry.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-accent/10 text-accent border-accent/20">
                          {featuredEntry.category}
                        </Badge>
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4 group-hover:text-accent transition-colors leading-tight">
                          {featuredEntry.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {featuredEntry.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(featuredEntry.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featuredEntry.read_time}
                          </span>
                        </div>
                        <Separator className="my-4" />
                        <p className="text-foreground/80 leading-relaxed mb-6">
                          {featuredEntry.excerpt}
                        </p>
                        <span className="text-accent flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )}

              {/* Other Entries */}
              <div className="space-y-8">
                {otherEntries.map((entry, index) => (
                  <Link
                    key={entry.id}
                    to={`/journal/${entry.slug}`}
                    className="group block animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card className="overflow-hidden border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-0">
                        {entry.cover_image_url && (
                          <div className="aspect-video md:aspect-square bg-secondary overflow-hidden">
                            <img
                              src={entry.cover_image_url}
                              alt={entry.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <CardContent className="p-6 flex flex-col justify-center">
                          <Badge variant="outline" className="w-fit mb-3 text-xs">
                            {entry.category}
                          </Badge>
                          <h2 className="font-display text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors leading-tight">
                            {entry.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span>{entry.author}</span>
                            <span>•</span>
                            <span>{new Date(entry.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span>•</span>
                            <span>{entry.read_time}</span>
                          </div>
                          <p className="text-foreground/70 leading-relaxed text-sm line-clamp-2">
                            {entry.excerpt}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Newsletter CTA */}
          <Card className="mt-16 bg-secondary/30 border-border/50">
            <CardContent className="py-10 px-8 text-center">
              <Mail className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="font-display text-2xl mb-3">Stay Connected</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Receive occasional insights, artist features, and collection announcements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Journal;
