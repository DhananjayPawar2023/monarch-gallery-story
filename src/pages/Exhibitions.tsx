import { Link } from "react-router-dom";
import { useExhibitions } from "@/hooks/useExhibitions";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar, MapPin, ArrowRight, Layers } from "lucide-react";

const Exhibitions = () => {
  const { data: exhibitions, isLoading } = useExhibitions();

  const currentExhibitions = exhibitions?.filter((e) => e.status === "current");
  const upcomingExhibitions = exhibitions?.filter((e) => e.status === "upcoming");
  const pastExhibitions = exhibitions?.filter((e) => e.status === "past");

  const ExhibitionCard = ({ exhibition, index }: { exhibition: any; index: number }) => (
    <Link
      to={`/exhibitions/${exhibition.slug}`}
      className="group scroll-reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="h-full overflow-hidden border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0">
          <AspectRatio ratio={4/3} className="bg-secondary overflow-hidden">
            {exhibition.cover_image_url ? (
              <img
                src={exhibition.cover_image_url}
                alt={`${exhibition.title} exhibition`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <Layers className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Calendar className="w-3 h-3" />
            <span>
              {format(new Date(exhibition.start_date), "MMM d")} - {format(new Date(exhibition.end_date), "MMM d, yyyy")}
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors duration-300 leading-[1.2]">
            {exhibition.title}
          </h3>
          <p className="text-foreground/70 leading-relaxed text-sm line-clamp-3">
            {exhibition.description}
          </p>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
          <span className="text-sm text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
            View Exhibition
            <ArrowRight className="w-4 h-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <Card className="text-center py-16 col-span-full">
      <CardContent>
        <Layers className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground text-lg">{message}</p>
      </CardContent>
    </Card>
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
              <Layers className="w-3 h-3 mr-1" />
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
              <TabsList className="mb-12 w-full max-w-lg mx-auto grid grid-cols-3 h-12">
                <TabsTrigger value="current" className="text-sm">
                  Current
                  {currentExhibitions && currentExhibitions.length > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                      {currentExhibitions.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="text-sm">
                  Upcoming
                  {upcomingExhibitions && upcomingExhibitions.length > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                      {upcomingExhibitions.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="past" className="text-sm">
                  Past
                  {pastExhibitions && pastExhibitions.length > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                      {pastExhibitions.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentExhibitions && currentExhibitions.length > 0 ? (
                    currentExhibitions.map((exhibition, index) => (
                      <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
                    ))
                  ) : (
                    <EmptyState message="No current exhibitions. Check upcoming exhibitions or explore our past shows." />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="upcoming">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingExhibitions && upcomingExhibitions.length > 0 ? (
                    upcomingExhibitions.map((exhibition, index) => (
                      <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
                    ))
                  ) : (
                    <EmptyState message="No upcoming exhibitions announced yet. Stay tuned!" />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastExhibitions && pastExhibitions.length > 0 ? (
                    pastExhibitions.map((exhibition, index) => (
                      <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
                    ))
                  ) : (
                    <EmptyState message="No past exhibitions in our archive yet." />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}
      </div>
    </>
  );
};

export default Exhibitions;