import { Link } from "react-router-dom";
import { useExhibitions } from "@/hooks/useExhibitions";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const Exhibitions = () => {
  const { data: exhibitions, isLoading } = useExhibitions();

  const currentExhibitions = exhibitions?.filter((e) => e.status === "current");
  const upcomingExhibitions = exhibitions?.filter((e) => e.status === "upcoming");
  const pastExhibitions = exhibitions?.filter((e) => e.status === "past");

  const ExhibitionCard = ({ exhibition, index }: { exhibition: any; index: number }) => (
    <Link
      to={`/exhibitions/${exhibition.slug}`}
      className="group block scroll-reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-[4/3] bg-secondary mb-5 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
        {exhibition.cover_image_url && (
          <img
            src={exhibition.cover_image_url}
            alt={`${exhibition.title} exhibition`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
        {format(new Date(exhibition.start_date), "MMMM d")} - {format(new Date(exhibition.end_date), "MMMM d, yyyy")}
      </p>
      <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors duration-300 leading-[1.2]">
        {exhibition.title}
      </h3>
      <p className="text-foreground/70 leading-[1.7]">
        {exhibition.description}
      </p>
    </Link>
  );

  return (
    <>
      <SEO
        title="Exhibition Archive"
        description="Explore Monarch's curated exhibitions—past, present, and future. Each exhibition tells a unique story through carefully selected artworks."
      />
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Header */}
        <section className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-3xl scroll-reveal">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Archive
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              Exhibition Archive
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-[1.8]">
              Explore our curated exhibitions—each one a carefully crafted narrative bringing together artworks that share a common vision.
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="container mx-auto px-6 pb-24">
            <JournalSkeleton />
          </section>
        ) : (
          <section className="container mx-auto px-6 pb-24">
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="mb-12 w-full max-w-md mx-auto grid grid-cols-3">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                {currentExhibitions && currentExhibitions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                    {currentExhibitions.map((exhibition, index) => (
                      <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      No current exhibitions. Check upcoming exhibitions or explore our past shows.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming">
                {upcomingExhibitions && upcomingExhibitions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                    {upcomingExhibitions.map((exhibition, index) => (
                      <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      No upcoming exhibitions announced yet. Stay tuned!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past">
                {pastExhibitions && pastExhibitions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                    {pastExhibitions.map((exhibition, index) => (
                      <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      No past exhibitions in our archive yet.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </section>
        )}
      </div>
    </>
  );
};

export default Exhibitions;
