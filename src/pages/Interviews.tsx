import { Link } from "react-router-dom";
import { useInterviews } from "@/hooks/useInterviews";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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
        ) : (
          <>
            {/* Featured Interview */}
            {featuredInterview && (
              <section className="container mx-auto px-6 pb-20">
                <Link
                  to={`/interviews/${featuredInterview.slug}`}
                  className="group block scroll-reveal"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="aspect-[4/5] bg-secondary overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={featuredInterview.cover_image_url || featuredInterview.artists?.image_url}
                        alt={`${featuredInterview.title} - Featured interview`}
                        loading="lazy"
                        className="w-full h-full object-cover hover-scale"
                      />
                    </div>
                    <div>
                      <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                        Featured
                      </Badge>
                      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-accent transition-colors duration-300 leading-[1.1]">
                        {featuredInterview.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
                        With {featuredInterview.artists?.name} • {format(new Date(featuredInterview.interview_date), "MMMM d, yyyy")}
                      </p>
                      <p className="text-foreground/80 leading-[1.8] text-lg">
                        {featuredInterview.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* All Interviews */}
            <section className="container mx-auto px-6 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                {otherInterviews?.map((interview, index) => (
                  <Link
                    key={interview.id}
                    to={`/interviews/${interview.slug}`}
                    className="group scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[3/4] bg-secondary mb-5 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500">
                      <img
                        src={interview.cover_image_url || interview.artists?.image_url}
                        alt={`${interview.title} interview`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      {format(new Date(interview.interview_date), "MMMM d, yyyy")}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors duration-300 leading-[1.2]">
                      {interview.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      With {interview.artists?.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Interviews;
