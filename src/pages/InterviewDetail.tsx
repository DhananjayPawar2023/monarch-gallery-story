import { useParams, Link } from "react-router-dom";
import { useInterview } from "@/hooks/useInterviews";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import AudioPlayer from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const InterviewDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: interview, isLoading } = useInterview(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-6">
          <JournalSkeleton />
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl mb-4">Interview Not Found</h1>
          <Link to="/interviews">
            <Button variant="outline">Back to Interviews</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={interview.title}
        description={interview.excerpt}
        image={interview.cover_image_url || interview.artists?.image_url}
        article
      />
      <ScrollToTop />
      <article className="min-h-screen">
        {/* Navigation */}
        <nav className="container mx-auto px-6 pt-32 pb-8">
          <Link to="/interviews">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Interviews
            </Button>
          </Link>
        </nav>

        {/* Header */}
        <header className="container mx-auto px-6 pb-12">
          <div className="max-w-3xl mx-auto scroll-reveal">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
              {format(new Date(interview.interview_date), "MMMM d, yyyy")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
              {interview.title}
            </h1>
            <p className="text-xl text-foreground/80 leading-[1.8] mb-8">
              {interview.excerpt}
            </p>
            <Link
              to={`/artists/${interview.artist_id}`}
              className="inline-flex items-center gap-3 group"
            >
              {interview.artists?.image_url && (
                <img
                  src={interview.artists.image_url}
                  alt={interview.artists.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm text-muted-foreground">Interview with</p>
                <p className="font-display text-lg group-hover:text-accent transition-colors">
                  {interview.artists?.name}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Cover Image */}
        {interview.cover_image_url && (
          <div className="container mx-auto px-6 pb-12">
            <div className="max-w-5xl mx-auto aspect-[16/9] bg-secondary overflow-hidden rounded-lg shadow-lg scroll-reveal">
              <img
                src={interview.cover_image_url}
                alt={interview.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Audio */}
        {interview.audio_url && interview.audio_title && (
          <div className="container mx-auto px-6 pb-12">
            <div className="max-w-3xl mx-auto scroll-reveal">
              <AudioPlayer audioUrl={interview.audio_url} title={interview.audio_title} artist={interview.artists?.name || ""} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-6 pb-24">
          <div className="max-w-3xl mx-auto scroll-reveal">
            <div className="prose prose-lg max-w-none">
              {interview.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-[1.8] mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Artist CTA */}
        <div className="container mx-auto px-6 pb-24">
          <div className="max-w-3xl mx-auto bg-secondary/40 border border-border p-10 md:p-14 rounded-lg text-center scroll-reveal">
            <h3 className="font-display text-2xl md:text-3xl mb-4">
              Explore {interview.artists?.name}'s Work
            </h3>
            <p className="text-foreground/80 mb-8 leading-[1.8]">
              Discover the artworks and creative vision behind this conversation.
            </p>
            <Button asChild size="lg">
              <Link to={`/artists/${interview.artist_id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default InterviewDetail;
