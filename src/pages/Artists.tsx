import { artists } from "@/data/artists";

const Artists = () => {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
            Artists
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Meet the visionary artists shaping the future of digital art. Each brings a unique perspective 
            and mastery to their craft, creating works that transcend the digital medium.
          </p>
        </div>

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
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover hover-lift"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
                  {artist.specialization}
                </div>
                <h2 className="font-display text-4xl md:text-5xl mb-3">
                  {artist.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {artist.location}
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  {artist.bio}
                </p>
                
                <div className="flex gap-3">
                  {artist.instagram && (
                    <a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {artist.twitter && (
                    <a
                      href={artist.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;
