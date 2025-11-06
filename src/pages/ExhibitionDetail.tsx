import { useParams, Link } from "react-router-dom";
import { useExhibition } from "@/hooks/useExhibitions";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const ExhibitionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: exhibition, isLoading } = useExhibition(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-6">
          <JournalSkeleton />
        </div>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl mb-4">Exhibition Not Found</h1>
          <Link to="/exhibitions">
            <Button variant="outline">Back to Exhibitions</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={exhibition.title}
        description={exhibition.description}
        image={exhibition.cover_image_url}
      />
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="container mx-auto px-6 pt-32 pb-8">
          <Link to="/exhibitions">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Exhibitions
            </Button>
          </Link>
        </nav>

        {/* Header */}
        <section className="container mx-auto px-6 pb-12">
          <div className="max-w-3xl scroll-reveal">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              {exhibition.status === "current" ? "Now Showing" : exhibition.status === "upcoming" ? "Coming Soon" : "Past Exhibition"}
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              {exhibition.title}
            </h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
              {format(new Date(exhibition.start_date), "MMMM d")} - {format(new Date(exhibition.end_date), "MMMM d, yyyy")}
            </p>
            <p className="text-xl text-foreground/80 leading-[1.8]">
              {exhibition.description}
            </p>
          </div>
        </section>

        {/* Cover Image */}
        {exhibition.cover_image_url && (
          <section className="container mx-auto px-6 pb-16">
            <div className="aspect-[21/9] bg-secondary overflow-hidden rounded-lg shadow-lg scroll-reveal">
              <img
                src={exhibition.cover_image_url}
                alt={exhibition.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Curator Statement */}
        <section className="container mx-auto px-6 pb-20">
          <div className="bg-secondary/40 border border-border p-10 md:p-14 rounded-lg scroll-reveal">
            <h2 className="font-display text-2xl md:text-3xl mb-6">Curator's Statement</h2>
            <div className="text-foreground/80 leading-[1.8] space-y-5 text-base md:text-lg">
              {exhibition.curator_statement.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Artworks */}
        {exhibition.artworks && exhibition.artworks.length > 0 && (
          <section className="container mx-auto px-6 pb-24">
            <h2 className="font-display text-3xl md:text-4xl mb-12 scroll-reveal">
              Featured Artworks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {exhibition.artworks.map((item: any, index: number) => {
                const artwork = item.artworks;
                const artist = artwork?.artists;
                return (
                  <Link
                    key={item.id}
                    to={`/artwork/${artwork?.id}`}
                    className="group scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square bg-secondary mb-5 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
                      <img
                        src={artwork?.image_url}
                        alt={`${artwork?.title} by ${artist?.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 group-hover:text-accent transition-colors duration-300">
                      {artwork?.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {artist?.name} • {artwork?.year}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ExhibitionDetail;
