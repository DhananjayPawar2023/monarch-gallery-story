import { useParams, Link, useNavigate } from "react-router-dom";
import { useJournalEntry } from "@/hooks/useJournal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { JournalSkeleton } from "@/components/LoadingSkeleton";

const JournalDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: entry, isLoading } = useJournalEntry(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          <JournalSkeleton />
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Entry Not Found</h1>
          <Button onClick={() => navigate("/journal")} variant="outline">
            Back to Journal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={entry.title}
        description={entry.excerpt}
        image={entry.cover_image_url}
        article
      />
      <article className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <nav>
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="group mb-8"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>
          </nav>

          {/* Article Header */}
          <section>
          <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-6">
            {entry.category}
          </div>

          <h1 className="font-display text-5xl md:text-6xl mb-6 animate-fade-in-up">
            {entry.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 pb-8 border-b border-border">
            <span>{entry.author}</span>
            <span>•</span>
            <span>
              {new Date(entry.published_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span>•</span>
            <span>{entry.read_time}</span>
          </div>

            {entry.cover_image_url && (
              <div className="aspect-[16/9] bg-secondary overflow-hidden rounded-lg mb-12">
                <img
                  src={entry.cover_image_url}
                  alt={`${entry.title} cover image`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {entry.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-foreground/80 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <Link
                to="/journal"
                className="text-accent hover:underline inline-flex items-center"
              >
                ← Back to all articles
              </Link>
            </footer>
          </section>
        </div>
      </article>
    </>
  );
};

export default JournalDetail;
