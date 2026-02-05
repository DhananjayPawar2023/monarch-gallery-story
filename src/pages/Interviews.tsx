import { Link } from "react-router-dom";
import { useInterviews } from "@/hooks/useInterviews";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar, ArrowRight, Mic } from "lucide-react";

const Interviews = () => {
  const { data: interviews, isLoading } = useInterviews();

  const featuredInterview = interviews?.find((i) => i.featured);
  const otherInterviews = interviews?.filter((i) => !i.featured);

  return (
    <>
      <SEO
        title="Artist Interviews"
        description="Intimate conversations with the artists behind Monarch's curated collection. Explore their creative process, inspiration, and stories."
      />
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Header */}
        <section className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-3xl scroll-reveal">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              <Mic className="w-3 h-3 mr-1" />
              Conversations
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              Artist Interviews
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-[1.8]">
              Intimate conversations with the artists behind our collection—exploring their creative process, inspiration, and the stories that bring their work to life.
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="container mx-auto px-6 pb-24">
            <JournalSkeleton />
          </section>
        ) : interviews && interviews.length === 0 ? (
          <section className="container mx-auto px-6 pb-24">
            <Card className="text-center py-16">
              <CardContent>
                <Mic className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg mb-2">No interviews yet</p>
                <p className="text-sm text-muted-foreground">Check back soon for artist conversations.</p>
              </CardContent>
            </Card>
          </section>
        ) : (
          <>
            {/* Featured Interview */}
            {featuredInterview && (
              <section className="container mx-auto px-6 pb-20">
                <Link
                  to={`/interviews/${featuredInterview.slug}`}
                  className="group block scroll-reveal"
                >
                  <Card className="overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="aspect-[4/5] lg:aspect-auto bg-secondary overflow-hidden">
                        <img
                          src={featuredInterview.cover_image_url || featuredInterview.artists?.image_url}
                          alt={`${featuredInterview.title} - Featured interview`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-accent/10 text-accent border-accent/20">
                          Featured
                        </Badge>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-accent transition-colors leading-[1.1]">
                          {featuredInterview.title}
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={featuredInterview.artists?.image_url} alt={featuredInterview.artists?.name} />
                            <AvatarFallback>{featuredInterview.artists?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <p className="font-medium">With {featuredInterview.artists?.name}</p>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(featuredInterview.interview_date), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <p className="text-foreground/80 leading-[1.8] text-lg">
                          {featuredInterview.excerpt}
                        </p>
                        <div className="mt-6">
                          <span className="text-accent flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                            Read Interview <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </section>
            )}

            {/* All Interviews */}
            {otherInterviews && otherInterviews.length > 0 && (
              <section className="container mx-auto px-6 pb-24">
                <h2 className="font-display text-2xl md:text-3xl mb-10">More Conversations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherInterviews.map((interview, index) => (
                    <Link
                      key={interview.id}
                      to={`/interviews/${interview.slug}`}
                      className="group scroll-reveal"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Card className="h-full overflow-hidden border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="p-0">
                          <AspectRatio ratio={3/4} className="bg-secondary overflow-hidden">
                            <img
                              src={interview.cover_image_url || interview.artists?.image_url}
                              alt={`${interview.title} interview`}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </AspectRatio>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(interview.interview_date), "MMMM d, yyyy")}
                          </div>
                          <h3 className="font-display text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors leading-[1.2]">
                            {interview.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={interview.artists?.image_url} alt={interview.artists?.name} />
                              <AvatarFallback className="text-xs">{interview.artists?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>With {interview.artists?.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Interviews;