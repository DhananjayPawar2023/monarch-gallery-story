import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

const Artists = () => {
  const artists = [
    {
      id: 1,
      image: artist1,
      name: "Elena Voss",
      location: "Berlin, Germany",
      bio: "Elena Voss explores the intersection of geometry and emotion in her digital works. Her practice combines architectural precision with intuitive color theory, creating pieces that resonate with both collectors and critics alike.",
      specialization: "Geometric Abstraction",
    },
    {
      id: 2,
      image: artist2,
      name: "Marcus Chen",
      location: "Tokyo, Japan",
      bio: "Working at the forefront of generative art, Marcus Chen crafts ethereal digital sculptures that challenge our perception of form and space. His work has been exhibited in galleries across Asia and Europe.",
      specialization: "Generative Art",
    },
    {
      id: 3,
      image: artist3,
      name: "Sofia Laurent",
      location: "Paris, France",
      bio: "Sofia Laurent's minimalist approach to digital art draws inspiration from architectural forms and natural light. Her work is characterized by its refined simplicity and emotional depth.",
      specialization: "Minimal Art",
    },
  ];

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
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="aspect-square bg-secondary overflow-hidden">
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
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {artist.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;
