import { useArtists } from "@/hooks/useArtists";

const Artists = () => {
  const { data: artists, isLoading } = useArtists();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading artists...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
            Artists
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            The artists at Monarch are not just creators—they're storytellers, philosophers, and pioneers. 
            Each has found their own way to bridge the gap between technology and emotion, creating works that feel 
            deeply human in a digital age.
          </p>
        </div>

        {!artists || artists.length === 0 ? (
          <p className="text-center text-muted-foreground">No artists available yet.</p>
        ) : (
          <div className="space-y-24">
            {artists.map((artist, index) => (
            <div
              key={artist.id}
              id={artist.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up scroll-mt-24 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="aspect-square bg-secondary overflow-hidden rounded-lg">
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    className="w-full h-full object-cover hover-lift"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                {artist.specialization && (
                  <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
                    {artist.specialization}
                  </div>
                )}
                <h2 className="font-display text-4xl md:text-5xl mb-3">
                  {artist.name}
                </h2>
                {artist.location && (
                  <p className="text-muted-foreground text-sm mb-6">
                    {artist.location}
                  </p>
                )}
                {artist.short_bio && (
                  <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                    {artist.short_bio}
                  </p>
                )}
                
                {artist.quote && (
                  <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/70 mb-8 leading-relaxed">
                    "{artist.quote}"
                  </blockquote>
                )}

                <div className="prose prose-invert max-w-none mb-8">
                  {artist.bio.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-foreground/70 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {artist.instagram && (
                    <a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors underline"
                    >
                      Instagram
                    </a>
                  )}
                  {artist.twitter && (
                    <a
                      href={artist.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors underline"
                    >
                      Twitter
                    </a>
                  )}
                  {artist.website && (
                    <a
                      href={artist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors underline"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
